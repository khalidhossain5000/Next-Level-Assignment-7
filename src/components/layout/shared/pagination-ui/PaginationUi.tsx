import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IPaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;

  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function PaginationUi({
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  onPageChange,
  onItemsPerPageChange,
}: IPaginationProps) {
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;

  const endItem =
    totalItems === 0 ? 0 : Math.min(currentPage * itemsPerPage, totalItems);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Result Info + Items Per Page */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Result Count */}
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {startItem}
            {totalItems > 0 && `–${endItem}`}
          </span>{" "}
          of <span className="font-medium text-foreground">{totalItems}</span>{" "}
          {totalItems === 1 ? "item" : "items"}
        </p>

        {/* Items Per Page */}
        <Field orientation="horizontal" className="w-fit">
          <FieldLabel
            htmlFor="select-rows-per-page"
            className="text-sm text-muted-foreground"
          >
            Items per page
          </FieldLabel>

          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => {
              onItemsPerPageChange(Number(value));
            }}
          >
            <SelectTrigger
              id="select-rows-per-page"
              className="h-9 w-18 cursor-pointer"
            >
              <SelectValue />
            </SelectTrigger>

            <SelectContent align="start">
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
                <SelectItem value="40">40</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Previous / Next */}
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (!isFirstPage) {
                  onPageChange(currentPage - 1);
                }
              }}
              aria-disabled={isFirstPage}
              className={
                isFirstPage
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (!isLastPage) {
                  onPageChange(currentPage + 1);
                }
              }}
              aria-disabled={isLastPage}
              className={
                isLastPage ? "pointer-events-none opacity-40" : "cursor-pointer"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
