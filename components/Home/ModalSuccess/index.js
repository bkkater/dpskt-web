import React from "react";
import { CheckCircle } from "phosphor-react";

// Components
import Modal from "@/components/Modal";

function ModalSucess({ handleCloseModal }) {
  return (
    <Modal
      modalClassName="bg-gray-100 flex flex-col items-center w-fit h-fit"
      handleCloseModal={handleCloseModal}
    >
      <CheckCircle color="#4F675B" size={64} />
      <h2 className="text-stone-900">Pedido realizado</h2>
      <p className="text-neutral-500 w-max font-medium">
        Agradecemos por sua preferência
      </p>
    </Modal>
  );
}

export default ModalSucess;
