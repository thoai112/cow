import React, { useMemo, useState, useEffect } from "react";
import "./Table.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  // getGroupedRowModel,
} from "@tanstack/react-table";
import useCurrencyFetch from "../hooks/useCurrencyFetch";
import Calendar from "./Calendar";
import { API_URL } from "../utils/config";

const Table = ({ onAveragePriceChange }) => {
  const [sorting, setSorting] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Pagination Data
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Search matching rows
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

  console.log(selectedDate);

  const formatNumber = (number) => {
    return new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const [filters, setFilters] = useState({
    code: "",
    numToBasic: "",
    value: "",
  });
  const [visibleColumns, setVisibleColumns] = useState({
    code: true,
    numToBasic: true,
    value: true,
  });

  const { data: mData, loading, error } = useCurrencyFetch(`${API_URL}/chart/currency`);

  const currency = mData.currency || [];
  const cowValue =
    mData.cowvalue !== null ? parseFloat(mData.cowvalue).toFixed(2) : null;

  const filteredData = useMemo(() => {
    return currency.filter((item) => {
      const matchesCode =
        filters.code === "" ||
        item.name.toLowerCase().includes(filters.code.toLowerCase());
      const matchesnumToBasic =
        filters.numToBasic === "" ||
        item.numToBasic
          .toLowerCase()
          .includes(filters.numToBasic.toLowerCase());
      const matchesValue =
        filters.value === "" ||
        item.value
        .toLowerCase()
        .includes(filters.value.toLowerCase());
      return matchesCode && matchesnumToBasic && matchesValue;
    });
  }, [currency, filters]);

  // const averagePriceVND = useMemo(() => {
  //   const total = filteredData.reduce((sum, item) => {
  //     return sum + parseFloat(item.priceVND);
  //   }, 0);
  //   const average = total / filteredData.length || 0;
  //   return formatNumber(average);
  // }, [filteredData]);

  useEffect(() => {
    if (onAveragePriceChange) {
      onAveragePriceChange(cowValue);
    }
  }, [cowValue, onAveragePriceChange]);



  const columns = useMemo(
    () =>
      [
        {
          header: "Mã tiền tệ",
          accessorKey: "code",
          footer: "Code",
        },
        {
          header: "Đơn vị cơ bản",
          accessorKey: "numToBasic",
          footer: "Basic Unit",
        },
        {
          header: "VND",
          accessorKey: "value",
          footer: "Price VND",
        },
      ].filter((column) => visibleColumns[column.accessorKey]),
    [visibleColumns]
  );

  // React Table hook setup
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // Clear filtering function
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="data__table">
      <h1> List Of Currency</h1>
      <div className="cow__value">
        <div className="col-6">
          <Calendar onDateChange={setSelectedDate} />
        </div>
        <div className="col-3">
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
          </div>
        </div>
        <div className="col-3">
          <h2>1 COW = {cowValue} VND</h2>
          {/* <h2>{getData}</h2> */}
        </div>

        {/* 
        <h2>1 COW = {averagePriceVND} VND</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </div> */}
      </div>
      <table>
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
          {table.getRowModel().rows.map((row) => {
            const rowData = row.original;
            const isHighlighted =
              searchTerm &&
              Object.values(rowData).some((value) =>
                value
                  .toString()
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              );
            return (
              <tr key={row.id} className={isHighlighted ? "highlight" : ""}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
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
      {/* <div className="pagination">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
};

export default Table;
