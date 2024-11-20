import React, { useState, useMemo, Suspense, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import LoaderComp from "./../Components/Extras/LoaderComp";

function QuilEditor({
                        sendData = (title, content) => {
                            return { title, content };
                        },
                        onSubmit = () => {},
                        initial,
                        buttonLabel = "CONTINUE SESSION",
                    }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ size: [] }],
                [{ font: [] }],
                [{ align: ["right", "center", "justify"] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                [{ color: ["red", "#785412"] }],
                [{ background: ["red", "#785412"] }],
            ],
        }),
        []
    );

    const formats = useMemo(
        () => [
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
            "font",
        ],
        []
    );

    const handleContentChange = (content) => {
        setContent(content);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = () => {
        sendData(title, content);
        onSubmit();
        alert("Story saved successfully!");
    };

    useEffect(() => {
        if (initial?.title && initial.content) {
            setTitle(initial.title);
            setContent(initial.content);
        }
    }, [initial]);

    return (
        <Box sx={{ p: 3, backgroundColor: "#fffffff", borderRadius: "8px" }}>
            <Grid container spacing={2} alignItems="center">
                <Grid
                    item
                    xs={4}
                    sx={{ display: "flex", alignItems: "flex-start", p: 2 }}
                >
                    <img
                        src="https://www.dos-online.de/wp-content/uploads/2023/08/cropped-DOS_Logo_2023_mit_UZ_RGB.png"
                        alt="dos-logo"
                        style={{ width: "110px", height: "110px", marginBottom: "10px" }}
                    />
                </Grid>
                <Grid
                    item
                    xs={8}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontFamily: "Source Sans Pro, Verdana",
                            fontSize: { xs: "1.2rem", sm: "1.5rem" },
                        }}
                    >
                        SCRUM PLANNING POKER
                    </Typography>
                </Grid>
            </Grid>

            <TextField
                fullWidth
                label="Story Title"
                variant="outlined"
                value={title}
                size="small"
                onChange={handleTitleChange}
                sx={{ mb: 2 }}
            />

            <Suspense fallback={<LoaderComp />}>
                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={content}
                    onChange={handleContentChange}
                    style={{ maxHeight: "20rem", height: "20rem", width: "100%" }}
                />
            </Suspense>

            <Button onClick={handleSubmit} variant="contained" fullWidth sx={{ mt: 2 }}>
                {buttonLabel}
            </Button>
        </Box>
    );
}

QuilEditor.propTypes = {
    sendData: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initial: PropTypes.object,
    buttonLabel: PropTypes.string,
};

export default QuilEditor;
