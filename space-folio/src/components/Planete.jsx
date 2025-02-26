import { useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function Planete({ initialPosition, nom, onClick, revolutionSpeed = 0.001 }) {
  const [hover, setHover] = useState(false);
  const planetRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Rayon de la révolution basé sur la position initiale
  const radius = Math.sqrt(initialPosition[0] ** 2 + initialPosition[1] ** 2);

  // Animation d’agrandissement au survol
  const { scale } = useSpring({ scale: hover ? 1.2 : 1 });

  // Chargement du modèle 3D
  const modelPath = nom === "PHP" ? "/models/cute_little_planet.glb" : "/models/low_poly_planet.glb";
  const { scene } = useGLTF(modelPath);

  // Gestion du curseur
  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "default";
  };

  // Animation de révolution et rotation
  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002; // Rotation sur elle-même
      angleRef.current += revolutionSpeed;
      planetRef.current.position.x = Math.cos(angleRef.current) * radius;
      planetRef.current.position.z = Math.sin(angleRef.current) * radius;
    }
  });

  return (
    <animated.mesh
      ref={planetRef}
      scale={scale}
      position={initialPosition}
      onClick={() => onClick([
        planetRef.current.position.x,
        planetRef.current.position.y,
        planetRef.current.position.z,
      ])} // ✅ Passer directement les coordonnées
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </animated.mesh>
  );
  
}
