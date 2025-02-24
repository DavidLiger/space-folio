import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Vaisseau from "./models/Vaisseau";
import { useState } from "react";
import Planete from "./components/Planete";
import Modale from "./components/Modale";

export default function Scene() {
  const [modaleOpen, setModaleOpen] = useState(false);
  const [modaleContent, setModaleContent] = useState({ title: "", content: "" });

  const handleClick = (nom, description) => {
    setModaleContent({ title: nom, content: description });
    setModaleOpen(true);
  };

  return (
    <>
        <Canvas style={{ width: "100vw", height: "100vh" }}>
        {/* 🌌 Fond étoilé */}
        <Stars radius={100} depth={50} count={5000} />
        
        {/* 💡 Lumières */}
        <ambientLight intensity={0.5} />
        <Planete position={[2, 0, 0]} couleur="blue" nom="React" onClick={() => handleClick("React", "Framework JS moderne.")} />
        <Planete position={[-2, 0, 0]} couleur="red" nom="PHP" onClick={() => handleClick("PHP", "Backend robuste et éprouvé.")} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        {/* 🚀 Le vaisseau */}
        <Vaisseau />

        {/* 🛠️ Contrôles caméra */}
        <OrbitControls />
      </Canvas>
      <Modale open={modaleOpen} onClose={() => setModaleOpen(false)} title={modaleContent.title} content={modaleContent.content} />
    </>

  );
}

