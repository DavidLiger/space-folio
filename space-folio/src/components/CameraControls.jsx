import * as THREE from 'three';
import { useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });

function Controls({ target, setCameraPosition, setCameraLookAt, cameraLookAt, cameraPosition }) {
  const { camera, gl } = useThree();
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl]);
  const [initialPosition, setInitialPosition] = useState([0,0,12]) 

  useFrame((state, delta) => {
    if (target.current) {
        const targetPosition = new THREE.Vector3(...target.current);
        controls.setLookAt(initialPosition[0], initialPosition[1], initialPosition[2], targetPosition.x, targetPosition.y, targetPosition.z, true);// Mettez à jour la position et l'orientation de la caméra
        setCameraPosition(camera.position.clone());
        setCameraLookAt(targetPosition.clone());
    }
    controls.update(delta*0.6);
  });

  return null; // Ce composant ne rend rien
}

export default Controls;