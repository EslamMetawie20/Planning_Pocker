import React, { useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { IconButton, Dialog } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import useStories from "../../../../Common/Hooks/useStories";
import { STATUS } from "../../../../Common/Vars/Constants";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import QuilEditor from "../../../../PartialViews/QuilEditor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateStory } from "../../../../_redux/reducers/storySlice.js";

const StoryView = () => {
  const dispatch = useDispatch();
  const isScrumMaster = useSelector((state) => state.session.isScrumMaster);
  const { status, selectedStory } = useStories();

  const [openEditor, setOpenEditor] = useState(false);

  const handleEditClick = () => {
    setOpenEditor(true);
  };

  const handleCloseEditor = () => {
    setOpenEditor(false);
  };

  const handleUpdateStory = (updatedStory) => {
    dispatch(updateStory(updatedStory));
    handleCloseEditor();
  };

  const cleanHTML = DOMPurify.sanitize(selectedStory?.content);
  const parsedContent = parse(cleanHTML);

  return (
    <>
      <FrameComponent
        paperSx={{
          flex: 3,
        }}
        title={selectedStory?.title || ""}
        icon={
          isScrumMaster && (
            <IconButton onClick={handleEditClick}>
              <EditRounded color="secondary" fontSize="small" />
            </IconButton>
          )
        }
      >
        {status === STATUS.LOADING ? <LoaderComp /> : parsedContent}
      </FrameComponent>
      <Dialog
        open={openEditor}
        onClose={handleCloseEditor}
        maxWidth="md"
        fullWidth
      >
        <QuilEditor
          sendData={(title, content) => {
            const updatedStory = {
              ...selectedStory,
              title,
              content,
            };
            handleUpdateStory(updatedStory);
          }}
          initial={selectedStory}
          onSubmit={handleCloseEditor}
          buttonLabel="Save"
        />
      </Dialog>
    </>
  );
};

export default StoryView;
