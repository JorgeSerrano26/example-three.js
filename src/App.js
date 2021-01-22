import { MeshWobbleMaterial, OrbitControls, softShadows } from 'drei';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { useSpring, a } from 'react-spring/three';
softShadows();

const SpinningMesh = ({
  position,
  args,
  color
}) => {
  const meshRef = useRef(null);
  const [expand, setExpand] = useState(false);
  
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  useFrame(() => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.04));

  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow position={position} ref={meshRef}>
      <MeshWobbleMaterial attach="material" color={color} speed={1} factor={.6} />
      <boxBufferGeometry attach='geometry' args={args} />
    </a.mesh>
  );
}


function App() {
  return (
    <Canvas
      colorManagement
      shadowMap
      camera={{ position: [-5, 2, 10], fov: 60 }}>
      <ambientLight intensity={.3} />

      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-height={1014}
        shadow-mapSize-width={1014}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <pointLight position={[-10, 0, -20]} intensity={0.5} />
      <pointLight position={[0, -10, 0]} intensity={1.5} />

      {/* <group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <meshStandardMaterial attach="material" color={"yellow"} />
        </mesh>
      </group> */}
      <group>
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3, 0]}>
          <planeBufferGeometry attach="geometry" args={[100, 100]} />
          <shadowMaterial attach="material" opacity={.3} />
        </mesh>
        <SpinningMesh position={[0, 1, 0]} args={[1, 1, 1]} color="pink" />
        <SpinningMesh position={[-2, 1, -5]} args={[2, 2, 2]} color="lightblue" />
        <SpinningMesh position={[5, 1, -2]} args={[3, 3, 3]} color="pink" />
      </group>


      <OrbitControls />
    </Canvas>
  );
}

export default App;
