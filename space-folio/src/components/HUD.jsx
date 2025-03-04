import React, { useState } from "react";
import BioModale from "./BioModale";

const HUD = () => {
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
    top: 20,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000, // Assurez-vous que le HUD est au-dessus de tout
    color: "white", // Couleur du texte
    textAlign: "center",
  },
  title: {
    cursor: "pointer", // Change le curseur pour indiquer que c'est cliquable
  },
};

export default HUD;