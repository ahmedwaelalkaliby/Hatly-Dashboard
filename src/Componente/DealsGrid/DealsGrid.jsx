import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axiosInstance from "../../Utils/axiosInstance";
import RefactoredTable from "../RefactoredTable/RefactoredTable";
import DealStatusCell from "../TableCells/DealStatusCell";
import UserCell from "../TableCells/UserCell";
import DateCell from "../TableCells/DateCell";
import IdCell from "../TableCells/IdCell";
import { fetchDeals } from "../../redux/Slices/dealsSlice";
import FeesCell from "../TableCells/FeesCell";

const dealTableHeaders = [
  "ID",
  "Status",
  { icon: <PersonIcon sx={{ fontSize: "1rem" }} />, label: "Shopper" },
  { icon: <PersonIcon sx={{ fontSize: "1rem" }} />, label: "Traveler" },
  { icon: <PriceChangeIcon sx={{ fontSize: "1rem" }} />, label: "Fees" },
  { icon: <CalendarTodayIcon sx={{ fontSize: "1rem" }} />, label: "Created At" }
];

export default function DealsGrid() {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { filteredDeals, loading, error, totalData } = useSelector((state) => state.deals);

  const handleRowClick = (dealId) => {
    navigate(`${dealId}`);
  };

  const handleDeleteDeal = async (deal) => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/deal/${deal.id}`);
      toast.success("Deal deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete deal");
    } finally {
      setIsDeleting(false);
    }
  };

  const contextMenuItems = [
    {
      icon: <EditIcon fontSize="small" />,
      label: "Edit Deal",
      onClick: (deal) => navigate(`${deal.id}`)
    },
    {
      icon: <DeleteIcon fontSize="small" />,
      label: isDeleting ? "Deleting..." : "Delete Deal",
      onClick: handleDeleteDeal,
      color: "#F44336",
      disabled: isDeleting
    }
  ];

  const renderCell = (deal) => (
    <>
      <IdCell id={deal.id} />
      <DealStatusCell dealStatus={deal.dealStatus} />
      <UserCell {...deal.shopper} />
      <UserCell {...deal.traveler} />
      <FeesCell {...deal} />
      <DateCell date={deal.createdAt} />
    </>
  );

  const handlePageChange = (page, rowsPerPage) => {
    dispatch(fetchDeals({ page, take: rowsPerPage }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ p: { xs: 1, sm: 2 } }}>
        <ToastContainer />
        <RefactoredTable
          data={filteredDeals}
          headers={dealTableHeaders}
          renderCell={renderCell}
          onRowClick={handleRowClick}
          contextMenuItems={contextMenuItems}
          pageSize={10}
          pageSizeOptions={[5, 10, 20]}
          enableContextMenu={true}
          loading={loading}
          error={error}
          totalItems={totalData}
          onPageChange={handlePageChange}
          serverSidePagination={true}
        />
      </Box>
    </motion.div>
  );
}