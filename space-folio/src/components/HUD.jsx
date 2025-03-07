import React, { useState } from "react";
import BioModale from "./BioModale";
import PlanetIcon from "./PlanetIcon"; 
import planetBtn01 from "../assets/images/planet_btn_01.png";
import planetBtn02 from "../assets/images/planet_btn_02.png";
import rocketBtn from "../assets/images/rocket_btn.png"
import '../fonts.css'; // Importez le fichier CSS ici

const HUD = ({ onPlanetClick, onVaisseauClick }) => {
  const [bioModaleOpen, setBioModaleOpen] = useState(false);

  const handleTitleClick = () => {
    setBioModaleOpen(true);
  };

  return (
    <>
      <div style={styles.hud}>
        <div style={styles.titleContainer}>
          <span onClick={handleTitleClick} style={styles.title}>David Liger</span>
          <span onClick={handleTitleClick} style={styles.subTitle}>Developpeur Full Stack</span>
        </div>
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
            imageSrc={rocketBtn} // Remplacez par le chemin de votre image
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
  titleContainer: {
    display: "flex",
    flexDirection: "column", // Aligner les éléments en colonne
    alignItems: "center", // Centrer les éléments
  },
  title: {
    marginTop: "20px",
    cursor: "pointer",
    pointerEvents: "auto", // Rendre le titre cliquable
    fontSize: "72px", // Taille de police pour le titre
    fontWeight: "bold", // Mettre le titre en gras
    fontFamily: 'HemiHead', // Utiliser la police personnalisée
    lineHeight: "1.1", // Ajuster la hauteur de ligne si nécessaire
  },
  subTitle: {
    fontSize: "48px", // Taille de police pour le sous-titre
    // marginTop: "5px", // Espacement entre le titre et le sous-titre
    cursor: "pointer",
    pointerEvents: "auto", // Rendre le titre cliquable
    fontFamily: 'CustomFont', // Utiliser la police personnalisée
    lineHeight: "1.1", // Ajuster la hauteur de ligne si nécessaire
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