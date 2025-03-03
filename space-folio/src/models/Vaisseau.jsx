import { useGLTF } from "@react-three/drei";
import { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three'; // Importer THREE

export default function Vaisseau({ target, planetClicked, initialPosition = [0, 0, 0], orbitDistance = 2, orbitSpeed = 0.01 }) {
  const { scene, animations } = useGLTF("/models/space_rocket.glb"); // Charge le modèle
  const vaisseauRef = useRef();
  const [hover, setHover] = useState(false);
  const angleRef = useRef(0); // Pour suivre l'angle d'orbite
  const [rocketState, setRocketState] = useState(null);
  const mixer = useRef(); // Référence pour le mixer d'animation

  // ✅ Définir la position initiale UNE SEULE FOIS au premier rendu
  useEffect(() => {
    if (vaisseauRef.current) {
      vaisseauRef.current.position.set(...initialPosition);
    }
  }, []); // 👈 Exécuté uniquement au montage du composant

  // Initialiser le mixer d'animation
  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      const flameAnimation = animations.find(anim => anim.name === "flame");
      if (flameAnimation) {
        mixer.current.clipAction(flameAnimation).play();
      }
    }
  }, [animations, scene]);

  useEffect(() => {
    if (planetClicked) {
      setRocketState('travel');
    }
  }, [planetClicked]);

  useEffect(() => {
    if (rocketState === 'travel') {
      console.log('traveling');
    }
    if (rocketState === 'idling') {
      console.log('idling');
    }
  }, [rocketState]); // 👈 Exécuté uniquement au montage du composant

  // Gestion du curseur
  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer"; // Change le curseur
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "default"; // Rétablit le curseur
  };

  useFrame((state, delta) => {
    if (rocketState === 'travel') {
      travel();
      if (mixer.current) {
        mixer.current.update(delta); // Met à jour le mixer d'animation
      }
    }
    if (rocketState === 'idling' && planetClicked) {
      // orbiting();
    }
  });

  const travel = () => {
    const pos = vaisseauRef.current.position;
    // Interpolation pour aller progressivement vers la cible
    pos.x += (target[0] - pos.x) * 0.02; // Ajuste la vitesse d’approche
    pos.y += (target[1] - pos.y) * 0.02;
    pos.z += (target[2] - pos.z) * 0.02;

    const safetyDistance = 3;

    // Vérifier si le vaisseau est proche de la cible et arrêter le mouvement
    const distance = Math.sqrt(
      (target[0] - pos.x) ** 2 +
      (target[1] - pos.y) ** 2 +
      (target[2] - pos.z) ** 2
    );

    if (distance < safetyDistance) {
      let x = target[0] - (target[0] - pos.x) * (safetyDistance / distance);
      let y = target[1] - (target[1] - pos.y) * (safetyDistance / distance);
      let z = target[2] - (target[2] - pos.z) * (safetyDistance / distance);
      pos.set(x, y, z);

      // Calculer l'angle d'orientation basé sur la position actuelle
      const dx = target[0] - pos.x;
      const dz = target[2] - pos.z;
      angleRef.current = Math.atan2(dz, dx);

      setRocketState('idling');
    } else {
      const dx = target[0] - pos.x;
      const dz = target[2] - pos.z;
      angleRef.current = Math.atan2(dz, dx);
      vaisseauRef.current.rotation.y = angleRef.current; // Orienter le vaisseau
    }
  };

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