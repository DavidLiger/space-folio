import React, { useState } from "react";
import BioModale from "./BioModale";
import PlanetIcon from "./PlanetIcon"; 
import planetBtn01 from "../assets/images/planet_btn_01.png";
import planetBtn02 from "../assets/images/planet_btn_02.png";

const HUD = ({ onPlanetClick, onVaisseauClick }) => {
  const [bioModaleOpen, setBioModaleOpen] = useState(false);

  const handleTitleClick = () => {
    setBioModaleOpen(true);
  };

  return (
    <>
      <div style={styles.hud}>
        <h1 onClick={handleTitleClick} style={styles.title}>
          Mon Titre
        </h1>
        <div style={styles.iconContainer}>
          <PlanetIcon
            onClick={() => onPlanetClick("React", "Framework JS moderne.", [16, -2, 5], 1)}
            imageSrc={planetBtn01} // Utilisez require
            altText="React"
          />
          <PlanetIcon
            onClick={() => onPlanetClick("PHP", "Backend robuste et éprouvé.", [-14, 0, 5], 1)}
            imageSrc={planetBtn02} // Remplacez par le chemin de votre image
            altText="PHP"
          />
          <PlanetIcon
            onClick={onVaisseauClick}
            imageSrc="../assets/react.svg" // Remplacez par le chemin de votre image
            altText="Vaisseau"
          />
        </div>
      </div>
      <BioModale
        open={bioModaleOpen}
        onClose={() => setBioModaleOpen(false)}
        title="Titre de la Modale"
        content="Contenu de la modale qui s'ouvre lorsque vous cliquez sur le titre."
      />
    </>
  );
};

const styles = {
  hud: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000,
    color: "white",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    pointerEvents: "none", // Permettre les clics à travers le HUD
  },
  title: {
    marginTop: "20px",
    cursor: "pointer",
    pointerEvents: "auto", // Rendre le titre cliquable
  },
  iconContainer: {
    position: "absolute",
    left: "10px",
    top: "120px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    pointerEvents: "auto", // Rendre les icônes cliquables
  },
};

export default HUD;