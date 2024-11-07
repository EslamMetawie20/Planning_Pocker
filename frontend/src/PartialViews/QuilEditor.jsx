import React, { useState, useMemo, Suspense, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { TextField, Stack, Button } from "@mui/material";
import BoxHeader from "../Components/Frames/BoxHeader";
import LoaderComp from "./../Components/Extras/LoaderComp";
import PropTypes from "prop-types";

// Lazy load ReactQuill
const ReactQuill = React.lazy(() => import("react-quill"));

function QuilEditor({
  sendData = (title, content) => {
    return { title, content };
  },
  onSubmit = () => {},
  initial,
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
        ["link"],
        [{ color: ["red", "#785412"] }],
        [{ background: ["red", "#785412"] }],
      ],
    }),
    [],
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
      "background",
      "align",
      "size",
      "font",
    ],
    [],
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
  };

  useEffect(() => {
    if (initial?.title && initial.content) {
      setTitle(initial.title);
      setContent(initial.content);
    }
  }, []);

  return (
    <Stack spacing={3}>
      <BoxHeader />

      <TextField
        fullWidth
        label="Story Title"
        variant="outlined"
        value={title}
        size="small"
        onChange={handleTitleChange}
      />

      <Suspense fallback={<LoaderComp />}>
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={content}
          onChange={handleContentChange}
          style={{ maxHeight: "20rem", height: "20rem" }}
        />
        <br />
        <br />
      </Suspense>
      <Button onClick={handleSubmit} variant="contained" fullWidth>
        CONTINUE SESSION
      </Button>
    </Stack>
  );
}

QuilEditor.prototypes = {
  sendData: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initial: PropTypes.object,
};
export default QuilEditor;
