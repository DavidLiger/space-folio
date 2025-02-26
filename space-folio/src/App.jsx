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

  const handleClick = (nom, description, planetPosition) => {
    console.log("✅ Position reçue de la planète :", planetPosition); // ✅ Vérifie que c'est bien un tableau
  
    if (!planetPosition || planetPosition.length !== 3 || planetPosition.includes(NaN)) {
      console.error("⚠️ Erreur: Position invalide reçue", planetPosition);
      return;
    }
  
    setModaleContent({ title: nom, content: description });
  
    const midX = (vaisseauInitialPosition[0] + planetPosition[0]) / 2;
    const midY = (vaisseauInitialPosition[1] + planetPosition[1]) / 2;
    const midZ = (vaisseauInitialPosition[2] + planetPosition[2]) / 2;
    const newTarget = [midX, midY, midZ];
  
    console.log("🚀 Nouvelle cible du vaisseau :", newTarget); // ✅ Vérifie la valeur correcte
  
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
        <Planete initialPosition={[6, -2, 0]} nom="React" onClick={(pos) => handleClick("React", "Framework JS moderne.", pos)} revolutionSpeed={0.002} />
        <Planete initialPosition={[-5, 0, 0]} nom="PHP" onClick={(pos) => handleClick("PHP", "Backend robuste et éprouvé.", pos)} revolutionSpeed={0.0015} />

        {/* 🚀 Le vaisseau */}
        <Vaisseau target={vaisseauTarget} initialPosition={vaisseauInitialPosition} />

        {/* 🛠️ Contrôles caméra */}
        <OrbitControls />
      </Canvas>

      <Modale open={modaleOpen} onClose={() => setModaleOpen(false)} title={modaleContent.title} content={modaleContent.content} />
    </>
  );
}
