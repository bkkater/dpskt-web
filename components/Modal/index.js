import React from "react";
import { IoClose } from "react-icons/io5";

// Components
import Button from "@/components/Button";

function Modal({ className, modalClassName, handleCloseModal, children }) {
  const classList = ["transition"];
  const modalClassList = [
    "absolute p-10 inset-2/4 -translate-x-2/4 -translate-y-2/4 rounded",
  ];

  if (className) {
    classList.push(className);
  }

  if (modalClassName) {
    modalClassList.push(modalClassName);
  }

  return (
    <div className={classList}>
      <div className="absolute top-28 bottom-0 inset-x-0 bg-[#020202] opacity-95" />
      <div className={modalClassList.join(" ")}>
        {!!handleCloseModal && (
          <Button onClick={handleCloseModal} className="absolute top-3 right-3">
            <IoClose color="#4E4E4E" size={22} />
          </Button>
        )}

        {children}
      </div>
    </div>
  );
}

export default Modal;
