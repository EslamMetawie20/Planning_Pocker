import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Box, Typography, Grid } from "@mui/material";
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

    const [code, setCode] = useState("You can add your text here");

    const handleProcedureContentChange = (content) => {
        setCode(content);
    };

    return (
        <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                maxWidth: '800px',
                margin: 'auto',
                mt: 3
            }}
        >
            <Grid container spacing={2}>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-start', p: 2 }}>
                    <img
                        src="https://www.dos-online.de/wp-content/uploads/2023/08/cropped-DOS_Logo_2023_mit_UZ_RGB.png"
                        alt="dos-logo"
                        style={{ width: '110px', height: '110px', marginBottom: '10px' }}
                    />
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Source Sans Pro, Verdana' }}>
                        SCRUM PLANNING POKER
                    </Typography>
                </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
                Quil Editor
            </Typography>
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={code}
                onChange={handleProcedureContentChange}
                style={{ height: '300px' }}
            />
        </Box>
    );
}

export default QuilEditor;
