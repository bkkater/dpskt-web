import React, { useState } from "react";
import { IoLogoDiscord } from "react-icons/io5";
import { format } from "date-fns";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

// Hooks
import { useUser } from "@/hooks/useUser";

// Config
import { ROLE_OPTIONS } from "@/config/general";

// Components
import CheckboxCell from "@/components/Home/PlayersTable/CheckboxCell";
import ActionsCell from "@/components/Home/PlayersTable/ActionsCell";
import Loading from "@/components/Loading";
import Button from "@/components/Button";
import { Divider } from "antd";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("player.statusClock", {
    header: () => "Em serviço",
    cell: (props) => {
      const iconClassName = ["w-2 h-2 rounded-full my-auto mr-2"];

      if (props.renderValue()) {
        iconClassName.push("bg-[#3DA35D]");
      } else {
        iconClassName.push("bg-[#dd2323]");
      }

      return <div className={iconClassName.join(" ")} />;
    },
    size: 80,
  }),
  columnHelper.accessor("player.joinedAt", {
    cell: (info) => format(info.renderValue(), "dd MMM yy"),
    sortType: "datetime",
    header: () => "Recrutamento",
    size: 100,
  }),
  columnHelper.accessor("player.id", {
    cell: (info) => info.renderValue(),
    header: () => "ID",
    sortingFn: (compareRow, baseRow, columnId) => {
      const baseNum = baseRow.getValue(columnId);
      const compareNum = compareRow.getValue(columnId);

      return baseNum - compareNum;
    },
    size: 80,
  }),
  columnHelper.accessor("player.name", {
    id: "name",
    header: () => "Nome",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("player.corporation", {
    header: () => "Corporação",
    cell: (info) => info.renderValue(),
    size: 80,
  }),
  columnHelper.accessor("player.role", {
    header: () => "Cargo",
    cell: (info) => info.renderValue(),
    sortingFn: (compareRow, baseRow, columnId) => {
      const basePosition = ROLE_OPTIONS.findIndex(
        (item) => item.label === baseRow.getValue(columnId),
      );

      const comparePosition = ROLE_OPTIONS.findIndex(
        (item) => item.label === compareRow.getValue(columnId),
      );

      return basePosition - comparePosition;
    },
  }),
  columnHelper.accessor("player.isAdmin", {
    header: () => "Admin",
    cell: CheckboxCell,
    enableSorting: false,
  }),
  columnHelper.accessor("actions", {
    header: () => "Ações",
    cell: ActionsCell,
    enableSorting: false,
  }),
];

export default function PlayersTable() {
  const { users, isLoading } = useUser();

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data: users.data || [],
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
  });

  return (
    <div className="my-12 animate-fadeIn">
      <h1 className="mb-2 text-start text-2xl">Gerenciar usuários</h1>

      <p className="text-start text-neutral-500">
        Altere informações, cargos ou exonere players cadastrados
      </p>

      <Divider className="mb-0 w-full border-[#1e1e22]" />

      {!isLoading && (
        <>
          <div className="mt-12 mb-8 flex items-center gap-4">
            {users && (
              <>
                <p className="text-neutral-400">
                  Usuários cadastrados:
                  <b className="ml-2 text-neutral-300">{users.totalPlayers}</b>
                </p>
                <span className="text-neutral-300">·</span>
                <p className="text-neutral-400">
                  Players patrulhando:
                  <b className="ml-2 text-neutral-300">{users.totalClocks}</b>
                </p>
              </>
            )}

            <Button className="ml-auto flex h-12 w-52 items-center gap-2 border border-[#168ac5] bg-[#168ac5] font-medium text-[#e1e1e6] shadow transition-all hover:bg-transparent ">
              <IoLogoDiscord size={20} />
              Exportar hierarquia
            </Button>

            <input
              placeholder="Pesquisar"
              name="search"
              onChange={({ target }) => setGlobalFilter(target.value)}
              className="flex h-12 w-96 rounded border-2 border-neutral-800 bg-neutral-800 px-4 outline-none  placeholder:text-neutral-600 focus:border-[#084551]"
              autoComplete="off"
            />
          </div>

          <table className="mt-3 min-w-full">
            <thead className="rounded bg-neutral-800">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="cursor-pointer px-6 py-4 text-left text-xs  font-medium uppercase tracking-wider"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {{
                        asc: " ▲",
                        desc: " ▼",
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-neutral-700 bg-neutral-900">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap px-6 py-4"
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {isLoading && <Loading />}
    </div>
  );
}
