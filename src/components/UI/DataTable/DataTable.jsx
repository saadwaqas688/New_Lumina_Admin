import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, Typography } from "@mui/material";
import Button from "../Button/Button";
import EditIcon from "../../Icons/EditIcon";
import DeleteIcon from "../../Icons/DeleteIcon";
import { Link as RouterLink } from "react-router-dom";

export default function DataTable({
  columns,
  rows,
  firstTopButton,
  secondTopButton,
  topLinkButton,
  editButton,
  setOpenModal,
  deleteButton,
  setEditRecord,
  setShowDetails,
  setSingleRecord,
  deleteRecord,
  updateStatus,
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function openInPopup(record, state) {
    if (state === "edit") {
      setEditRecord(true);
      setSingleRecord(record);
    } else if (state === "details") {
      setShowDetails(true);
      setSingleRecord(record);
    }
    setOpenModal(true);
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      {firstTopButton && (
        <Button variant="contained" onClick={openInPopup}>
          <Typography variant="body1">
            <strong>{firstTopButton}</strong>
          </Typography>
        </Button>
      )}
      {topLinkButton && (
        <RouterLink to="/classesCategories" style={{ textDecoration: "none" }}>
          <Button variant="contained">
            <Typography variant="body1">
              <strong>{topLinkButton}</strong>
            </Typography>
          </Button>
        </RouterLink>
      )}
      {secondTopButton && (
        <Button variant="contained" onClick={openInPopup}>
          <Typography variant="body1">
            <strong> {secondTopButton}</strong>
          </Typography>
        </Button>
      )}

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <Typography variant="h6">
                    <strong>{column.label}</strong>
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows && (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        const assetUrl =
                          value === "imageContain" ? value.image : "";
                        if (column.id === "imageContain") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={value.image}
                                  alt="Preview"
                                  width="100"
                                  height="100"
                                  style={{ borderRadius: "10px" }}
                                />
                                <Typography variant="body1">
                                  <strong>{value.title}</strong>
                                </Typography>
                              </Box>
                            </TableCell>
                          );
                        } else if (column.id === "time") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                               <Typography variant="body1">
                              <strong> {new Date(value.toDate()).toDateString()}</strong>
                                </Typography>
                            </TableCell>
                          );
                        } else if (column.id === "Details") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                variant="contained"
                                onClick={() => {
                                  openInPopup(row, "details");
                                }}
                              >
                                <Typography variant="body1">
                                  <strong>View Details</strong>
                                </Typography>
                              </Button>
                            </TableCell>
                          );
                        } else if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Button
                                custombgcolor={
                                  value === "blocked" ||
                                  value === "notFeatured" ||
                                  value === "delivered"
                                    ? "#ffb3c6"
                                    : undefined
                                }
                                variant="contained"
                                onClick={() => {
                                  updateStatus(row.id, value);
                                }}
                              >
                                <Typography variant="body1">
                                  <strong> {value}</strong>
                                </Typography>
                              </Button>
                            </TableCell>
                          );
                        } else if (column.id === "Actions") {
                          if (editButton && deleteButton) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <EditIcon
                                  variant="contained"
                                  onClick={() => {
                                    openInPopup(row, "edit");
                                  }}
                                />
                                <DeleteIcon
                                  custombgcolor="#ff1a53"
                                  variant="contained"
                                  onClick={() => {
                                    deleteRecord(row, assetUrl);
                                  }}
                                />
                              </TableCell>
                            );
                          } else if (editButton) {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <EditIcon
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    openInPopup(row, "edit");
                                  }}
                                />
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <DeleteIcon
                                  variant="contained"
                                  custombgcolor="#ff1a53"
                                  onClick={() => {
                                    deleteRecord(row, assetUrl);
                                  }}
                                />
                              </TableCell>
                            );
                          }
                        } else {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Typography variant="body1">
                                <strong> {value}</strong>
                              </Typography>
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
