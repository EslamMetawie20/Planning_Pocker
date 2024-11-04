import React, { useState } from 'react';
import { Button, TextField, Typography, Stack, Grid, Box, Dialog } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuilEditor from './QuilEditor.jsx';
import GoogleAvatars from "../../Common/Vars/GoogleAvatars";

function CreateSession() {
    const [openQuilEditor, setOpenQuilEditor] = useState(false);
    const [sessionEdited, setSessionEdited] = useState(false);
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

    const [name, setName] = useState('');
    const [position, setPosition] = useState('');
    const [errors, setErrors] = useState({ name: false, position: false });

    const handleOpenQuilEditor = () => {
        setOpenQuilEditor(true);
    };

    const handleCloseQuilEditor = () => {
        setOpenQuilEditor(false);
        setSessionEdited(true);
    };

    const handleSwap = () => {
        setCurrentAvatarIndex((prevIndex) =>
            prevIndex === GoogleAvatars.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleCreateSession = () => {

        const newErrors = {
            name: name.trim() === '',
            position: position.trim() === '',
        };
        setErrors(newErrors);

        if (!newErrors.name && !newErrors.position) {
            console.log('Creating session...');
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
                                    bgcolor: '#f0f0f0',
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
                            sx={{ fontFamily: 'Source Sans Pro, Verdana' }}
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            variant="outlined"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            error={errors.position}
                            helperText={errors.position ? 'This field is required' : ''}
                            sx={{ fontFamily: 'Source Sans Pro, Verdana' }}
                        />
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                color: sessionEdited ? 'green' : '#004259',
                                borderColor: sessionEdited ? 'green' : '#004259',
                                fontSize: '1.2rem',
                                padding: '10px 0',
                                bgcolor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: sessionEdited ? 'row-reverse' : 'row',
                                fontFamily: 'Source Sans Pro, Verdana',
                            }}
                            onClick={handleOpenQuilEditor}
                        >
                            {sessionEdited ? (
                                <CheckCircleIcon sx={{ ml: 1 }} />
                            ) : (
                                <NoteAddIcon sx={{ mr: 1 }} />
                            )}
                            {sessionEdited ? 'EDITED' : 'ADD STORY'}
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleCreateSession}
                    sx={{
                        bgcolor: '#004259',
                        padding: '10px 0',
                        fontSize: '1.2rem',
                        fontFamily: 'Source Sans Pro, Verdana',
                        mt: 2
                    }}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    CREATE
                </Button>
            </Grid>

            <Dialog
                open={openQuilEditor}
                onClose={handleCloseQuilEditor}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    style: {
                        backgroundColor: '#004259',
                        padding: '32px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    }
                }}
            >
                <Box sx={{ backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px' }}>
                    <QuilEditor />
                    <Button
                        onClick={handleCloseQuilEditor}
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            bgcolor: '#004259',
                            padding: '10px 0',
                            fontSize: '1rem',
                            fontFamily: 'Source Sans Pro, Verdana',
                            mt: 2
                        }}
                    >
                        CONTINUE SESSION
                    </Button>
                </Box>
            </Dialog>
        </Grid>
    );
}

export default CreateSession;
