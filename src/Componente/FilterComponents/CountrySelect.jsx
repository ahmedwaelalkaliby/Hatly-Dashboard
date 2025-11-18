import React, { useState, useMemo } from 'react'
import { FormControl, IconButton, InputLabel, Select, TextField, Box } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';

export default function CountrySelect({ label, selectValue, setSelectedValue, onClearSelect, children }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Memoize the filtered children to avoid unnecessary re-renders
    const filteredChildren = useMemo(() => {
        if (!searchQuery) return children;

        return React.Children.map(children, child => {
            if (!React.isValidElement(child)) return null;

            // Skip the header MenuItem if it exists
            if (child.props.sx?.fontWeight === "bold") return child;

            // Check if the item's text content includes the search query
            const itemText = child.props.children?.toString().toLowerCase();
            if (itemText?.includes(searchQuery.toLowerCase())) {
                return child;
            }
            return null;
        }).filter(Boolean);
    }, [children, searchQuery]);

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={selectValue}
                onChange={(e) => setSelectedValue(e.target.value)}
                label={label}
                endAdornment={
                    selectValue && (
                        <IconButton
                            size="small"
                            onClick={onClearSelect}
                            aria-label="Clear selection"
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    )
                }
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 300
                        },
                    },
                }}
            >
                <Box sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'background.paper',
                    zIndex: 1,
                    p: 1,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <TextField
                        size="small"
                        fullWidth
                        placeholder={`Search ${label.toLowerCase()}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                        slotProps={{
                            input: {
                                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                                endAdornment: searchQuery && (
                                    <IconButton
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSearchQuery('');
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                )
                            },
                        }}
                    />
                </Box>
                {filteredChildren}
            </Select>
        </FormControl>
    )
}
