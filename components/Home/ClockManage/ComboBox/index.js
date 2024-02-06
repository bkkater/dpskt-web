/* eslint-disable function-paren-newline */
import React, { forwardRef, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Check, CaretUpDown } from "phosphor-react";

function ComboBoxComponent(
  { label, value, onChange, error, options, ...rest },
  ref
) {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!query.length) {
      return options;
    }

    const regex = new RegExp(`\\b${query}`, "i");

    return options.filter((option) => regex.test(option.label));
  }, [options, query]);

  return (
    <Combobox value={value} onChange={onChange}>
      <div className="relative">
        <div className="rounded h-12 flex items-center px-3 border-2 focus-within:border-[#084551] focus-within:ease-in focus-within:duration-300 gap-2 border-transparent bg-neutral-800">
          <Combobox.Input
            className="w-full bg-transparent outline-none placeholder:text-neutral-500 text-[#E1E1E6]"
            placeholder="Pesquisar player"
            autoComplete="off"
            displayValue={(option) => (option ? option.label : "")}
            onChange={(event) => setQuery(event.target.value)}
            ref={ref}
            {...rest}
          />

          {!!query.length && (
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          )}
        </div>

        {error && (
          <p className="text-rose-500 normal-case">
            {label
              ? `O campo ${label} é obrigatório.`
              : "Este campo é obrigatório"}
          </p>
        )}

        {!!query.length && (
          <Combobox.Options className="absolute w-full rounded-b bg-neutral-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
            {!filteredOptions.length && query.length && (
              <div className="relative p-3 cursor-default select-none">
                Nenhum player encontrado
              </div>
            )}

            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.label}
                value={option}
                className={({ active }) =>
                  `relative p-3 hover:bg-gray-800 rounded-b transition-colors outline-none border-b border-neutral-700 last:border-transparent ${
                    active && "bg-gray-800"
                  }`
                }
              >
                {({ selectedItem, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selectedItem ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>

                    {selectedItem && (
                      <span
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                          active ? "text-white" : "text-teal-600"
                        }`}
                      >
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}

const ComboBox = forwardRef(ComboBoxComponent);

export default ComboBox;
