import { useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Vaisseau({ target, planetClicked, initialPosition = [0, 0, 0], orbitDistance = 2, orbitSpeed = 0.01 }) {
  const { scene } = useGLTF("/models/space_rocket.glb"); // Charge le modèle
  const vaisseauRef = useRef();
  const [hover, setHover] = useState(false);
  const angleRef = useRef(0); // Pour suivre l'angle d'orbite
  const [rocketState, setRocketState] = useState(null)

  // ✅ Définir la position initiale UNE SEULE FOIS au premier rendu
  useEffect(() => {
    if (vaisseauRef.current) {
      vaisseauRef.current.position.set(...initialPosition);
    }
  }, []); // 👈 Exécuté uniquement au montage du composant

  useEffect(() => {
    setRocketState('travel')
  }, [planetClicked])

  useEffect(() => {
    console.log(rocketState);
    
  }, [rocketState])

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
    if (rocketState && rocketState === 'travel') {
      travel()
    }
    if(rocketState && rocketState === 'orbiting' && planetClicked){
      orbiting()
    }
  });

  const travel = () => {
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
      // Arrêter le mouvement vers la cible
      pos.set(target[0], target[1], target[2]);
      angleRef.current = 0; // Réinitialiser l'angle pour l'orbite
      setRocketState('orbiting')
    }
  }

  const orbiting = () => {
    angleRef.current += orbitSpeed;
    const x = target[0] + Math.cos(angleRef.current) * orbitDistance;
    const z = target[2] + Math.sin(angleRef.current) * orbitDistance;

    // Mettre à jour la position du vaisseau
    vaisseauRef.current.position.set(x, target[1], z);
  };

  return (
    <primitive
      ref={vaisseauRef}
      object={scene}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
}