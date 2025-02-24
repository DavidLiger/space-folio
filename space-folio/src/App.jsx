import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Vaisseau from "./models/Vaisseau";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 5] }}>
      {/* 🌌 Fond étoilé */}
      <Stars radius={100} depth={50} count={5000} />
      
      {/* 💡 Lumières */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1} />

      {/* 🚀 Le vaisseau */}
      <Vaisseau />

      {/* 🛠️ Contrôles caméra */}
      <OrbitControls />
    </Canvas>
  );
}

