import * as Dialog from "@radix-ui/react-dialog";
import "./Modale.css"; // Ajoute du style
import { useEffect, useState } from "react";

export default function Modale({ open, onClose, title, content }) {
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
        <Dialog.Content className={`modal-content ${animationClass}`}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{content}</Dialog.Description>
          <Dialog.Close className="modal-close">Fermer</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}