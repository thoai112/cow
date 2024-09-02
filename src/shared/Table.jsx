import React, { useMemo, useState, useEffect } from "react";
import "./Table.css";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import useCurrencyFetch from "../hooks/useCurrencyFetch";
import Calendar from "./Calendar";
import { formatDate, formatNumber } from "../utils/formatDate";
import { useTranslation } from "react-i18next";

const Table = ({ onAveragePriceChange }) => {
  const { t } = useTranslation();
  const [sorting, setSorting] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Pagination Data
  // const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Search matching rows
  const [searchTerm, setSearchTerm] = useState("");

  const [filters] = useState({
    code: "",
    numToBasic: "",
    value: "",
  });
  const [visibleColumns] = useState({
    code: true,
    numToBasic: true,
    value: true,
  });

  const { data: mData, loading } = useCurrencyFetch(formatDate(selectedDate));

  const cowValue =
    mData.cowvalue !== null ? formatNumber(mData.cowvalue): null;

  const currency = useMemo(() => mData.currency || [], [mData.currency]);

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
        item.value.toLowerCase().includes(filters.value.toLowerCase());
      return matchesCode && matchesnumToBasic && matchesValue;
    });
  }, [currency, filters]);

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
          cell: ({ row }) => {
            const newValue = formatNumber(row.original.value);
            const previousValue = formatNumber(row.original.valuePrevious);
            const color = newValue > previousValue ? "value-up" : "value-down";
            return <span className={color}>{newValue}</span>;
          },
          //cell: ({ getValue }) => parseFloat(getValue()).toFixed(2),
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
      <h1> {t("table.title")}</h1>
      <div className="cow__value">
        <div className="col-6">
          <Calendar onDateChange={setSelectedDate} />
        </div>
        <div className="col-5 row__price">
          <div className="search-bar">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
            />
            <div className="cow__price">1 COW = {cowValue} VND</div>
          </div>
        </div>
        
      </div>
      <table>
        <thead className="thead-dark">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="th-right"
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
          {loading ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="load">
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                </div>
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => {
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <div className="pagination-feature">
        <button
          className="pagination-button"
          onClick={() => {
            table.setPageIndex(0);
          }}
        >
          {t("table.first_page")}
        </button>
        <button
          className="pagination-button"
          disabled={!table.getCanPreviousPage()}
          onClick={() => {
            table.previousPage();
          }}
        >
           {t("table.previous_page")}
        </button>
        <button
          className="pagination-button"
          disabled={!table.getCanNextPage()}
          onClick={() => {
            table.nextPage();
          }}
        >
          {t("table.next_page")}
        </button>
        <button
          className="pagination-button"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
          }}
        >
          {t("table.last_page")}
        </button>
      </div>
    </div>
  );
};

export default Table;
