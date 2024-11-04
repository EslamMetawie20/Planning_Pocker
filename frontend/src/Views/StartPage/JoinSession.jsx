import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Stack, Grid, Box } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { ArrowForward } from "@mui/icons-material";
import GoogleAvatars from "../../Common/Vars/GoogleAvatars";

function JoinSession() {
    const navigate = useNavigate();
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);


    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [errors, setErrors] = useState({ name: false, position: false, sessionId: false });


    const handleSwap = () => {
        setCurrentAvatarIndex((prevIndex) =>
            prevIndex === GoogleAvatars.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleJoinClick = () => {

        const newErrors = {
            name: name.trim() === '',
            position: position.trim() === '',
            sessionId: sessionId.trim() === '',
        };
        setErrors(newErrors);

        if (!newErrors.name && !newErrors.position && !newErrors.sessionId) {
            navigate("/members");
        }
    };

    return (
        <Grid
            container
            sx={{
                width: '100%',
                maxWidth: '600px',
                mt: 3,
                backgroundColor: 'transparent',
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
                            src={GoogleAvatars[currentAvatarIndex]}
                            alt="avatar-logo"
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
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'scale(1.1)',
                                    boxShadow: 6,
                                    bgcolor: '#f0f0f0'
                                }
                            }}
                            onClick={handleSwap}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={errors.name}
                            helperText={errors.name ? 'This field is required' : ''}
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            variant="outlined"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            error={errors.position}
                            helperText={errors.position ? 'This field is required' : ''}
                        />
                        <TextField
                            fullWidth
                            label="Session ID"
                            variant="outlined"
                            value={sessionId}
                            onChange={(e) => setSessionId(e.target.value)}
                            error={errors.sessionId}
                            helperText={errors.sessionId ? 'This field is required' : ''}
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
