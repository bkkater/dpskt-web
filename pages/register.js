import React, { useCallback, useRef, useState } from "react";
import { getSession } from "next-auth/react";
import { Form } from "@unform/web";
import { Suitcase, UsersThree } from "phosphor-react";
import * as Yup from "yup";

// Components
import Page from "@/components/Page";
import InputGroup from "@/components/Form/InputGroup";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";
import Button from "@/components/Button";

// Config
import { ROLE_OPTIONS } from "@/config/general";

export default function Register() {
  const formRef = useRef();
  const [errors, setErrors] = useState([]);

  const handleSubmit = useCallback(async () => {
    try {
      formRef.current.setErrors([]);
      setErrors([]);

      const userSchema = Yup.object().shape({
        name: Yup.string().required(),
        role: Yup.string().required(),
      });

      await userSchema.validate(formRef.current.getData(), {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
        setErrors(validationErrors);
      }
    }
  }, []);

  return (
    <Page className="flex items-center justify-center" pageTitle="Registro">
      <Form
        className="bg-[#202024] p-10 rounded w-100"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center">Registro</h1>
        <p className="text-neutral-500 text-center mb-8">
          Insira informações do seu personagem
        </p>

        <InputGroup
          label="Nome"
          hideLabel
          leftIcon={UsersThree}
          error={errors?.name}
        >
          <Input name="name" placeholder="Nome Completo" />
        </InputGroup>

        <InputGroup
          className="flex-1"
          leftIcon={Suitcase}
          error={errors?.role}
          label="Patente"
          hideLabel
        >
          <Select options={ROLE_OPTIONS} name="role" disabled />
        </InputGroup>

        <Button
          className="bg-[#2B2D42] h-12 font-bold mt-8 w-full text-sm py-2"
          type="submit"
        >
          CADASTRAR
        </Button>
      </Form>
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const id = process.env.DISCORD_WEBHOOK_ID;
  const token = process.env.DISCORD_WEBHOOK_TOKEN;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      id,
      token,
    },
  };
};
