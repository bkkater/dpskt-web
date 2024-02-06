import React from "react";

function Error({ statusCode }) {
  return (
    <div className="block">
      <div className="flex mb-4 gap-4 justify-center">
        {statusCode && (
          <h1 className="text-5xl border-r pr-4 border-neutral-600">
            {statusCode}
          </h1>
        )}

        <span className="text-xl my-auto">Oops, algo deu errado!</span>
      </div>

      <p className="text-neutral-500">
        Por favor entre em contato com um desenvolvedor
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;

  return { statusCode };
};

export default Error;
