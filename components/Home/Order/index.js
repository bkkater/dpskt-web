import React, { useEffect } from "react";
import { Form } from "@unform/web";
import { ShoppingCart, Calendar, UsersThree } from "phosphor-react";

// Components
import Button from "@/components/Button";
import DatePicker from "@/components/Form/DatePicker";
import InputGroup from "@/components/Form/InputGroup";
import InputNumber from "@/components/Form/InputNumber";
import Select from "@/components/Form/Select";

// Config
import { PRODUCT_OPTIONS } from "@/config/general";
import Input from "@/components/Form/Input";

function Order({ handleAddItem, formRef, errors, company }) {
  useEffect(() => {
    if (company) {
      formRef.current.setFieldValue("company_field", company);
    }
  }, [company, formRef]);

  return (
    <Form className="md:w-4/12" onSubmit={handleAddItem} ref={formRef}>
      <h2 className="mb-10 text-3xl font-semibold">Pedido</h2>

      <InputGroup
        label="Organização"
        leftIcon={UsersThree}
        containerClassName="text-neutral-500"
      >
        <Input name="company_field" disabled />
      </InputGroup>

      <InputGroup
        label="Data de entrega"
        id="date"
        leftIcon={Calendar}
        error={errors?.date}
      >
        <DatePicker name="date" />
      </InputGroup>

      <div className="lg:flex block">
        <InputGroup
          label="Produto"
          className="flex-1"
          leftIcon={ShoppingCart}
          error={errors?.product}
        >
          <Select options={PRODUCT_OPTIONS} name="product" />
        </InputGroup>

        <InputGroup
          label="Quantidade"
          className="md:w-full sm:w-36 lg:w-36  lg:ml-3"
          error={errors?.amount}
        >
          <InputNumber name="amount" min="1" />
        </InputGroup>
      </div>

      <Button
        className="bg-[#58100e] font-medium mt-3 w-44 flex justify-center lg:ml-auto lg:mb-0 mb-10 text-sm py-2"
        type="submit"
      >
        Adicionar ao carrinho
      </Button>
    </Form>
  );
}

export default Order;
