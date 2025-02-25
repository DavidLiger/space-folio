import { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";

export default function Planete({ position, nom, onClick }) {
  const [hover, setHover] = useState(false);

  // Animation d’agrandissement au survol
  const { scale } = useSpring({
    scale: hover ? 1.2 : 1,
  });

  // Chargement du modèle en fonction du nom de la planète
  const modelPath = nom === "PHP" ? "/models/cute_little_planet.glb" : "/models/low_poly_planet.glb";
  const { scene } = useGLTF(modelPath);

  return (
    <animated.mesh
      scale={scale}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <primitive object={scene} />
    </animated.mesh>
  );
}
