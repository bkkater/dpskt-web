import React, { useCallback } from "react";
import * as SelectUI from "@radix-ui/react-select";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Check,
  IdentificationCard,
  PoliceCar,
  Suitcase,
  User,
} from "@phosphor-icons/react/dist/ssr";

// Config
import { CORPORATION_OPTIONS, ROLE_OPTIONS } from "@/config/general";

// Services
import { getUser } from "@/services/user";

// Hooks
import { useUser } from "@/hooks/useUser";

// Components
import Page from "@/components/Page";
import Button from "@/components/Button";
import Input from "@/components/Form/Input";
import Select from "@/components/Form/Select";

// Validation
const schema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  role: Yup.string().required(),
  corporation: Yup.string().required(),
  id: Yup.number().positive().required(),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: session } = useSession();
  const { registerUser, isLoading } = useUser();
  const router = useRouter();

  const handleRegisterSubmit = useCallback(
    async (data) => {
      try {
        await registerUser(session.user?.id, data);

        router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
    [registerUser, router, session.user?.id]
  );

  return (
    <Page className="flex items-center justify-center" pageTitle="Registro">
      <div className="bg-[#202024] p-10 rounded w-100 min-h-96">
        <h1 className="text-2xl mb-2 text-start">Registro</h1>

        <p className="text-neutral-500 text-start mb-8">
          Insira informações do seu personagem
        </p>

        <form onSubmit={handleSubmit(handleRegisterSubmit)}>
          <Input
            label="Nome"
            placeholder="Nome Completo"
            icon={User}
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="ID"
            placeholder="ID"
            type="number"
            icon={IdentificationCard}
            error={errors.id?.message || null}
            {...register("id")}
          />

          <Controller
            control={control}
            name="corporation"
            render={({ field: { onChange, value } }) => (
              <Select
                label="Corporação"
                icon={PoliceCar}
                value={value}
                onChange={onChange}
                error={errors.corporation?.message || null}
              >
                {CORPORATION_OPTIONS.map((option) => (
                  <SelectUI.Item
                    className="relative p-3 focus:bg-gray-800 rounded-b transition-colors outline-none border-b border-neutral-800 last:border-transparent"
                    value={option.label}
                    key={option.label}
                  >
                    <div className="flex items-center">
                      <SelectUI.ItemText>{option.label}</SelectUI.ItemText>
                      <SelectUI.ItemIndicator className="absolute right-2 inline-flex items-center">
                        <Check />
                      </SelectUI.ItemIndicator>
                    </div>
                  </SelectUI.Item>
                ))}
              </Select>
            )}
          />

          <Controller
            control={control}
            name="role"
            render={({ field: { onChange, value } }) => (
              <Select
                label="Cargo"
                icon={Suitcase}
                value={value}
                onChange={onChange}
                error={errors.role?.message || null}
              >
                {ROLE_OPTIONS.map((option) => (
                  <SelectUI.Item
                    className="relative p-3 focus:bg-gray-800 rounded-b transition-colors outline-none border-b border-neutral-800 last:border-transparent"
                    value={option.label}
                    key={option.label}
                  >
                    <div className="flex items-center">
                      <SelectUI.ItemText>{option.label}</SelectUI.ItemText>
                      <SelectUI.ItemIndicator className="absolute right-2 inline-flex items-center">
                        <Check />
                      </SelectUI.ItemIndicator>
                    </div>
                  </SelectUI.Item>
                ))}
              </Select>
            )}
          />

          <Button
            className="bg-[#286f8d] hover:bg-[#4689b3]  h-12 font-bold mt-8 w-full text-sm py-2 shadow shadow-neutral-900 transition-colors disabled:bg-[#1d2a30]"
            type="submit"
            disabled={isLoading}
          >
            CADASTRAR
          </Button>
        </form>
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
