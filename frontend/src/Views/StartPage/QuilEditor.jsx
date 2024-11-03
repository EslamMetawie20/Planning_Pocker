import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Box, Typography, Grid, TextField } from "@mui/material";
import ReactQuill from 'react-quill';

function QuilEditor() {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: ["red", "#785412"] }],
            [{ background: ["red", "#785412"] }]
        ]
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "size",
        "font"
    ];

    const [title, setTitle] = useState("Example Story Title");
    const [content, setContent] = useState("You can add your text here");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (content) => {
        setContent(content);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#fffffff', borderRadius: '8px' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-start', p: 2 }}>
                    <img
                        src="https://www.dos-online.de/wp-content/uploads/2023/08/cropped-DOS_Logo_2023_mit_UZ_RGB.png"
                        alt="dos-logo"
                        style={{ width: '110px', height: '110px', marginBottom: '10px' }}
                    />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Source Sans Pro, Verdana', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                        SCRUM PLANNING POKER
                    </Typography>
                </Grid>
            </Grid>

            <TextField
                fullWidth
                label="Story Title"
                variant="outlined"
                value={title}
                onChange={handleTitleChange}
                sx={{ mb: 2 }}
            />

            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleContentChange}
                style={{ height: '300px', width: '100%' }}
            />
        </Box>
    );
}

export default QuilEditor;
