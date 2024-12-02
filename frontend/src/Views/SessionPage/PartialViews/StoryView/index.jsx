import React, { useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { IconButton, Dialog, Stack, Box } from "@mui/material";
import { EditRounded } from "@mui/icons-material";
import useStories from "../../../../Common/Hooks/useStories";
import { STATUS } from "../../../../Common/Vars/Constants";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import QuilEditor from "../../../../PartialViews/QuilEditor.jsx";
import { useDispatch, useSelector } from "react-redux";
import { updateStory } from "../../../../_redux/reducers/storySlice.js";
import CardsView from "../CardsView/index.jsx";

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
      <Box flex={3}>
        <Stack position={"relative"} height={"100%"}>
          <FrameComponent
            title={selectedStory?.title || ""}
            paperSx={{
              maxHeight: !isScrumMaster ? "90%" : "unset",
              height: !isScrumMaster ? "unset" : "100%",
            }}
            icon={
              isScrumMaster && (
                <IconButton onClick={handleEditClick}>
                  <EditRounded color="secondary" fontSize="small" />
                </IconButton>
              )
            }
          >
            {status === STATUS.LOADING ? (
              <LoaderComp />
            ) : (
              <>
                {parsedContent}
                {!isScrumMaster && <Box height={"10%"} />}
              </>
            )}
          </FrameComponent>
          {!isScrumMaster && (
            <Box
              position={"absolute"}
              bottom={0}
              left="50%"
              sx={{ transform: "translateX(-50%)" }}
            >
              <CardsView />
            </Box>
          )}
        </Stack>
      </Box>
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
