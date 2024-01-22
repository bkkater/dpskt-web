import React, { useCallback, useEffect, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

// Services
import { getAllUsers } from "@/services/user";

// Config
import { ROLE_OPTIONS } from "@/config/general";

// Components
import Loading from "@/components/Loading";
import CheckboxCell from "@/components/Table/CheckboxCell";
import ActionsCell from "@/components/Table/ActionsCell";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("player.id", {
    cell: (info) => info.renderValue(),
    header: () => "ID",
  }),
  columnHelper.accessor("player.name", {
    id: "name",
    header: () => "Nome",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("player.corporation", {
    header: () => "Corporação",
    cell: (info) => info.renderValue(),
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
  const [sorting, setSorting] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState([]);
  const [infos, setInfos] = useState(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  const getPlayers = useCallback(async () => {
    try {
      const {
        data: { users, entries, onlineClocks },
      } = await getAllUsers();

      setData(users);
      setInfos({ totalPlayers: entries, totalClocks: onlineClocks });
    } catch (err) {
      setData([]);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    getPlayers();
  }, [getPlayers]);

  return (
    <>
      {!isLoading && (
        <>
          <div className="flex jujstify-between align-center gap-4">
            {infos && (
              <>
                <p className="text-neutral-400">
                  Total de players:
                  <b className="text-neutral-300 ml-2">{infos.totalPlayers}</b>
                </p>
                <span className="text-neutral-300">·</span>
                <p className="text-neutral-400">
                  Total de players patrulhando:
                  <b className="text-neutral-300 ml-2">{infos.totalClocks}</b>
                </p>
              </>
            )}

            <input
              placeholder="Pesquisar"
              name="search"
              onChange={({ target }) => setGlobalFilter(target.value)}
              className="w-96 bg-neutral-800 outline-none rounded placeholder:text-neutral-600 flex ml-auto h-10 px-4 border-[#2B2D42] border-2"
            />
          </div>

          <table className="min-w-full mt-8">
            <thead className="bg-neutral-800 rounded">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider cursor-pointer"
                      onClick={header.column.getToggleSortingHandler()}
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
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
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
    </>
  );
}
