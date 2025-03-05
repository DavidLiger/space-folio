import * as THREE from 'three';
import { useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE });

function Controls({ target }) {
  const { camera, gl } = useThree();
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl]);
  const [initialPosition, setInitialPosition] = useState([0,0,12]) 

  useEffect(()=>{
    // console.log(camera);
    // setInitialPosition([camera.position.x, camera.position.y, camera.position.z])
  },[camera])

  useFrame((state, delta) => {
    if (target.current) {
      const targetPosition = new THREE.Vector3(...target.current);
    //   controls.setLookAt(camera.position.x, camera.position.y, camera.position.z, targetPosition.x, targetPosition.y, targetPosition.z, true);
    controls.setLookAt(initialPosition[0], initialPosition[1], initialPosition[2], targetPosition.x, targetPosition.y, targetPosition.z, true);
    }
    controls.update(delta/2);
  });

  return null; // Ce composant ne rend rien
}

export default Controls;