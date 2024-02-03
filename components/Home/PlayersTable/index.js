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

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("player.statusClock", {
    header: () => "Em serviço",
    cell: (props) => {
      const iconClassName = ["w-2 h-2 rounded-full my-auto mr-2"];

      if (props.renderValue()) {
        iconClassName.push("bg-[#2D8F60]");
      } else {
        iconClassName.push("bg-[#A12525]");
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
        (item) => item.label === baseRow.getValue(columnId)
      );

      const comparePosition = ROLE_OPTIONS.findIndex(
        (item) => item.label === compareRow.getValue(columnId)
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
  const { allUsers, isLoading } = useUser();

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    columns,
    data: allUsers.data,
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
    <div className="mt-12">
      <h1 className="text-2xl text-start mb-2">Gerenciar usuários</h1>

      <p className="text-neutral-500 text-start">
        Altere informações, cargos ou exonere players cadastrados
      </p>

      {!isLoading && (
        <>
          <div className="flex align-center gap-4 mt-12 mb-8">
            {allUsers && (
              <>
                <p className="text-neutral-400">
                  Usuários cadastrados:
                  <b className="text-neutral-300 ml-2">
                    {allUsers.totalPlayers}
                  </b>
                </p>
                <span className="text-neutral-300">·</span>
                <p className="text-neutral-400">
                  Players patrulhando:
                  <b className="text-neutral-300 ml-2">
                    {allUsers.totalClocks}
                  </b>
                </p>
              </>
            )}

            <Button className="bg-[#286f8d] h-12 w-52 font-medium shadow transition-all text-[#e1e1e6] flex items-center gap-2 border-[#286f8d] hover:bg-transparent border ml-auto ">
              <IoLogoDiscord size={20} />
              Exportar hierarquia
            </Button>

            <input
              placeholder="Pesquisar"
              name="search"
              onChange={({ target }) => setGlobalFilter(target.value)}
              className="w-96 bg-neutral-800 outline-none rounded placeholder:text-neutral-600 flex h-12 px-4 border-2  border-neutral-800 focus:border-[#084551]"
              autoComplete="off"
            />
          </div>

          <table className="min-w-full mt-3">
            <thead className="bg-neutral-800 rounded">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
            <tbody className="bg-neutral-900 divide-y divide-neutral-700">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap"
                      style={{
                        width: cell.column.getSize(),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
