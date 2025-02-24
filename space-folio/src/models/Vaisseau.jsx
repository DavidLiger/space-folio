import { useGLTF } from "@react-three/drei";

export default function Vaisseau(props) {
  const { scene } = useGLTF("/models/space_rocket.glb"); // Charge le modèle
  return <primitive object={scene} {...props} />;
}
