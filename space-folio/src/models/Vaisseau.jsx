import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Vaisseau({ target = [0, 0, 0], initialPosition = [0, 0, 0] }) {
  const { scene } = useGLTF("/models/space_rocket.glb"); // Charge le modèle
  const vaisseauRef = useRef();
  const [hover, setHover] = useState(false);

  // Initialiser la position de départ du vaisseau
  if (vaisseauRef.current) {
    vaisseauRef.current.position.set(...initialPosition);
  }

  // Gestion du curseur
  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer"; // Change le curseur
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "default"; // Rétablit le curseur
  };

  useFrame(() => {
    if (vaisseauRef.current) {
      // Position actuelle du vaisseau
      const pos = vaisseauRef.current.position;
      
      // Interpolation pour aller progressivement vers la cible
      pos.x += (target[0] - pos.x) * 0.02; // Ajuste la vitesse d’approche
      pos.y += (target[1] - pos.y) * 0.02;
      pos.z += (target[2] - pos.z) * 0.02;

      // Vérifier si le vaisseau est proche de la cible et arrêter le mouvement
      const distance = Math.sqrt(
        (target[0] - pos.x) ** 2 +
        (target[1] - pos.y) ** 2 +
        (target[2] - pos.z) ** 2
      );

      if (distance < 0.1) {
        pos.x = target[0];
        pos.y = target[1];
        pos.z = target[2];
      }
    }
  });

  return (
    <primitive
      ref={vaisseauRef} 
      object={scene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}
