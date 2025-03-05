import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Vaisseau from "./models/Vaisseau";
import { useState, useRef, useEffect } from "react";
import Planete from "./components/Planete";
import Modale from "./components/Modale";
import TimelineModale from "./components/TimelineModale";
import HUD from "./components/HUD";
import Controls from "./components/CameraControls"; // Importez le composant Controls



export default function Scene() {
  const [modaleOpen, setModaleOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [modaleContent, setModaleContent] = useState({ title: "", content: "" });
  const vaisseauInitialPosition = [0, 0, 0];
  const planetPositionRef = useRef([0, 0, 0]);
  const [planetClickedName, setPlanetClickedName] = useState(null);

  useEffect(() => {
    console.log(planetClickedName);
  }, [planetClickedName]);

  const handleClick = (nom, description, planetPosition, planetRadius) => {
    setPlanetClickedName(nom);
    setModaleContent({ title: nom, content: description });
    setModaleOpen(true);
    setTimelineOpen(false);

    // Logique pour déplacer le vaisseau
    const direction = [
      planetPosition[0] - vaisseauInitialPosition[0],
      planetPosition[1] - vaisseauInitialPosition[1],
      planetPosition[2] - vaisseauInitialPosition[2],
    ];

    const magnitude = Math.sqrt(direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2);
    if (magnitude === 0 || isNaN(magnitude)) {
      return;
    }

    const unitDirection = direction.map(coord => coord / magnitude);
    const safetyDistance = planetRadius * 1.5;

    const newTarget = [
      planetPosition[0] - unitDirection[0] * safetyDistance,
      planetPosition[1] - unitDirection[1] * safetyDistance,
      planetPosition[2] - unitDirection[2] * safetyDistance,
    ];

    planetPositionRef.current = planetPosition;
  };

  const handlePlanetClick = (nom, description, planetPosition, planetRadius) => {
    handleClick(nom, description, planetPosition, planetRadius);
  };

  const handleVaisseauClick = () => {
    setTimelineOpen(true);
  };



  return (
    <>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <Stars radius={100} depth={50} count={5000} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Planete
          initialPosition={[16, -2, 5]}
          nom="React"
          onClick={(pos, radius) => handleClick("React", "Framework JS moderne.", pos, radius)}
          revolutionSpeed={0.002}
          positionRef={planetPositionRef}
          planetClickedName={planetClickedName}
        />

        <Planete
          initialPosition={[-14, 0, 5]}
          nom="PHP"
          onClick={(pos, radius) => handleClick("PHP", "Backend robuste et éprouvé.", pos, radius)}
          revolutionSpeed={0.0015}
          positionRef={planetPositionRef}
          planetClickedName={planetClickedName}
        />

        <Vaisseau   
          target={planetPositionRef.current}
          planetClickedName={planetClickedName}
          initialPosition={vaisseauInitialPosition}
          onClick={() => setTimelineOpen(true)}
        />

        {/* <CameraLookAt target={planetPositionRef} />  */}
        <Controls target={planetPositionRef} /> {/* Utilisez le composant Controls ici */}

        <OrbitControls />
      </Canvas>

      <Modale open={modaleOpen} onClose={() => setModaleOpen(false)} title={modaleContent.title} content={modaleContent.content} />
      <TimelineModale open={timelineOpen} onClose={() => setTimelineOpen(false)} />
      <HUD onPlanetClick={handlePlanetClick} onVaisseauClick={handleVaisseauClick} />
    </>
  );
}