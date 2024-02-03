"use client";

import {
  ColumnDef,
  Pagination,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import PaginationManual from "@/components/billing/paginationManual";
import { Button } from "@/components/ui/button";
import { SelectButton } from "@/components/dashboard/mainPage/filterGroupColor";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onUpdateEndpointGroup: any | null;
  groups: any;
}

export function EndpointsTable<TData, TValue>({
  columns,
  data,
  onUpdateEndpointGroup,
  groups,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleGroupChange = (groupId: string) => {
    setSelectedGroup(groupId);
  };

  const handleMoveToClick = (endpointId: string) => {
    if (selectedGroup) {
      onUpdateEndpointGroup(endpointId, selectedGroup);
      // Clear the selected group after the update
      setSelectedGroup(null);
    }
  };
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <h2 className="font-bold m-4"> Endpints List</h2>
      <div className="rounded-md border bg-white dark:bg-transparent">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {/* Move To button */}
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleMoveToClick(row.original?.id)}
                    >
                      Move To
                    </Button>
                    {/* Dropdown to select groups */}
                    {groups && <SelectButton items={groups} />}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <PaginationManual
        currentPage={1}
        totalPages={10}
        onPageChange={(page: any) => console.log(page)}
      />
      {/*
          <DataTablePagination table={table} />
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
       */}
    </div>
  );
}
