import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';
import JoinSession from "./JoinSession.jsx";
import CreateSession from "./CreateSession.jsx";

const StyledTabs = styled(Tabs)(({ theme }) => ({
    width: '100%',
    '& .MuiTab-root': {
        minWidth: '50%',
        fontWeight: 'bold',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        transition: 'transform 0.3s ease',
        color: '#004259',
    },
    '& .Mui-selected': {
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        transform: 'scale(1)',
        color: '#004259',
    },
    '& .MuiTab-root:not(.Mui-selected)': {
        backgroundColor: '#73797C',
        fontSize: '0.9rem',
        height: '35px',
        transform: 'scale(0.9)',
    },
    '& .MuiTabs-indicator': {
        backgroundColor: '#004259',
    },
}));

function MainSession() {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    return (
        <Box
            sx={{
                bgcolor: '#004259',
                minHeight: '91vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 600,
                    bgcolor: 'transparent',
                }}
            >
                <StyledTabs
                    value={currentTab}
                    onChange={handleTabChange}
                    aria-label="session tabs"
                    sx={{
                        position: 'absolute',
                        top: '-35px',
                        left: 0,
                    }}
                    TabIndicatorProps={{
                        style: { backgroundColor: '#004259' },
                    }}
                >
                    <Tab label="JOIN SESSION" />
                    <Tab label="CREATE SESSION" />
                </StyledTabs>

                <Box
                    sx={{
                        bgcolor: '#ffffff',
                        borderBottomRightRadius: '10px',
                        borderBottomLeftRadius: '10px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        padding: 2,
                        textAlign: 'center',
                        mt: 2,
                    }}
                >
                    {currentTab === 0 && <JoinSession />}
                    {currentTab === 1 && <CreateSession />}
                </Box>
            </Box>
        </Box>
    );
}

export default MainSession;
