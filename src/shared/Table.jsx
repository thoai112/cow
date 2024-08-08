import React, { useMemo, useState } from "react";
import "./Table.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel
  // getFilteredRowModel,
  // getGroupedRowModel,
} from "@tanstack/react-table";
import { API_URL } from '../utils/config';
import useCurrencyFetch from '../hooks/useCurrencyFetch';
const Table = () => {
  // const [sorting, setSorting] = useState([]);
  // const [filters, setFilters] = useState({
  //   code: "",
  //   numToBasic: "",
  //   minorSingle: "",
  //   priceVND: [0, 1000000000],
  // });
  // const [visibleColumns, setVisibleColumns] = useState({
  //   code: true,
  //   numToBasic: true,
  //   minorSingle: true,
  //   priceVND: true,
  // });
  const { data: mData, loading, error } = useCurrencyFetch();
  console.log(mData);

  // const filteredData = useMemo(() => {
  //   return mData.filter((item) => {
  //     const matchesCode =
  //       filters.code === "" ||
  //       item.name.toLowerCase().includes(filters.code.toLowerCase());
  //     const matchesnumToBasic =
  //       filters.numToBasic === "" ||
  //       item.numToBasic
  //         .toLowerCase()
  //         .includes(filters.numToBasic.toLowerCase());
  //     const matchesminorSingle =
  //       filters.minorSingle === "" ||
  //       item.minorSingle
  //         .toLowerCase()
  //         .includes(filters.minorSingle.toLowerCase());
  //     const matchespriceVND =
  //       item.priceVND >= filters.priceVND[0] &&
  //       item.priceVND <= filters.priceVND[1];
  //     return (
  //       matchesCode &&
  //       matchesnumToBasic &&
  //       matchesminorSingle &&
  //       matchespriceVND
  //     );
  //   });
  // }, [mData, filters]);

  // Memoized columns based on visibleColumns state
  // const columns = useMemo(
  //   () =>
  //     [
  //       {
  //         header: "Code",
  //         accessorKey: "Code",
  //         footer: "Code",
  //       },
  //       {
  //         header: "Basic Unit",
  //         accessorKey: "numToBasic",
  //         footer: "Basic Unit",
  //       },
  //       {
  //         header: "Fractional Unit",
  //         accessorKey: "minorSingle",
  //         footer: "Fractional Unit",
  //       },
  //       {
  //         header: "Price VND",
  //         accessorKey: "priceVND",
  //         footer: "Price VND",
  //       },
  //     ].filter((column) => visibleColumns[column.accessorKey]),
  //   [visibleColumns]
  // );

  // // React Table hook setup
  // const table = useReactTable({
  //   data: filteredData,
  //   columns,
  //   getCoreRowModel: getCoreRowModel(),
  //   getPaginationRowModel: getPaginationRowModel(),
  //   getSortedRowModel: getSortedRowModel(),
  //   // getFilteredRowModel: getFilteredRowModel(),
  //   // getGroupedRowModel: getGroupedRowModel(), // Include getGroupedRowModel for grouping
  //   state: {
  //     sorting,
  //   },
  //   onSortingChange: setSorting,
  // });

  return (
    <table className="table table-striped rounded-corners">
      {/* <thead className="thead-dark">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {{ asc: "🔼", desc: "🔽" }[header.column.getIsSorted() ?? null]}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody> */}
    </table>
  );
};

export default Table;
