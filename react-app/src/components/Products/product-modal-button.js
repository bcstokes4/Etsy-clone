import { useModal } from "../../context/Modal";


function ProductModalButton({
    modalComponent, 
    buttonText, 
    onButtonClick, 
    onModalClose, 
  }) {
    const { setModalContent, setOnModalClose } = useModal();
  
    const onClick = () => {
      if (onModalClose) setOnModalClose(onModalClose);
      setModalContent(modalComponent);
      if (onButtonClick) onButtonClick();
    };
  
    return <div onClick={onClick}>{buttonText}</div>;
  }
  
  export default ProductModalButton;