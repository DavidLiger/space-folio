import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

const CameraFollow = ({ target }) => {
  const cameraRef = useRef();

  useFrame(() => {
    if (cameraRef.current && target.current) {
      const targetPosition = target.current; // Utilisez la position du vaisseau
      cameraRef.current.position.lerp(
        new THREE.Vector3(targetPosition.x, targetPosition.y + 5, targetPosition.z + 10), // Ajustez la position de la caméra
        0.1 // Vitesse de suivi
      );
      cameraRef.current.lookAt(targetPosition); // Regarde vers le vaisseau
    }
  });

  return <perspectiveCamera ref={cameraRef} position={[0, 5, 10]} fov={75} />;
};

export default CameraFollow;