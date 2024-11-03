import React from 'react';
import { Box, Stack } from '@mui/material';
import BoxHeader from "../../Components/Frames/BoxHeader";
import MembersView from "../MembersView";
import StoryView from "../StoryView";
import EstimatesView from "../EstimatesView";

const MembersPage = () => {
    return (
        <Box
            sx={{
                bgcolor: '#004259', // لون الخلفية الخارجي الأساسي
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 3,
            }}
        >
            <Box
                sx={{
                    paddingX: 3,
                    paddingY: 2,
                    bgcolor: "white",
                    width: "82vw",
                    height: "90vh",
                    borderRadius: "1rem",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                }}
            >
                <BoxHeader />
                <Stack
                    direction="row"
                    spacing={1}
                    flexShrink={1}
                    height="calc(100% - 12vh - 1rem)"
                >
                    <MembersView />
                    <StoryView />
                    <EstimatesView />
                </Stack>
            </Box>
        </Box>
    );
};

export default MembersPage;
