import React from "react";
import { XCircle } from "phosphor-react";

// Components
import Modal from "@/components/Modal";

function ModalFail({ handleCloseModal }) {
  return (
    <Modal
      modalClassName="bg-gray-100 flex flex-col items-center w-fit h-fit"
      handleCloseModal={handleCloseModal}
    >
      <XCircle color="#BB2121" size={64} />
      <h2 className="text-stone-900 mb-3">Ops, ocorreu um erro</h2>
      <p className="text-neutral-500 w-max font-medium">
        Adicione itens ao carrinho para finalizar seu pedido
      </p>
    </Modal>
  );
}

export default ModalFail;
