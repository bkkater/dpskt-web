import React from "react";

function Error({ statusCode }) {
  return (
    <p>
      {statusCode
        ? `${statusCode} - ocorreu um erro no servidor`
        : "Oops, algo deu errado!"}
    </p>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 404;

  return { statusCode };
};

export default Error;
