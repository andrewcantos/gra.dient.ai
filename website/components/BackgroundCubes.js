import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const NUM_CUBES = 10;
const CUBE_SIZE = 20;
const SCENE_SIZE = 20;

export default function BackgroundCubes() {
  const mountRef = useRef();

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();

    // Use orthographic camera for less perspective distortion
    const aspect = width / height;
    const d = 15;
    const camera = new THREE.OrthographicCamera(
      -d * aspect, d * aspect, d, -d, 0.1, 1000
    );
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Add dodecahedrons
    const cubes = [];
    for (let i = 0; i < NUM_CUBES; i++) {
      const geometry = new THREE.DodecahedronGeometry(CUBE_SIZE);
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.3 });
      const line = new THREE.LineSegments(edges, material);
      // Center the shape
      line.position.set(0, 0, 0);
      // Each with a unique starting orientation
      line.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      scene.add(line);
      cubes.push(line);
    }

    // Animation loop
    const animate = () => {
      cubes.forEach((cube, i) => {
        cube.rotation.x += 0.0002;
        cube.rotation.y += 0.0003;
      });
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
