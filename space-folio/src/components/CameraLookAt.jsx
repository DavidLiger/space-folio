import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

const CameraLookAt = ({ target }) => {
  const cameraRef = useRef();
  
  useFrame(() => {
    if (cameraRef.current && target.current) {

        console.log(target);
      const targetPosition = target.current; // Utilisez la position de la planète
      cameraRef.current.position.set(0, 5, 10); // Position de la caméra
      cameraRef.current.lookAt(new THREE.Vector3(...targetPosition)); // Regarde vers la planète
    }
  });

  return <perspectiveCamera ref={cameraRef} position={[0, 5, 10]} fov={75} />;
};

export default CameraLookAt;