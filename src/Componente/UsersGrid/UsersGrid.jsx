import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveAs } from "file-saver";
import { motion } from 'framer-motion';
import { toast, ToastContainer } from "react-toastify";
import { Box, useTheme, Stack } from "@mui/material";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import FlightIcon from "@mui/icons-material/Flight";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonIcon from "@mui/icons-material/Person";
import PublicIcon from '@mui/icons-material/Public';

import axiosInstance from "../../Utils/axiosInstance";
import { fetchUsers, setFilteredUsers } from "../../redux/Slices/UsersSlice";
import UserCell from "../TableCells/UserCell";
import { StyledTableCell } from "../TableCells/TableStyles";
import IdCell from "../TableCells/IdCell";
import DateCell from "../TableCells/DateCell";
import RefactoredTable from "../RefactoredTable/RefactoredTable";
import CountryCell from "../TableCells/CountryCell";
import VerifyCell from "../TableCells/VerifyCell";

const UserTableHeaders = [
  "ID",
  { icon: <PersonIcon sx={{ fontSize: "1rem" }} />, label: "Info" },
  { icon: <PhoneOutlinedIcon sx={{ fontSize: "1rem" }} />, label: "Phone" },
  { icon: <PublicIcon sx={{ fontSize: "1rem" }} />, label: "Country" },
  { icon: <CalendarTodayIcon sx={{ fontSize: "1rem" }} />, label: "DoB" },
  "Role",
  "Verirification"
];


export default function UsersGrid({ inHomePage = false }) {
  const theme = useTheme();
  const { users, totalData, UsersLoading, UsersError } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePageChange = (page, rowsPerPage) => {
    dispatch(fetchUsers({ page, take: rowsPerPage }));
  };

  const handleNavigateToUserDetails = (userID) => {
    if (inHomePage){
      navigate(`/landingPage/users/${userID}`);
    } else {
      navigate(userID);
    }
  };

  const handleDownloadPassport = async (user) => {
    try {
      if (!user || !user.passportPhoto) {
        toast.error("No passport photo available");
        return;
      }
      const response = await axiosInstance.get(user.passportPhoto, {
        responseType: "blob",
      });

      saveAs(response.data, `passport_${user.id}.jpg`);
      toast.success("Passport photo downloaded successfully!");
    } catch (error) {
      console.error("Failed to download passport:", error);
      toast.error("Failed to download passport");
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      await axiosInstance.delete(`/user/${user.id}`);
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const contextMenuItems = [
    { icon: <FlightIcon />, label: "Download Passport", onClick: (user) => handleDownloadPassport(user) },
    { icon: <ManageAccountsIcon />, label: "Edit User", onClick: (user) => handleNavigateToUserDetails(user.id) },
    { icon: <PersonRemoveIcon />, label: "Delete User", onClick: (user) => handleDeleteUser(user), color: "#F44336" }
  ];

  const renderCell = (user) => (
    <>
      <IdCell id={user.id} />
      <UserCell email={user.email} firstName={user.firstName} lastName={user.lastName} profilePhoto={user.profilePhoto} averageRating={user.averageRating} />
      <StyledTableCell>{user.phone?.phoneNumber || "N/A"}</StyledTableCell>
      <CountryCell
        country={user.country || "N/A"}
        city={user.city}
        flag={user.country ? `https://flagcdn.com/w40/${user.country.toLowerCase()}.png` : "/placeholder.jpg"}
      />
      <DateCell date={user.dateOfBirth} />
      <StyledTableCell>
        <Stack direction="row" spacing={1}>
          {user.role === "admin"
            &&
            (<AdminPanelSettingsIcon sx={{ fontSize: "1rem", color: theme.palette.primary.main }} />)
          }
          {user.role.toUpperCase() || "N/A"}
        </Stack>
      </StyledTableCell>
      <VerifyCell isVerified={user.verify} />
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <ToastContainer />
        <RefactoredTable
          data={users}
          headers={UserTableHeaders}
          renderCell={renderCell}
          contextMenuItems={contextMenuItems}
          idField="id"
          pageSize={3}
          pageSizeOptions={[3, 5, 10]}
          enableContextMenu={inHomePage ? false : true}
          loading={UsersLoading}
          error={UsersError}
          onRowClick={handleNavigateToUserDetails}
          serverSidePagination={true}
          totalItems={totalData}
          onPageChange={handlePageChange}
        />
      </Box>
    </motion.div>
  );
}
