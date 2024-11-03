import React, { useState } from 'react';
import { Button, TextField, Typography, Stack, Grid, Box, Dialog } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import AddIcon from '@mui/icons-material/Add';
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import QuilEditor from './QuilEditor.jsx';

function CreateSession() {
    const [openQuilEditor, setOpenQuilEditor] = useState(false);
    const [sessionEdited, setSessionEdited] = useState(false);

    const handleOpenQuilEditor = () => {
        setOpenQuilEditor(true);
    };

    const handleCloseQuilEditor = () => {
        setOpenQuilEditor(false);
        setSessionEdited(true);
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
            {/* صف الشعار والعنوان */}
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
