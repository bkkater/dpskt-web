import React, { useCallback } from "react";
import * as SelectUI from "@radix-ui/react-select";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { getSession, useSession } from "next-auth/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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
import { Check, Landmark, ScanFace, Shield, User } from "lucide-react";

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
      await registerUser(session.user?.id, data);
      router.push("/");
    },
    [registerUser, router, session.user?.id],
  );

  return (
    <Page
      className="bg-abstract flex items-center justify-center"
      pageTitle="Registro"
    >
      <div className="m-auto w-100 rounded border border-[#29292E] bg-[#202024] p-10">
        <h1 className="mb-2 text-start text-2xl">Registro</h1>

        <p className="mb-8 text-start text-neutral-500">
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
            icon={ScanFace}
            error={errors.id?.message || null}
            {...register("id")}
          />

          <Controller
            control={control}
            name="corporation"
            render={({ field: { onChange, value } }) => (
              <Select
                label="Corporação"
                icon={Landmark}
                value={value}
                onChange={onChange}
                error={errors.corporation?.message || null}
              >
                {CORPORATION_OPTIONS.map((option) => (
                  <SelectUI.Item
                    className="relative rounded-b border-b border-neutral-800 p-3 outline-none transition-colors last:border-transparent focus:bg-gray-800"
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
                icon={Shield}
                value={value}
                onChange={onChange}
                error={errors.role?.message || null}
              >
                {ROLE_OPTIONS.map((option) => (
                  <SelectUI.Item
                    className="relative rounded-b border-b border-neutral-800 p-3 outline-none transition-colors last:border-transparent focus:bg-gray-800"
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
            className="mt-8 h-12 w-full bg-[#168ac5] py-2 text-sm font-bold shadow shadow-neutral-900 transition-colors hover:bg-[#168ac5] disabled:bg-[#1d2a30]"
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
