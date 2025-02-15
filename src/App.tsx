import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Interface from './components/Interface';
import Scene from './components/Scene';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      {/* Main 3D Viewport */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ background: 'rgb(2,6,23)' }}
        >
          <Suspense fallback={null}>
            <Scene />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <Interface />

      {/* Loading Screen */}
      <LoadingScreen />
    </div>
  );
}

export default App;