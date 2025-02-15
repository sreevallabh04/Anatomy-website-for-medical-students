import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { PerspectiveCamera } from '@react-three/drei';
import { useStore } from '../store';
import { useSound } from '../hooks/useSound';
import { systems } from '../data/systems';

const Scene = () => {
  const { activeSystem, systemOpacity, isExploding } = useStore();
  const { playSound } = useSound();
  const group = useRef();
  const { camera } = useThree();

  const activeSystemInfo = systems.find(s => s.id === activeSystem);

  const springs = useSpring({
    scale: isExploding ? 1.2 : 1,
    opacity: systemOpacity,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(time / 4) * 0.1;
    }

    // Add floating animation to camera
    camera.position.y = Math.sin(time / 2) * 0.1;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      
      <animated.group ref={group} {...springs}>
        {/* Main body representation */}
        <mesh>
          <sphereGeometry args={[1, 64, 64]} />
          <animated.meshPhysicalMaterial
            color={activeSystemInfo?.color || '#00fff2'}
            transparent
            opacity={springs.opacity}
            roughness={0.2}
            metalness={0.8}
            wireframe={isExploding}
          />
        </mesh>

        {/* Decorative rings */}
        {[1.2, 1.4, 1.6].map((radius, index) => (
          <mesh key={index} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial
              color="#00fff2"
              transparent
              opacity={0.2}
            />
          </mesh>
        ))}

        {/* Holographic grid */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[20, 20, 20, 20]} />
          <meshBasicMaterial
            color="#00fff2"
            wireframe
            transparent
            opacity={0.2}
          />
        </mesh>
      </animated.group>

      {/* Particle system */}
      <points>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            count={2000}
            array={new Float32Array(6000).map(() => (Math.random() - 0.5) * 20)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#00fff2"
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* Ambient and spot lights */}
      <ambientLight intensity={0.4} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
    </>
  );
};

export default Scene;