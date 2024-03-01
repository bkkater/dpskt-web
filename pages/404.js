import React from "react";

function Custom404() {
  return (
    <div className="bg-abstract flex h-full flex-col items-center justify-center gap-4">
      <div className="mx-auto flex items-center justify-center gap-4">
        <h1 className="border-r border-neutral-600 pr-4 text-5xl">404</h1>

        <span className="my-auto text-xl">Oops, nada encontrado por aqui!</span>
      </div>

      <p className="text-center text-neutral-500">
        Por favor entre em contato com um desenvolvedor
      </p>
    </div>
  );
}

export default Custom404;
