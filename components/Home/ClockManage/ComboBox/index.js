/* eslint-disable function-paren-newline */
import React, { forwardRef, useMemo, useState } from "react";
import { Combobox } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";

function ComboBoxComponent(
  { label, value, onChange, error, options, ...rest },
  ref,
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
        <div className="flex h-12 w-72 items-center gap-2 rounded border-2 border-transparent bg-neutral-800 px-3 focus-within:border-[#084551] focus-within:duration-300 focus-within:ease-in">
          <Combobox.Input
            className="w-full bg-transparent text-[#E1E1E6] outline-none placeholder:text-neutral-500"
            placeholder="Pesquisar player"
            autoComplete="off"
            displayValue={(option) => (option ? option.label : "")}
            onChange={(event) => setQuery(event.target.value)}
            ref={ref}
            {...rest}
          />

          {!!query.length && (
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          )}
        </div>

        {error && (
          <p className="normal-case text-rose-500">
            {label
              ? `O campo ${label} é obrigatório.`
              : "Este campo é obrigatório"}
          </p>
        )}

        {!!query.length && (
          <Combobox.Options className="absolute w-full rounded-b bg-neutral-800 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
            {!filteredOptions.length && query.length && (
              <div className="relative cursor-default select-none p-3">
                Nenhum player encontrado
              </div>
            )}

            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.label}
                value={option}
                className={({ active }) =>
                  `relative rounded-b border-b border-neutral-700 p-3 outline-none transition-colors last:border-transparent hover:bg-gray-800 ${
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
