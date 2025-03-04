import React from "react";

const PlanetIcon = ({ onClick, imageSrc, altText }) => {
  return (
    <div onClick={onClick} style={styles.iconContainer}>
      <img src={imageSrc} alt={altText} style={styles.icon} />
    </div>
  );
};

const styles = {
  iconContainer: {
    cursor: "pointer",
    margin: "10px 0",
  },
  icon: {
    width: "50px", // Ajustez la taille selon vos besoins
    height: "50px",
    borderRadius: "50%", // Pour faire un cercle
    objectFit: "cover",
  },
};

export default PlanetIcon;