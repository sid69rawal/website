"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'; // Ensure path is correct
import { isLowEndDevice } from '@/lib/utils'; // Ensure path is correct
import { Loader2 } from 'lucide-react';
import type * as THREE from 'three'; // Import type only for THREE

interface DynamicThreeSceneProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  complexity?: 'low' | 'medium' | 'high';
}

// Dynamically import Three.js only on the client
const ThreeLib = React.lazy(() => import('three'));

export function DynamicThreeScene({
  width = '100%',
  height = '300px',
  className = '',
  complexity = 'medium'
}: DynamicThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const [localLoading, setLocalLoading] = useState(true); // Local loading state for Three.js init
  const [error, setError] = useState<string | null>(null);

  const { isIntersecting } = useIntersectionObserver(containerRef, {
    rootMargin: '100px 0px',
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const getPolygonCounts = React.useCallback(() => {
    const isLowEnd = isLowEndDevice();
    const complexityMap = {
      low: { sphere: isLowEnd ? 8 : 12, segments: isLowEnd ? 8 : 12 },
      medium: { sphere: isLowEnd ? 12 : 24, segments: isLowEnd ? 12 : 24 },
      high: { sphere: isLowEnd ? 16 : 32, segments: isLowEnd ? 16 : 32 }
    };
    return complexityMap[complexity];
  }, [complexity]); // Dependency on complexity

  useEffect(() => {
    if (!isIntersecting) return; // Don't initialize if not visible

    let three: typeof THREE | null = null;
    let sphere: THREE.Mesh | null = null;
    let animationFrameId: number | null = null;

    const initThreeJs = async () => {
      if (!containerRef.current || rendererRef.current) return; // Already initialized

      setLocalLoading(true);
      setError(null);

      try {
        three = await import('three'); // Dynamically import Three.js
        const polygons = getPolygonCounts();
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        const scene = new three.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new three.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        // Renderer
        const renderer = new three.WebGLRenderer({ 
          antialias: !isLowEndDevice(), 
          alpha: true 
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Lights
        scene.add(new three.AmbientLight(0xcccccc, 0.8)); // Soft ambient light
        const dirLight = new three.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // Sphere
        const geometry = new three.SphereGeometry(1.5, polygons.sphere, polygons.segments);
        const material = new three.MeshStandardMaterial({ 
          color: 0x38bdf8, // Primary color
          roughness: 0.4,
          metalness: 0.1,
          wireframe: false // Keep wireframe false unless intended
        });
        sphere = new three.Mesh(geometry, material);
        scene.add(sphere);

        // Animation loop
        const animate = () => {
          if (!sphere || !rendererRef.current || !sceneRef.current || !cameraRef.current) return; // Guard against null refs
          sphere.rotation.y += 0.005;
          sphere.rotation.x += 0.002;
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        // Resize handler
        const handleResize = () => {
          if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
          const newWidth = containerRef.current.clientWidth;
          const newHeight = containerRef.current.clientHeight;
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        setLocalLoading(false);

        // Return cleanup function
        return () => {
          window.removeEventListener('resize', handleResize);
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
          if (rendererRef.current && containerRef.current && rendererRef.current.domElement) {
             if (containerRef.current.contains(rendererRef.current.domElement)) {
                 containerRef.current.removeChild(rendererRef.current.domElement);
             }
          }
          geometry?.dispose();
          material?.dispose();
          rendererRef.current?.dispose();
          rendererRef.current = null; // Reset refs on cleanup
          sceneRef.current = null;
          cameraRef.current = null;
        };

      } catch (err) {
        console.error("Failed to initialize Three.js scene:", err);
        setError("Failed to load 3D scene.");
        setLocalLoading(false);
        return () => {}; // Return empty cleanup on error
      }
    };

    let cleanup: (() => void) | undefined;
    initThreeJs().then(returnedCleanup => {
        cleanup = returnedCleanup;
    });

    return () => {
      cleanup?.(); // Call cleanup if it was returned
    };

  }, [isIntersecting, getPolygonCounts, complexity]); // Add complexity and getPolygonCounts as dependencies

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{ 
        width, 
        height,
        minHeight: '150px', // Ensure minimum height for visibility
        overflow: 'hidden'
      }}
    >
      {/* Only render loader/error when intersecting */}
      {isIntersecting && (
        <>
          {localLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/30 dark:bg-gray-800/50">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-destructive/10 text-destructive px-4 text-center text-sm">
              {error}
            </div>
          )}
        </<>
      )}
       {/* Optional: Placeholder before intersection */}
      {!isIntersecting && (
         <div className="absolute inset-0 bg-muted/10"></div>
      )}
    </div>
  );
}
