import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, 
  buttonText, 
  onButtonClick, 
  onModalClose 
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;