import React from "react";
import { Trash } from "phosphor-react";

function Card({ item, className, handleRemoveItem, ...rest }) {
  const classList = [
    "rounded lg:flex relative justify-between items-center bg-[#202024] font-bold p-5 lg:h-32 text-sm mb-5",
  ];

  if (className) {
    classList.push(className);
  }

  return (
    <div className={classList.join(" ")} id={item.id} {...rest}>
      <div className="lg:mb-0 mb-5">
        <h3 className="text-base">Produto</h3>
        <span className="text-[#7C7C8A] font-medium text-base">
          {item.product}
        </span>
      </div>

      <div className="lg:mb-0 mb-5">
        <h3 className="text-base">Preço unitário</h3>
        <span className="text-[#7C7C8A] font-medium text-base">
          {`$ ${item.price}.000`}
        </span>
      </div>

      <div className="lg:mb-0 mb-5">
        <h3 className="text-base">Quantidade</h3>
        <span className="text-[#7C7C8A] font-medium text-base">
          {item.amount}
        </span>
      </div>

      <div className="lg:mb-0 mb-5 xl:block lg:hidden">
        <h3 className="text-base">Entrega</h3>
        <span className="text-[#7C7C8A] font-medium text-base">
          {item.date}
        </span>
      </div>

      <button
        className="outline-none lg:static absolute top-5 right-5"
        onClick={() => handleRemoveItem(item.id)}
        type="button"
      >
        <Trash size={24} color="#7C7C8A" />
      </button>
    </div>
  );
}

export default Card;
