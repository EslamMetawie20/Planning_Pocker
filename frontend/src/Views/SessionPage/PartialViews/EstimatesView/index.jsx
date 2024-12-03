import React, { useState, useEffect } from "react";
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
import { addStory, fetchSessionStories } from "../../../../_redux/reducers/storySlice";
import {
    endSession,
    leaveSession,
} from "../../../../_redux/reducers/sessionSlice.js";

const EstimatesView = () => {
    const { status, stories, selectedStory, handleSelectStory } = useStories();
    const [openQuilEditor, setOpenQuilEditor] = useState(false);
    const dispatch = useDispatch();
    const sessionId = useSelector((state) => state.session.sessionId);
    const isScrumMaster = useSelector((state) => state.session.isScrumMaster);

    useEffect(() => {
        if (sessionId) {
            dispatch(fetchSessionStories());
        }
    }, [sessionId, dispatch]);

    const handleAddStory = (title, content) => {
        const newStory = {
            title,
            content,
            estimate: 0,
            sessionId,
        };

        addStorySocket(
            sessionId,
            newStory,
            (response) => {
                console.log("Story added successfully:", response);
                dispatch(addStory({ ...newStory, id: response.id })).then(() => {
                    dispatch(fetchSessionStories());
                });
            },
            (error) => {
                console.error("Failed to add story:", error);
            }
        );

        setOpenQuilEditor(false);
    };

    const handleLeaveSession = () => {
        dispatch(leaveSession());
    };

    const handleEndSession = () => {
        dispatch(endSession());
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
                                    selected={selectedStory.id === story?.id}
                                    estimate={story?.estimate}
                                    disabled={!isScrumMaster}
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

            <Dialog
                open={openQuilEditor}
                onClose={() => setOpenQuilEditor(false)}
                maxWidth="md"
                fullWidth
            >
                <QuilEditor
                    sendData={handleAddStory}
                    onSubmit={() => setOpenQuilEditor(false)}
                    initial={{ title: "", content: "" }}
                    buttonLabel="Save"
                />
            </Dialog>
        </>
    );
};

export default EstimatesView;
