import { PaginationState } from "@tanstack/react-table";
interface PageSizeInputProps {
  pagination: PaginationState;
  handlePagination: (pagination: PaginationState) => void;
}
const PageSizeInput = ({
  pagination,
  handlePagination,
}: PageSizeInputProps) => {
  return (
    <div>
      <label htmlFor="">Rows</label>
      <input
        type="number"
        value={pagination.pageSize}
        onChange={(e) =>
          handlePagination({
            ...pagination,
            pageSize: Number(e.target.value),
          })
        }
      />
    </div>
  );
};

export default PageSizeInput;
