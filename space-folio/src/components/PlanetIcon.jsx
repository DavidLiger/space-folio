import React from "react";

const PlanetIcon = ({ onClick, imageSrc, altText }) => {
  return (
    <div 
      onClick={onClick} 
      style={styles.iconContainer}
    >
      <img src={imageSrc} alt={altText} style={styles.icon} />
      <span style={styles.altText}>{altText}</span> {/* Ajout de style pour le texte */}
    </div>
  );
};

const styles = {
  iconContainer: {
    cursor: "pointer",
    margin: "10px 0",
    textAlign: "center", // Centrer le texte sous l'image
    display: "flex", // Utiliser flexbox
    flexDirection: "column", // Disposer les éléments en colonne
    alignItems: "center", // Centrer les éléments horizontalement
  },
  icon: {
    width: "50px", // Ajustez la taille selon vos besoins
    height: "50px",
    borderRadius: "50%", // Pour faire un cercle
    objectFit: "cover",
  },
  altText: {
    marginTop: "5px", // Espace entre l'image et le texte
    color: "white", // Couleur du texte, ajustez selon vos besoins
    fontSize: "12px", // Taille de la police, ajustez selon vos besoins
  },
};

export default PlanetIcon;