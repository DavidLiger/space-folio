import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Vaisseau from "./models/Vaisseau";
import { useState, useRef, useEffect } from "react";
import Planete from "./components/Planete";
import PhpPlanetPath from "/models/cute_little_planet.glb";
import ReactPlanetPath from "/models/low_poly_planet.glb";
import WebGLPlanetPath from "/models/origami_planet.glb";
import Modale from "./components/Modale";
import TimelineModale from "./components/TimelineModale";
import HUD from "./components/HUD";
import Controls from "./components/CameraControls"; // Importez le composant Controls

// Composant pour les étoiles scintillantes
function StarsField() {
  const starsRef = useRef();
  const count = 2000; // Nombre d'étoiles
  const starsGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const distanceFromCenter = 1000; // Distance souhaitée d

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * distanceFromCenter * 2; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * distanceFromCenter * 2; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * distanceFromCenter * 2; // Z

    colors[i * 10] = 1; // R
    colors[i * 10 + 1] = 1; // G
    colors[i * 10 + 2] = 1; // B
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const colorsArray = starsGeometry.attributes.color.array;

    // Modifiez les couleurs pour créer un effet de scintillement
    for (let i = 0; i < colorsArray.length; i += 3) {
      const flicker = Math.sin(time * 5 + i) * 0.5 + 0.5; // Crée un effet de scintillement
      colorsArray[i] = flicker; // R
      colorsArray[i + 1] = flicker; // G
      colorsArray[i + 2] = flicker; // B
    }

    starsGeometry.attributes.color.needsUpdate = true; // Indiquez que les couleurs ont changé
  });

  return (
    <points ref={starsRef} geometry={starsGeometry}>
      <pointsMaterial size={1} vertexColors />
    </points>
  );
}

export default function Scene() {
  const [modaleOpen, setModaleOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [modaleContent, setModaleContent] = useState({ title: "", content: "" });
  const vaisseauInitialPosition = [0, 0, 0];
  const planetPositionRef = useRef([0, 0, 0]);
  const [planetClickedName, setPlanetClickedName] = useState(null);
  const [isTraveling, setIsTraveling] = useState(false);
  const [cameraPosition, setCameraPosition] = useState(new THREE.Vector3(0, 5, 15)); // Position initiale de la caméra
  const [cameraLookAt, setCameraLookAt] = useState(new THREE.Vector3(0, 0, 0));
  const [orbitControlsPosition, setOrbitControlsPosition] = useState(new THREE.Vector3(0, 0, 0))
  const [maxDistance, setMaxDistance] = useState(40)


  useEffect(() => {
    console.log(planetClickedName);
  }, [planetClickedName]);

  useEffect(() => {
    if(isTraveling){
      setMaxDistance(5)
    }
    if(!isTraveling){
      setTimeout(()=>{
        setMaxDistance(40)
      },500)
    }
  }, [isTraveling])

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
      <Canvas style={{ width: "100vw", height: "100vh", background: "black" }}>
        <Stars radius={100} depth={50} count={3000} />
        {!isTraveling &&
          <StarsField />
        } 
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />

        <Planete
          modelPath={ReactPlanetPath}
          initialPosition={[16, -2, 5]}
          nom="React"
          onClick={(pos, radius) => handleClick("React", "Framework JS moderne.", pos, radius)}
          revolutionSpeed={0.002}
          positionRef={planetPositionRef}
          planetClickedName={planetClickedName}
        />

        <Planete
          modelPath={PhpPlanetPath}
          initialPosition={[-14, 0, 5]}
          nom="PHP"
          onClick={(pos, radius) => handleClick("PHP", "Backend robuste et éprouvé.", pos, radius)}
          revolutionSpeed={0.0015}
          positionRef={planetPositionRef}
          planetClickedName={planetClickedName}
        />

        <Planete
          modelPath={WebGLPlanetPath}
          initialPosition={[0, 2, 25]}
          nom="WebGL"
          onClick={(pos, radius) => handleClick("WebGL", "Univers 3D immersif", pos, radius)}
          revolutionSpeed={0.0015}
          positionRef={planetPositionRef}
          planetClickedName={planetClickedName}
        />

        <Vaisseau   
          target={planetPositionRef.current}
          planetClickedName={planetClickedName}
          initialPosition={vaisseauInitialPosition}
          onClick={() => setTimelineOpen(true)}
          setIsTraveling={setIsTraveling}
        />

        {isTraveling &&
          <Controls 
            target={planetPositionRef}
            setCameraPosition={setCameraPosition} 
            setCameraLookAt={setCameraLookAt} 
            setMaxDistance={setMaxDistance}
            cameraLookAt={cameraLookAt}
            cameraPosition={cameraPosition}
          /> 
        }

          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true} 
            target={cameraLookAt} 
            position={orbitControlsPosition} 
            minDistance={3} // Distance minimale (ajustez selon vos besoins)
            maxDistance={maxDistance} // Distance maximale (ajustez selon vos besoins)
            zoomSpeed={0.8} // Vitesse de zoom (ajustez selon vos besoins)
            panSpeed={0.5} // Vitesse de déplacement (ajustez selon vos besoins)
          />
      </Canvas>

      <Modale open={modaleOpen} onClose={() => setModaleOpen(false)} title={modaleContent.title} content={modaleContent.content} />
      <TimelineModale open={timelineOpen} onClose={() => setTimelineOpen(false)} />
      <HUD onPlanetClick={handlePlanetClick} onVaisseauClick={handleVaisseauClick} />
    </>
  );
}