"use client";

import React, { useEffect, useRef, useState } from 'react';
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

// Removed React.lazy import for 'three' as it's not a React component
// const ThreeLib = React.lazy(() => import('three')); 

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
  // frameIdRef was unused, removing it. If needed for animation cleanup, it can be added back.
  // const frameIdRef = useRef<number | null>(null); 
  const [localLoading, setLocalLoading] = useState(true); // Local loading state for Three.js init
  const [error, setError] = useState<string | null>(null);

  const { isIntersecting } = useIntersectionObserver(containerRef, {
    rootMargin: '100px 0px',
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const getPolygonCounts = React.useCallback(() => {
    const isLowEnd = typeof window !== 'undefined' ? isLowEndDevice() : false; // Check low-end device on client
    const complexityMap = {
      low: { sphere: isLowEnd ? 8 : 12, segments: isLowEnd ? 8 : 12 },
      medium: { sphere: isLowEnd ? 12 : 24, segments: isLowEnd ? 12 : 24 },
      high: { sphere: isLowEnd ? 16 : 32, segments: isLowEnd ? 16 : 32 }
    };
    return complexityMap[complexity];
  }, [complexity]); 

  useEffect(() => {
    if (!isIntersecting) return; 

    let three: typeof THREE | null = null;
    let sphere: THREE.Mesh | null = null;
    let animationFrameId: number | null = null;

    const initThreeJs = async () => {
      if (!containerRef.current || rendererRef.current) return; 

      setLocalLoading(true);
      setError(null);

      try {
        three = await import('three'); 
        if (!three) throw new Error("Three.js library failed to import."); // Guard against failed import

        const polygons = getPolygonCounts();
        const currentContainer = containerRef.current; // Capture ref value
        if(!currentContainer) return; // Guard if container became null

        const containerWidth = currentContainer.clientWidth;
        const containerHeight = currentContainer.clientHeight;

        const scene = new three.Scene();
        sceneRef.current = scene;

        const camera = new three.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
        camera.position.z = 5;
        cameraRef.current = camera;

        const renderer = new three.WebGLRenderer({ 
          antialias: !(typeof window !== 'undefined' ? isLowEndDevice() : false), // Check low-end device on client
          alpha: true 
        });
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        currentContainer.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        scene.add(new three.AmbientLight(0xcccccc, 0.8)); 
        const dirLight = new three.DirectionalLight(0xffffff, 1.5);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        const geometry = new three.SphereGeometry(1.5, polygons.sphere, polygons.segments);
        const material = new three.MeshStandardMaterial({ 
          color: 0x38bdf8, 
          roughness: 0.4,
          metalness: 0.1,
          wireframe: false 
        });
        sphere = new three.Mesh(geometry, material);
        scene.add(sphere);

        const animate = () => {
          if (!sphere || !rendererRef.current || !sceneRef.current || !cameraRef.current) return; 
          sphere.rotation.y += 0.005;
          sphere.rotation.x += 0.002;
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        const handleResize = () => {
          const currentContainerResize = containerRef.current; // Capture ref value for resize
          if (!currentContainerResize || !cameraRef.current || !rendererRef.current) return;
          const newWidth = currentContainerResize.clientWidth;
          const newHeight = currentContainerResize.clientHeight;
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        };
        window.addEventListener('resize', handleResize);

        setLocalLoading(false);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
          if (rendererRef.current && currentContainer && rendererRef.current.domElement) {
             if (currentContainer.contains(rendererRef.current.domElement)) {
                 currentContainer.removeChild(rendererRef.current.domElement);
             }
          }
          geometry?.dispose();
          material?.dispose();
          rendererRef.current?.dispose();
          rendererRef.current = null; 
          sceneRef.current = null;
          cameraRef.current = null;
        };

      } catch (err) {
        console.error("Failed to initialize Three.js scene:", err);
        setError(err instanceof Error ? err.message : "Failed to load 3D scene.");
        setLocalLoading(false);
        return () => {}; 
      }
    };

    let cleanup: (() => void) | undefined;
    initThreeJs().then(returnedCleanup => {
        cleanup = returnedCleanup;
    });

    return () => {
      cleanup?.(); 
    };

  }, [isIntersecting, getPolygonCounts, complexity]);

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{ 
        width, 
        height,
        minHeight: '150px', 
        overflow: 'hidden'
      }}
    >
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
        </>
      )}
      {!isIntersecting && (
         <div className="absolute inset-0 bg-muted/10"></div>
      )}
    </div>
  );
}
