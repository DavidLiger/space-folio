import { useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { Sphere } from "@react-three/drei";

export default function Planete({ position, couleur, nom, onClick }) {
  const [hover, setHover] = useState(false);

  // Animation d’agrandissement au survol
  const { scale } = useSpring({
    scale: hover ? 1.2 : 1,
  });

  return (
    <animated.mesh
      scale={scale}
      position={position}
      onClick={onClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color={couleur} />
      </Sphere>
    </animated.mesh>
  );
}
