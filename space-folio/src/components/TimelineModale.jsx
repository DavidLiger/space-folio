import * as Dialog from "@radix-ui/react-dialog";
import "./TimelineModale.css"; // Ajoutez des styles pour la modale
import { useEffect, useState } from "react";

export default function TimelineModale({ open, onClose }) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (open) {
      setAnimationClass("slide-in");
    } else {
      setAnimationClass("slide-out");
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* <Dialog.Overlay className="modal-overlay" /> */}
        <Dialog.Content className={`timeline-modal-content ${animationClass}`}>
          <Dialog.Title>Timeline</Dialog.Title>
            <Dialog.Description>Voici votre timeline...</Dialog.Description>
          <Dialog.Close className="modal-close">Fermer</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}