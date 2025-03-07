import { useState, useRef, useEffect } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Box3, Vector3 } from "three";
import * as THREE from 'three'; // Importer THREE

export default function Planete({ modelPath, initialPosition, nom, onClick, revolutionSpeed = 0.001, positionRef, planetClickedName }) {
  const [hover, setHover] = useState(false);
  const planetRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [boundingBox, setBoundingBox] = useState(null);
  const mixer = useRef(); // Référence pour le mixer d'animation
  const danceAction = useRef(); // Référence pour l'action d'animation

  const radius = Math.sqrt(initialPosition[0] ** 2 + initialPosition[1] ** 2);
  const { scale } = useSpring({ scale: hover ? 1.2 : 1 });
  // const modelPath = nom === "PHP" ? "/models/cute_little_planet.glb" : "/models/low_poly_planet.glb";
  const { scene, animations } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      const box = new Box3().setFromObject(scene);
      const size = new Vector3();
      box.getSize(size);
      setBoundingBox(size.length() / 2);
    }
  }, [scene]);

  // Initialiser le mixer d'animation
  useEffect(() => {
    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);
      const danceAnimation = animations.find(anim => anim.name === "dance");
      if (danceAnimation) {
        danceAction.current = mixer.current.clipAction(danceAnimation);
      }
    }
  }, [animations, scene]);

  const handlePointerOver = () => {
    setHover(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHover(false);
    document.body.style.cursor = "default";
  };

  useFrame((state, delta) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002;
      if (mixer.current) {
        mixer.current.update(delta); // Met à jour le mixer d'animation
      }
      // revolution();
    }
    // Jouer l'animation "dance" si la planète est cliquée
    if (nom === planetClickedName && danceAction.current) {
      danceAction.current.play();
    } else if (danceAction.current) {
      danceAction.current.stop(); // Arrêter l'animation si elle n'est pas cliquée
      danceAction.current.time = 0; // Réinitialiser à la frame 0
    }
  });

  const revolution = () => {
    angleRef.current += revolutionSpeed;
    const newX = Math.cos(angleRef.current) * radius;
    const newZ = Math.sin(angleRef.current) * radius;
    planetRef.current.position.set(newX, initialPosition[1], newZ); // Met à jour la position de la planète
    positionRef.current = [newX, initialPosition[1], newZ]; // Met à jour la référence de position
  }

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
        );
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive object={scene} />
    </animated.mesh>
  );
}