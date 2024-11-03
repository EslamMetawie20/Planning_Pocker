import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Stack, Grid, Box } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ArrowForward } from "@mui/icons-material";

function JoinSession() {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate("/members"); // ينقل للصفحة الجديدة اللي فيها الـ Views
    };

    return (
        <Grid
            container
            spacing={2}
            sx={{
                width: '100%',
                maxWidth: '600px',
                mt: 3,
                backgroundColor: 'transparent',
                padding: 2,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                margin: 'auto'
            }}
        >
            {/* Row 1: Logo and Title */}
            <Grid item xs={12} container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <img
                        src="https://www.dos-online.de/wp-content/uploads/2023/08/cropped-DOS_Logo_2023_mit_UZ_RGB.png"
                        alt="dos-logo"
                        style={{ width: '110px', height: '110px', marginBottom: '10px' }}
                    />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', mt: 12 }}>
                    <Typography variant="h5" gutterBottom>
                        SCRUM PLANNING POKER
                    </Typography>
                </Grid>
            </Grid>

            {/* Row 2: Large logo and input fields */}
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <img
                            src="/google_Avatar.jpeg"
                            alt="local-logo"
                            style={{ width: '170px', height: '170px', borderRadius: '50%' }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: -15,
                                left: '50%',
                                bgcolor: 'white',
                                borderRadius: '50%',
                                p: 0.5,
                                boxShadow: 3,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '40px',
                                height: '40px',
                            }}
                        >
                            <SwapHorizIcon sx={{ color: '#004259', fontSize: '1.2rem' }} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Stack spacing={2} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Name"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Session ID"
                            variant="outlined"
                        />
                    </Stack>
                </Grid>
            </Grid>

            {/* Row 3: Join button */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleJoinClick}
                    sx={{
                        bgcolor: '#004259',
                        padding: '10px 0',
                        fontSize: '1.2rem',
                        mt: 2
                    }}
                >
                    <ArrowForward sx={{ mr: 1 }} />
                    JOIN
                </Button>
            </Grid>
        </Grid>
    );
}

export default JoinSession;
