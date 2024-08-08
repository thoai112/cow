import React, { useMemo, useState } from "react";
import "./Table.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  // getFilteredRowModel,
  // getGroupedRowModel,
} from "@tanstack/react-table";
import useCurrencyFetch from "../hooks/useCurrencyFetch";
const Table = () => {
  const [sorting, setSorting] = useState([]);
  const [filters, setFilters] = useState({
    code: "",
    numToBasic: "",
    minorSingle: "",
    priceVND: "",
  });
  const [visibleColumns, setVisibleColumns] = useState({
    code: true,
    numToBasic: true,
    minorSingle: true,
    priceVND: true,
  });

  const { data: mData, loading, error } = useCurrencyFetch();
  console.log(mData);
  const filteredData = useMemo(() => {
    return mData.filter((item) => {
      const matchesCode =
        filters.code === "" ||
        item.name.toLowerCase().includes(filters.code.toLowerCase());
      const matchesnumToBasic =
        filters.numToBasic === "" ||
        item.numToBasic
          .toLowerCase()
          .includes(filters.numToBasic.toLowerCase());
      const matchesminorSingle =
        filters.minorSingle === "" ||
        item.minorSingle
          .toLowerCase()
          .includes(filters.minorSingle.toLowerCase());
      const matchespriceVND =
        filters.priceVND === "" ||
        item.priceVND.toLowerCase().includes(filters.priceVND.toLowerCase());
      return (
        matchesCode &&
        matchesnumToBasic &&
        matchesminorSingle &&
        matchespriceVND
      );
    });
  }, [mData, filters]);

  // //Memoized columns based on visibleColumns state
  const columns = useMemo(
    () =>
      [
        {
          header: "Code",
          accessorKey: "code",
          footer: "Code",
        },
        {
          header: "Basic Unit",
          accessorKey: "numToBasic",
          footer: "Basic Unit",
        },
        {
          header: "Fractional Unit",
          accessorKey: "minorSingle",
          footer: "Fractional Unit",
        },
        {
          header: "Price VND",
          accessorKey: "priceVND",
          footer: "Price VND",
        },
      ].filter((column) => visibleColumns[column.accessorKey]),
    [visibleColumns]
  );

  // // React Table hook setup
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getGroupedRowModel: getGroupedRowModel(), // Include getGroupedRowModel for grouping
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  return (
    <div>
      <table className="data__table">
        <thead className="thead-dark">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  class="th-right"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {
                    { asc: "🔼", desc: "🔽" }[
                      header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} class="content">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-feature">
        <button
          className="pagination-button"
          onClick={() => {
            table.setPageIndex(0);
          }}
        >
          First Page
        </button>
        <button
          className="pagination-button"
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
        >
          Previous
        </button>
        <button
          className="pagination-button"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
        >
          Next
        </button>
        <button
          className="pagination-button"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
          }}
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Table;
