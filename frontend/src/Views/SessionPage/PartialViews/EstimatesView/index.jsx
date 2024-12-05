import React, { useState } from "react";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { Divider, IconButton, Stack, Dialog, Box } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import StoryComp from "./Components/StoryComp";
import CurrentVotes from "./Components/CurrentVotes.jsx";
import EstimateForm from "./Components/EstimateForm";
import EstimatesFooter from "./Components/EstimatesFooter";
import useStories from "../../../../Common/Hooks/useStories";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import QuilEditor from "../../../../PartialViews/QuilEditor.jsx";
import { STATUS } from "../../../../Common/Vars/Constants";
import { useDispatch, useSelector } from "react-redux";
import {
  endSession,
  leaveSession,
} from "../../../../_redux/reducers/sessionSlice.js";
import DeleteConfirmationDialog from "./Components/DeleteConfirmationDialog.jsx";

const EstimatesView = () => {
  const {
    status,
    stories,
    selectedStory,
    handleSelectStory,
    handleAddStory,
    handleDeleteStory,
  } = useStories();
  const [openQuilEditor, setOpenQuilEditor] = useState(false);
  const dispatch = useDispatch();
  const sessionId = useSelector((state) => state.session.sessionId);
  const isScrumMaster = useSelector((state) => state.session.isScrumMaster);

  const addStory = (title, content) => {
    handleAddStory(title, content);
    setOpenQuilEditor(false);
  };

  const handleLeaveSession = () => {
    dispatch(leaveSession());
  };

  const handleEndSession = () => {
    dispatch(endSession());
  };

  // --------------------------------------

  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const deleteStory = () => {
    const request = { sessionCode: sessionId, userStoryId: selectedStory?.id };
    handleDeleteStory(request);
    handleCloseDelete();
  };

  return (
    <>
      <FrameComponent
        paperSx={{
          flex: 1,
        }}
        sx={{
          paddingY: 1,
          paddingX: 0,
        }}
        title={"User stories"}
        icon={
          isScrumMaster && (
            <IconButton onClick={() => setOpenQuilEditor(true)}>
              <AddCircleOutline color="secondary" fontSize="small" />
            </IconButton>
          )
        }
      >
        {status === STATUS.LOADING ? (
          <LoaderComp />
        ) : (
          <Stack height={"100%"}>
            <Stack spacing={1} height={"25%"} overflow={"auto"} paddingX={1}>
              {stories.map((story) => (
                <StoryComp
                  key={story?.id}
                  title={story?.title}
                  selected={selectedStory?.id === story?.id}
                  estimate={story?.estimate}
                  disabled={!isScrumMaster}
                  onDelete={handleDeleteClick}
                  onClick={() => handleSelectStory(story?.id)}
                />
              ))}
            </Stack>
            <Box px={2}>
              <Divider />
            </Box>
            <Box px={2} my={2}>
              <CurrentVotes title="Current votes:" onClick={() => {}} />
            </Box>
            <Box px={2}>
              <Divider />
            </Box>
            <Stack flex={1} justifyContent={"space-between"} px={2} mt={2}>
              {isScrumMaster && <EstimateForm />}
              <Box display={"flex"} flexDirection={"column"} marginTop={"auto"}>
                <EstimatesFooter
                  sessionId={sessionId}
                  buttonLabel={isScrumMaster ? "End Session" : "Leave Session"}
                  onClick={
                    isScrumMaster ? handleEndSession : handleLeaveSession
                  }
                />
              </Box>
            </Stack>
          </Stack>
        )}
      </FrameComponent>

      {/* Dialog لإظهار QuilEditor */}
      <Dialog
        open={openQuilEditor}
        onClose={() => setOpenQuilEditor(false)}
        maxWidth="md"
        fullWidth
      >
        <QuilEditor
          sendData={addStory}
          onSubmit={() => setOpenQuilEditor(false)}
          initial={{ title: "", content: "" }}
          buttonLabel="Save"
        />
      </Dialog>
      <DeleteConfirmationDialog
        open={openDelete}
        onClose={() => handleCloseDelete()}
        onConfirm={deleteStory}
        itemName={selectedStory?.title}
      />
    </>
  );
};

export default EstimatesView;
