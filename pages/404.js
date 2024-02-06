import React from "react";

function Custom404() {
  return (
    <div className="block">
      <div className="flex mb-4 gap-4 justify-center">
        <h1 className="text-5xl border-r pr-4 border-neutral-600">404</h1>

        <span className="text-xl my-auto">Oops, nada encontrado por aqui!</span>
      </div>

      <p className="text-neutral-500">
        Por favor entre em contato com um desenvolvedor
      </p>
    </div>
  );
}

export default Custom404;
