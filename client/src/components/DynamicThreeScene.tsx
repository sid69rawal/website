import React, { useEffect, useRef, useState } from 'react';
import { useAnimationLibrary } from '@/hooks/use-dynamic-import';
import { isLowEndDevice } from '@/lib/utils';

interface DynamicThreeSceneProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  complexity?: 'low' | 'medium' | 'high';
}

/**
 * A component that dynamically loads Three.js only when visible
 * and adjusts complexity based on device capabilities
 */
export function DynamicThreeScene({
  width = '100%',
  height = '300px',
  className = '',
  complexity = 'medium'
}: DynamicThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const frameIdRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Use our custom hook for loading Three.js only when needed
  const { 
    module: three, 
    loading, 
    error, 
    importModule: loadThree 
  } = useAnimationLibrary('three');
  
  // Determine appropriate polygon counts based on device capability
  const getPolygonCounts = () => {
    const isLowEnd = isLowEndDevice();
    
    // Adjust complexity based on device and requested complexity level
    const complexityMap = {
      low: {
        sphere: isLowEnd ? 8 : 12,
        segments: isLowEnd ? 8 : 12
      },
      medium: {
        sphere: isLowEnd ? 12 : 24,
        segments: isLowEnd ? 12 : 24
      },
      high: {
        sphere: isLowEnd ? 16 : 32,
        segments: isLowEnd ? 16 : 32
      }
    };
    
    return complexityMap[complexity];
  };
  
  // Setup intersection observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // When component becomes visible, load Three.js
  useEffect(() => {
    if (isVisible && !three) {
      loadThree();
    }
  }, [isVisible, three, loadThree]);
  
  // Initialize scene when Three.js is loaded
  useEffect(() => {
    if (!three || !containerRef.current) return;
    
    // Initialize scene, camera, and renderer
    const initThreeJs = () => {
      const polygons = getPolygonCounts();
      
      // Create scene
      const scene = new three.Scene();
      sceneRef.current = scene;
      
      // Create camera
      const camera = new three.PerspectiveCamera(
        75, 
        containerRef.current!.clientWidth / containerRef.current!.clientHeight, 
        0.1, 
        1000
      );
      camera.position.z = 5;
      cameraRef.current = camera;
      
      // Create renderer
      const renderer = new three.WebGLRenderer({ 
        antialias: !isLowEndDevice(),
        alpha: true
      });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1); // Cap at 2x for performance
      containerRef.current!.appendChild(renderer.domElement);
      rendererRef.current = renderer;
      
      // Add ambient light
      const ambientLight = new three.AmbientLight(0x404040);
      scene.add(ambientLight);
      
      // Add directional light
      const light = new three.DirectionalLight(0xffffff, 1);
      light.position.set(1, 1, 1);
      scene.add(light);
      
      // Create a sphere with complexity based on device capability
      const geometry = new three.SphereGeometry(
        1, 
        polygons.sphere, 
        polygons.segments
      );
      const material = new three.MeshStandardMaterial({ 
        color: 0x38bdf8,
        roughness: 0.5,
        metalness: 0.2
      });
      const sphere = new three.Mesh(geometry, material);
      scene.add(sphere);
      
      // Animation function
      const animate = () => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.005;
        
        renderer.render(scene, camera);
        frameIdRef.current = requestAnimationFrame(animate);
      };
      
      // Start animation
      animate();
      
      // Handle resize
      const handleResize = () => {
        if (!containerRef.current) return;
        
        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Return cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (frameIdRef.current !== null) {
          cancelAnimationFrame(frameIdRef.current);
        }
        
        if (containerRef.current) {
          if (renderer.domElement) {
            containerRef.current.removeChild(renderer.domElement);
          }
        }
        
        // Dispose of geometries and materials
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };
    
    const cleanup = initThreeJs();
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [three]);
  
  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{ 
        width, 
        height,
        overflow: 'hidden'
      }}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 dark:bg-red-900/20 text-red-500">
          Failed to load 3D rendering engine
        </div>
      )}
    </div>
  );
}