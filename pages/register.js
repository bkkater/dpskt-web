import React, { useCallback, useRef, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { IdentificationCard, PoliceCar, Suitcase, User } from "phosphor-react";
import { useRouter } from "next/router";
import { Form } from "@unform/web";
import * as Yup from "yup";

// Services
import { getUser, storeUser } from "@/services/user";

// Config
import { CORPORATION_OPTIONS, ROLE_OPTIONS } from "@/config/general";

// Components
import Page from "@/components/Page";
import Button from "@/components/Button";
import Select from "@/components/Form/Select";
import InputGroup from "@/components/Form/InputGroup";
import Input from "@/components/Form/Input";

export default function Register() {
  const formRef = useRef();
  const [errors, setErrors] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  async function validateFormSchema(data) {
    const schema = Yup.object().shape({
      name: Yup.string().min(3).required(),
      role: Yup.string().required(),
      corporation: Yup.string().required(),
      id: Yup.number().positive().required(),
    });

    return schema.validate(data, { abortEarly: false });
  }

  const handleSubmit = useCallback(async () => {
    try {
      formRef.current.setErrors([]);
      setErrors([]);

      const data = formRef.current.getData();

      await validateFormSchema(data);

      // Chamar o contexto
      await storeUser({
        player: { ...data, joinedAt: new Date() },
        discordId: session.user?.id,
      });

      router.push("/");
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
  }, [router, session.user?.id]);

  return (
    <Page className="flex items-center justify-center" pageTitle="Registro">
      <div className="bg-[#202024] p-10 rounded w-100  ">
        <h1 className="text-2xl mb-2 text-start">Registro</h1>

        <p className="text-neutral-500 text-start mb-8">
          Insira informações do seu personagem
        </p>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <InputGroup
            label="Nome"
            hideLabel
            leftIcon={User}
            error={errors?.name}
          >
            <Input name="name" placeholder="Nome Completo" />
          </InputGroup>

          <InputGroup
            label="ID"
            hideLabel
            leftIcon={IdentificationCard}
            error={errors?.id}
          >
            <Input type="number" name="id" placeholder="ID" />
          </InputGroup>

          <InputGroup
            className="flex-1"
            leftIcon={PoliceCar}
            error={errors?.corporation}
            label="corporation"
            hideLabel
          >
            <Select
              options={CORPORATION_OPTIONS}
              name="corporation"
              placeholder="Corporação"
            />
          </InputGroup>

          <InputGroup
            className="flex-1"
            leftIcon={Suitcase}
            error={errors?.role}
            label="Patente"
            hideLabel
          >
            <Select options={ROLE_OPTIONS} name="role" placeholder="Patente" />
          </InputGroup>

          <Button
            className="bg-[#286f8d] h-12 font-bold mt-8 w-full text-sm py-2 shadow shadow-neutral-900 transition-colors"
            type="submit"
          >
            CADASTRAR
          </Button>
        </Form>
      </div>
    </Page>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const user = await getUser(session.user.id);

    return {
      props: {
        user,
      },
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } catch (err) {
    return {
      props: {
        session,
      },
    };
  }
};
