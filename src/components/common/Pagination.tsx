import { TablePagination, IconButton, Tooltip, Box } from "@mui/material";
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
} from "@mui/icons-material";
import type { PaginationInfo } from "../../types/oireachtas";
import { t } from "../../translations";

interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "auto",
        "& .MuiTablePagination-root": {
          minWidth: {
            xs: "280px",
            sm: "400px",
            md: "auto",
          },
        },
        "& .MuiTablePagination-selectLabel": {
          display: {
            xs: "none",
            sm: "block",
          },
        },
        "& .MuiTablePagination-displayedRows": {
          fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
          },
        },
        "& .MuiTablePagination-select": {
          fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
          },
        },
        "& .MuiTablePagination-actions": {
          marginLeft: {
            xs: 0,
            sm: 2,
          },
        },
      }}
    >
      <TablePagination
        component="div"
        count={pagination.totalCount}
        page={pagination.page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={pagination.pageSize}
        onRowsPerPageChange={(event) => {
          const newPageSize = parseInt(event.target.value, 10);
          onPageSizeChange(newPageSize);
        }}
        rowsPerPageOptions={[10, 25, 50]}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${t("pagination.of")} ${count}`
        }
        labelRowsPerPage={t("bills.table.rowsPerPage")}
        ActionsComponent={({ onPageChange, page, count, rowsPerPage }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              "& .MuiIconButton-root": {
                padding: {
                  xs: "4px",
                  sm: "8px",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: {
                    xs: "1rem",
                    sm: "1.25rem",
                  },
                },
              },
            }}
          >
            <Tooltip title={t("pagination.firstPage")}>
              <span>
                <IconButton
                  onClick={() => onPageChange(null, 0)}
                  disabled={page === 0}
                  aria-label={t("pagination.firstPage")}
                  size="small"
                >
                  <FirstPage />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={t("pagination.previousPage")}>
              <span>
                <IconButton
                  onClick={() => onPageChange(null, page - 1)}
                  disabled={page === 0}
                  aria-label={t("pagination.previousPage")}
                  size="small"
                >
                  <KeyboardArrowLeft />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={t("pagination.nextPage")}>
              <span>
                <IconButton
                  onClick={() => onPageChange(null, page + 1)}
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  aria-label={t("pagination.nextPage")}
                  size="small"
                >
                  <KeyboardArrowRight />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title={t("pagination.lastPage")}>
              <span>
                <IconButton
                  onClick={() =>
                    onPageChange(null, Math.ceil(count / rowsPerPage) - 1)
                  }
                  disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                  size="small"
                  aria-label={t("pagination.lastPage")}
                >
                  <LastPage />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        )}
      />
    </Box>
  );
};

export default Pagination;
