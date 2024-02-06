import React from "react";

function Custom500() {
  return (
    <div className="block">
      <div className="flex mb-4 gap-4 justify-center">
        <h1 className="text-5xl border-r pr-4 border-neutral-600">404</h1>

        <span className="text-xl my-auto">
          Oops, algo deu errado no servidor!
        </span>
      </div>

      <p className="text-neutral-500">
        Por favor entre em contato com um desenvolvedor
      </p>
    </div>
  );
}

export default Custom500;
