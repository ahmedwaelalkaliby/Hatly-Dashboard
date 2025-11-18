import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ImageIcon from "@mui/icons-material/Image";
import FlagIcon from "@mui/icons-material/Flag";

import RefactoredTable from "../RefactoredTable/RefactoredTable";
import { StyledTableCell } from "../TableCells/TableStyles";
import IdCell from "../TableCells/IdCell";
import DateCell from "../TableCells/DateCell";

const getStatusColor = (status) => {
  switch (status?.toUpperCase()) {
    case "RESOLVED":
      return "success";
    case "REJECTED":
      return "error";
    case "PENDING":
      return "warning";
    default:
      return "default";
  }
};

const feedbackTableHeaders = [
  "",
  "ID",
  { icon: <DescriptionIcon sx={{ fontSize: "1rem" }} />, label: "Description" },
  { icon: <ImageIcon sx={{ fontSize: "1rem" }} />, label: "Images" },
  { icon: <FlagIcon sx={{ fontSize: "1rem" }} />, label: "Status" },
  { icon: <CalendarTodayIcon sx={{ fontSize: "1rem" }} />, label: "Created At" },
];

export default function FeedbackGrid({ feedbacks, loading, error }) {
  const navigate = useNavigate();

  const handleRowClick = (feedbackId) => {
    navigate(`/landingPage/feedback/${feedbackId}`);
  };

  const renderCell = (feedback, index) => (
    <>
      <StyledTableCell>
        <Typography variant="body2">
          {index + 1}
        </Typography>
      </StyledTableCell>
      <IdCell id={feedback.id} />
      <StyledTableCell>
        <Typography
          variant="body2"
          sx={{
            maxWidth: '300px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {feedback.description}
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Typography variant="body2">
          {feedback.images?.length || 0} images
        </Typography>
      </StyledTableCell>
      <StyledTableCell>
        <Chip
          label={feedback.status || "PENDING"}
          color={getStatusColor(feedback.status)}
          size="small"
          sx={{ textTransform: 'capitalize' }}
        />
      </StyledTableCell>
      <DateCell date={feedback.createdAt} />
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <ToastContainer />
        <RefactoredTable
          data={feedbacks || []}
          headers={feedbackTableHeaders}
          renderCell={renderCell}
          onRowClick={handleRowClick}
          pageSize={10}
          pageSizeOptions={[5, 10, 20]}
          enableContextMenu={false}
          loading={loading}
          error={error}
          totalItems={feedbacks?.length || 0}
          serverSidePagination={false}
        />
      </Box>
    </motion.div>
  );
} 