import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Vaisseau from "./models/Vaisseau";
import { useState } from "react";
import Planete from "./components/Planete";
import Modale from "./components/Modale";

export default function Scene() {
  const [modaleOpen, setModaleOpen] = useState(false);
  const [modaleContent, setModaleContent] = useState({ title: "", content: "" });
  const vaisseauInitialPosition = [0, 0, 0]; // Position de départ du vaisseau
  const [vaisseauTarget, setVaisseauTarget] = useState(vaisseauInitialPosition);

  const handleClick = (nom, description, planetPosition, planetRadius) => {
    console.log(nom, description, "✅ Position reçue de la planète :", planetPosition, "Rayon :", planetRadius);
  
    // Vérifier si la position de la planète et le rayon sont valides
    if (
      !Array.isArray(planetPosition) ||
      planetPosition.length !== 3 ||
      planetPosition.some(coord => isNaN(coord) || coord === undefined || coord === null)
    ) {
      console.error("⚠️ Erreur: Position de la planète invalide", planetPosition);
      return;
    }
  
    if (isNaN(planetRadius) || planetRadius <= 0) {
      console.error("⚠️ Erreur: Rayon de la planète invalide", planetRadius);
      return;
    }
  
    setModaleContent({ title: nom, content: description });
  
    // Calculer le vecteur direction
    const direction = [
      planetPosition[0] - vaisseauInitialPosition[0],
      planetPosition[1] - vaisseauInitialPosition[1],
      planetPosition[2] - vaisseauInitialPosition[2]
    ];
  
    console.log("🧭 Vecteur direction :", direction);
  
    // Vérifier si le vecteur direction est valide
    if (direction.some(coord => isNaN(coord))) {
      return;
    }
  
    // Calculer la magnitude
    const magnitude = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);
    if (magnitude === 0 || isNaN(magnitude)) {
      return;
    }
  
    // Normalisation du vecteur direction
    const unitDirection = direction.map(coord => coord / magnitude);
    console.log("📏 Vecteur direction normalisé :", unitDirection);
  
    // Distance de sécurité (1.5x le rayon de la planète)
    const safetyDistance = planetRadius * 1.5;
  
    // Calcul de la nouvelle cible
    const newTarget = [
      planetPosition[0] - unitDirection[0] * safetyDistance,
      planetPosition[1] - unitDirection[1] * safetyDistance,
      planetPosition[2] - unitDirection[2] * safetyDistance
    ];
  
    if (newTarget.some(coord => isNaN(coord))) {
      return;
    }
  
    console.log("🚀 Nouvelle cible du vaisseau :", newTarget);
    setVaisseauTarget(newTarget);
  };
  
  
  

  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        {/* 🌌 Fond étoilé */}
        <Stars radius={100} depth={50} count={5000} />

        {/* 💡 Lumières */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* 🪐 Planètes */}
        <Planete
          initialPosition={[16, -2, 5]}
          nom="React"
          onClick={(pos, radius) => handleClick("React", "Framework JS moderne.", pos, radius)} // ✅ Passe bien les 2 valeurs
          revolutionSpeed={0.002}
        />

        <Planete
          initialPosition={[-14, 0, 5]}
          nom="PHP"
          onClick={(pos, radius) => handleClick("PHP", "Backend robuste et éprouvé.", pos, radius)}
          revolutionSpeed={0.0015}
        />


        {/* 🚀 Le vaisseau */}
        <Vaisseau target={vaisseauTarget} initialPosition={vaisseauInitialPosition} />

        {/* 🛠️ Contrôles caméra */}
        <OrbitControls />
      </Canvas>

      <Modale open={modaleOpen} onClose={() => setModaleOpen(false)} title={modaleContent.title} content={modaleContent.content} />
    </>
  );
}
