import React from "react";
import { IdentificationCard, PoliceCar, Suitcase, User } from "phosphor-react";

// Config
import { CORPORATION_OPTIONS, ROLE_OPTIONS } from "@/config/general";

// Components
import Input from "@/components/Form/Input";
import InputGroup from "@/components/Form/InputGroup";
import Select from "@/components/Form/Select";

function PlayerFields({ title, description, errors }) {
  return (
    <>
      <h1 className="text-2xl text-center mb-2">{title}</h1>

      <p className="text-neutral-500 text-center mb-8">{description}</p>

      <InputGroup label="Nome" hideLabel leftIcon={User} error={errors?.name}>
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
    </>
  );
}

export default PlayerFields;
