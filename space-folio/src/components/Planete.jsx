import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Box3, Vector3 } from "three";

export default function Planete({ initialPosition, nom, onClick, revolutionSpeed = 0.001, positionRef }) {
  const [hover, setHover] = useState(false);
  const planetRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [boundingBox, setBoundingBox] = useState(null);
  
  const radius = Math.sqrt(initialPosition[0] ** 2 + initialPosition[1] ** 2);
  const { scale } = useSpring({ scale: hover ? 1.2 : 1 });
  const modelPath = nom === "PHP" ? "/models/cute_little_planet.glb" : "/models/low_poly_planet.glb";
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const size = new Vector3();
      box.getSize(size);
      setBoundingBox(size.length() / 2);
    }
  }, [scene]);

  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "default";
  };

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
      angleRef.current += revolutionSpeed;
      const newX = Math.cos(angleRef.current) * radius;
      const newZ = Math.sin(angleRef.current) * radius;
      planetRef.current.position.set(newX, initialPosition[1], newZ); // Met à jour la position de la planète
      positionRef.current = [newX, initialPosition[1], newZ]; // Met à jour la référence de position
    }
  });

  return (
    <animated.mesh
      ref={planetRef}
      scale={scale}
      position={initialPosition}
      onClick={() => {
        onClick(
          [
            planetRef.current.position.x,
            planetRef.current.position.y,
            planetRef.current.position.z
          ],
          boundingBox
        )
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </animated.mesh>
  );
}