import React, { useState } from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import {
  CalendarToday as CalendarTodayIcon,
  Description as DescriptionIcon,
  FlagOutlined as FlagOutlinedIcon,
  Person as PersonIcon,
  ReportProblem as ReportProblemIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RefactoredTable from '../RefactoredTable/RefactoredTable';
import { StyledTableCell } from '../TableCells/TableStyles';
import ReportTypeCell from '../TableCells/ReportTypeCell';
import IdCell from '../TableCells/IdCell';
import UserCell from '../TableCells/UserCell';
import DateCell from '../TableCells/DateCell';
import StatusCell from '../TableCells/StatusCell';
import ShipmentCell from '../TableCells/ShipmentCell';

export default function ReportsGrid() {
  const { reports, loading, error, totalData } = useSelector((state) => state.reports);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDeleteReport = async (report) => {
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await axiosInstance.delete(`/report/${report.id}`);
      toast.success("Report deleted successfully");
    } catch (error) {
      toast.error("Failed to delete report");
    } finally {
      setIsDeleting(false);
    }
  };

  const headers = [
    "",
    'ID',
    { label: 'Type', icon: <ReportProblemIcon sx={{ fontSize: '1rem' }} /> },
    { label: 'Description', icon: <DescriptionIcon sx={{ fontSize: '1rem' }} /> },
    { label: 'Reporter', icon: <PersonIcon sx={{ fontSize: '1rem' }} /> },
    { label: 'Shipment', icon: <FlagOutlinedIcon sx={{ fontSize: '1rem' }} /> },
    { label: 'Created', icon: <CalendarTodayIcon sx={{ fontSize: '1rem' }} /> },
    'Status'
  ];

  const contextMenuItems = [
    {
      label: 'Edit Report',
      icon: <EditIcon fontSize="small" />,
      onClick: (report) => navigate(`${report.id}`)
    },
    {
      label: isDeleting ? 'Deleting...' : 'Delete Report',
      icon: <DeleteIcon fontSize="small" />,
      onClick: (report) => handleDeleteReport(report),
      color: '#F44336',
      disabled: isDeleting
    }
  ];

  const renderCell = (report, index) => (
    <>
      <StyledTableCell>
        <Typography variant="body2" color='text.secondary'>
          {index + 1}
        </Typography>
      </StyledTableCell>
      <IdCell id={report.id} />
      <ReportTypeCell type={report.type} />
      <StyledTableCell>
        <Tooltip title={report.description} arrow>
          <Typography
            variant="body2"
            sx={{
              maxWidth: '150px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {report.description}
          </Typography>
        </Tooltip>
      </StyledTableCell>
      <UserCell 
        firstName={report.createdBy?.firstName}
        lastName={report.createdBy?.lastName}
        email={report.createdBy?.email}
        profilePhoto={report.createdBy?.profilePhoto}
      />
      <ShipmentCell 
        title={report.shipment?.title}
        fromCity={report.shipment?.fromCity}
        toCity={report.shipment?.toCity}
      />
      <DateCell date={report.createdAt} />
      <StatusCell status={report.status} />
    </>
  );

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <RefactoredTable
        data={reports}
        headers={headers}
        renderCell={renderCell}
        onRowClick={(id) => navigate(`${id}`)}
        contextMenuItems={contextMenuItems}
        loading={loading}
        error={error}
        pageSize={10}
        pageSizeOptions={[5, 10, 20]}
        enableContextMenu={true}
        totalItems={totalData}
      />
    </Box>
  );
}
