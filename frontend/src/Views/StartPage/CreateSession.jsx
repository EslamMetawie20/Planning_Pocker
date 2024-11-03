import React, { useState } from 'react';
import { Button, TextField, Typography, Stack, Grid, Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CloseIcon from '@mui/icons-material/Close';
import QuilEditor from './QuilEditor.jsx';

function CreateSession() {
    const [openQuilEditor, setOpenQuilEditor] = useState(false);

    const handleOpenQuilEditor = () => {
        setOpenQuilEditor(true);
    };

    const handleCloseQuilEditor = () => {
        setOpenQuilEditor(false);
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
                    <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Source Sans Pro, Verdana' }}>
                        SCRUM PLANNING POKER
                    </Typography>
                </Grid>
            </Grid>

            {/* Row 2: Large logo and input fields */}
            <Grid item xs={12} container spacing={2}>
                <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Container for Image and Icon */}
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <img
                            src="/google_Avatar.jpeg"
                            alt="local-logo"
                            style={{ width: '170px', height: '170px', borderRadius: '50%' }}
                        />
                        {/* Icon positioned over the image */}
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
                            sx={{ fontFamily: 'Source Sans Pro, Verdana' }}
                        />
                        <TextField
                            fullWidth
                            label="Position"
                            variant="outlined"
                            sx={{ fontFamily: 'Source Sans Pro, Verdana' }}
                        />
                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{
                                color: '#004259',
                                borderColor: '#004259',
                                fontSize: '1.2rem',
                                padding: '10px 0',
                                bgcolor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontFamily: 'Source Sans Pro, Verdana',
                            }}
                            onClick={handleOpenQuilEditor}
                        >
                            <NoteAddIcon sx={{ mr: 1 }} />
                            ADD STORY
                        </Button>
                    </Stack>
                </Grid>
            </Grid>

            {/* Row 3: Create button */}
            <Grid item xs={12}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                        bgcolor: '#004259',
                        padding: '10px 0',
                        fontSize: '1.2rem',
                        fontFamily: 'Source Sans Pro, Verdana',
                    }}
                >
                    <AddIcon sx={{ mr: 1 }} />
                    CREATE
                </Button>
            </Grid>

            {/* Quil Editor Dialog */}
            <Dialog open={openQuilEditor} onClose={handleCloseQuilEditor} maxWidth="md" fullWidth>
                <QuilEditor />
            </Dialog>
        </Grid>
    );
}

export default CreateSession;
