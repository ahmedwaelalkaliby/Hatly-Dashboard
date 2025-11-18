import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import Stack from "@mui/material/Stack";
import { ToastContainer } from "react-toastify";
import { Box, Table, TableBody, TableRow, Typography, MenuItem, FormControl, InputLabel, CircularProgress, Alert } from "@mui/material";
import { motion } from 'framer-motion';
import { StyledTableRow, StyledTableCell, StyledTableContainer, StyledTableHead, ContextMenuComponent, StyledSelect, StyledButton } from "../TableCells/TableStyles";

export default function RefactoredTable({
  data,
  headers,
  renderCell,
  onRowClick = null,
  contextMenuItems,
  pageSize = 5,
  pageSizeOptions = [5, 7, 10],
  enableContextMenu = false,
  loading = false,
  error = null,
  totalItems = 0,
  onPageChange = null,
  serverSidePagination = false,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [currentPage, setCurrentPage] = useState(1);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });

  const handleRowsPerPageChange = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    if (serverSidePagination && onPageChange) {
      onPageChange(1, newRowsPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      if (serverSidePagination && onPageChange) {
        onPageChange(newPage, rowsPerPage);
      }
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      if (serverSidePagination && onPageChange) {
        onPageChange(newPage, rowsPerPage);
      }
    }
  };

  const handleContextMenu = (event, item) => {
    if (!enableContextMenu) return;
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      item,
    });
  };

  const handleCloseContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, item: null });
  };

  const getDisplayedItems = () => {
    if (serverSidePagination) {
      return data;
    }
    const startIndex = (currentPage - 1) * rowsPerPage;
    return data.slice(startIndex, startIndex + rowsPerPage);
  };

  const calculateTotalPages = () => {
    if (serverSidePagination) {
      return Math.ceil(totalItems / rowsPerPage);
    }
    return Math.ceil((data?.length || 0) / rowsPerPage);
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <StyledTableRow>
          <StyledTableCell colSpan={headers.length} align="center">
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <CircularProgress />
            </Box>
          </StyledTableCell>
        </StyledTableRow>
      );
    }

    if (error) {
      return (
        <StyledTableRow>
          <StyledTableCell colSpan={headers.length} align="center">
            <Box display="flex" justifyContent="center" alignItems="center" py={4}>
              <Alert severity="error">
                {error || 'An error occurred while fetching data'}
              </Alert>
            </Box>
          </StyledTableCell>
        </StyledTableRow>
      );
    }

    if (!Array.isArray(data) || data.length === 0) {
      return (
        <StyledTableRow>
          <StyledTableCell colSpan={headers.length} align="center">
            <Box display="flex" flexDirection="column" alignItems="center" py={4}>
              <TaskAltIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
              <Typography color="text.secondary">
                No records found
              </Typography>
            </Box>
          </StyledTableCell>
        </StyledTableRow>
      );
    }

    return getDisplayedItems().map((item, index) => (
      <StyledTableRow
        key={uuidv4()}
        onContextMenu={(event) => handleContextMenu(event, item)}
        onClick={() => onRowClick && onRowClick(item.id)}
        sx={{ cursor: onRowClick ? 'pointer' : 'default' }}
      >
        {renderCell(item, index)}
      </StyledTableRow>
    ));
  };

  const totalPages = calculateTotalPages();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 3 },
          overflow: 'auto',
          width: '100%',
          '& .MuiTableContainer-root': {
            maxWidth: '100%',
            overflowX: 'auto'
          },
          '& .MuiTable-root': {
            minWidth: { xs: '600px', sm: '100%' }
          }
        }}
      >
        <ToastContainer />
        <StyledTableContainer>
          <Table onClick={handleCloseContextMenu}>
            {/* Render table headers */}
            <StyledTableHead>
              <TableRow>
                {headers.map((header) => (
                  <StyledTableCell key={uuidv4()}>
                    {typeof header === 'string'
                      ?
                      (header)
                      :
                      (<Stack direction="row" spacing={1} alignItems="center">
                        {header.icon}
                        <span>{header.label}</span>
                      </Stack>
                      )}
                  </StyledTableCell>
                ))}
              </TableRow>
            </StyledTableHead>
            {/* Render table rows */}
            <TableBody>
            {renderTableBody()}
            </TableBody>
          </Table>
        </StyledTableContainer>

        {contextMenu.visible && contextMenuItems && (
          <ContextMenuComponent
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul>
              {contextMenuItems.map((menuItem) => (
                <li
                  key={uuidv4()}
                  onClick={() => {
                    menuItem.onClick(contextMenu.item);
                    handleCloseContextMenu();
                  }}
                  style={{ color: menuItem.color }}
                >
                  {menuItem.icon}
                  <span>{menuItem.label}</span>
                </li>
              ))}
            </ul>
          </ContextMenuComponent>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", sm: "center" },
            mt: 3,
            gap: 2
          }}
        >
          <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 120 } }}>
            <InputLabel>Rows per page</InputLabel>
            <StyledSelect
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              label="Rows per page"
            >
              {pageSizeOptions.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems="center"
            width={{ xs: '100%', sm: 'auto' }}
          >
            <StyledButton
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              variant="outlined"
            >
              <ArrowBackIosNewOutlinedIcon />
            </StyledButton>
            <Typography variant="body2">
              Page {currentPage} of {totalPages}
            </Typography>
            <StyledButton
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              variant="outlined"
            >
              <ArrowForwardIosOutlinedIcon />
            </StyledButton>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
}
