import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export default function Vaisseau(props) {
  const { scene } = useGLTF("/models/space_rocket.glb"); // Charge le modèle
  const [hover, setHover] = useState(false);

  // Gestion du curseur
  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer"; // Change le curseur
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "default"; // Rétablit le curseur
  };

  return (
    <primitive
      object={scene}
      {...props}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}
