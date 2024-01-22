import React, { useCallback, useRef, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Form } from "@unform/web";
import * as Yup from "yup";

// Services
import { getUser, storeUser } from "@/services/user";

// Components
import Page from "@/components/Page";
import PlayerFields from "@/components/Player/Fields";
import Button from "@/components/Button";

export default function Register() {
  const formRef = useRef();
  const [errors, setErrors] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  async function validateFormSchema(data) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
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

      await storeUser({ player: { ...data }, discordId: session.user?.id });

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
      <Form
        className="bg-[#202024] p-10 rounded w-100"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <PlayerFields
          title="Registro"
          description="Insira informações do seu personagem"
          buttonTitle="CADASTRAR"
          errors={errors}
        />

        <Button
          className="bg-[#2B2D42] h-12 font-bold mt-8 w-full text-sm py-2 hover:bg-[#202031] border border-neutral-700 transition-colors"
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
