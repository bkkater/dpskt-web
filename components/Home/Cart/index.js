import React from "react";

import Card from "@/components/Home/Card";

function Cart({ data, handleRemoveItem }) {
  const formatNumber = new Intl.NumberFormat();
  const { totalValue, items } = data;

  return (
    <div className="md:w-6/12 md:mt-0 mt-10">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-3xl font-semibold">Carrinho</h2>

        <div className="flex">
          <span className="flex justify-end">Valor total:</span>
          <span className="ml-2">
            {totalValue === 0
              ? ` $ 0.00`
              : `$ ${formatNumber.format(totalValue)}.000`}
          </span>
        </div>
      </div>

      <div className="flex-1 md:mb-0 mb-10">
        {items.length ? (
          items.map((item) => (
            <Card
              item={item}
              key={item.id}
              handleRemoveItem={handleRemoveItem}
            />
          ))
        ) : (
          <p className="text-neutral-500">Não há itens no carrinho</p>
        )}
      </div>
    </div>
  );
}

export default Cart;
