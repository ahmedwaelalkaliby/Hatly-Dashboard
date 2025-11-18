import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import RefactoredTable from '../../Componente/RefactoredTable/RefactoredTable';
import UserCell from '../../Componente/TableCells/UserCell';
import SupportTypeCell from '../../Componente/TableCells/SupportTypeCell';
import { formatDate, formatTime } from '../../Utils/utilFunctions';
import { fetchSupports, setCurrentPage, setItemsPerPage } from '../../redux/Slices/supportSlice';
import { StyledTableCell } from '../../Componente/TableCells/TableStyles';
import { fadeIn } from '../../Utils/motion';
import { ToastContainer } from 'react-toastify';
import IdCell from '../../Componente/TableCells/IdCell';
import StatusCell from '../../Componente/TableCells/StatusCell';

export default function Supports() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        supports,
        loading,
        error,
        totalItems,
        currentPage,
        itemsPerPage
    } = useSelector(state => state.support);

    useEffect(() => {
        dispatch(fetchSupports({ page: currentPage, take: itemsPerPage }));
    }, [dispatch, currentPage, itemsPerPage]);

    const supportsHeaders = [
        '', 'Support ID', 'Type', 'Status','Deal Status',  'Created At', 'Requester', 'Role'
    ];

    const renderCell = (support, index) => {
        const isRequesterShopper = support.requester.id === support.deal.shopperUserId;

        return (<>
            <StyledTableCell>
                <Typography variant="body2" fontWeight={400} color="text.secondary">
                    {index + 1}
                </Typography>
            </StyledTableCell>
            <IdCell id={support.id} />
            <SupportTypeCell type={support.type} />
            <StatusCell status={support.status} />
            <StatusCell status={support.deal.dealStatus} />
            <StyledTableCell>
                <Stack direction="column" alignItems="center">
                    <Typography variant="body2" fontWeight={400} color="text.secondary">
                        {formatDate(support.createdAt)}
                    </Typography>
                    <Typography variant="body2" fontWeight={400} color="text.secondary">
                        {formatTime(support.createdAt)}
                    </Typography>
                </Stack>
            </StyledTableCell>
            <UserCell
                firstName={support.requester.firstName}
                lastName={support.requester.lastName}
                email={support.requester.email}
                profilePhoto={support.requester.profilePhoto}
            />
            <StyledTableCell>
                <Stack direction="row" spacing={1}>
                    {isRequesterShopper ?
                        (<Stack direction="row" spacing={1}>
                            <ShoppingCartIcon sx={{ fontSize: "1rem", color: "primary.main" }} />
                            {"Shopper"}
                        </Stack>)
                        :
                        (<Stack direction="row" spacing={1}>
                            <ConnectingAirportsIcon sx={{ fontSize: "1rem", color: "primary.main" }} />
                            {"Traveller"}
                        </Stack>)
                    }
                </Stack>
            </StyledTableCell>
        </>);
    };

    const handlePageChange = (page, pageSize) => {
        dispatch(setItemsPerPage(pageSize));
        dispatch(setCurrentPage(page));
    };

    const handleRowClick = (supportId) => {
        navigate(`/landingPage/supports/${supportId}`);
    };

    return (<>
        <div className="flex flex-col w-full">
            <Box sx={{ flexGrow: 1, height: '80px' }}>
                <AppBar position="static" elevation={0}>
                    <Toolbar
                        sx={{
                            color: 'black',
                            backgroundColor: 'white',
                            height: '80px',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'flex-start', sm: 'center' },
                            gap: { xs: 2, sm: 0 },
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                flexGrow: 1,
                                fontWeight: 'bold',
                                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                textAlign: { xs: 'left' },
                            }}
                        >
                            All Supports
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <div className="flex flex-col flex-grow pt-4 md:pt-6 lg:pt-8">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <motion.div
                        variants={fadeIn("right", "spring", 0.5, 1)}
                        initial="hidden"
                        animate="show"
                    >
                        <Box sx={{ p: { xs: 2, sm: 3 } }}>
                            <ToastContainer />
                            <RefactoredTable
                                data={supports}
                                headers={supportsHeaders}
                                renderCell={renderCell}
                                loading={loading}
                                error={error}
                                totalItems={totalItems}
                                onPageChange={handlePageChange}
                                onRowClick={handleRowClick}
                                serverSidePagination={true}
                                pageSize={itemsPerPage}
                            />
                        </Box>
                    </motion.div>
                </div>
            </div>
        </div>
    </>);
}
