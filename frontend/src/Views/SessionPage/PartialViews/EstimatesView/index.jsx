import React from "react";
import FrameComponent from "../../../../Components/Frames/FrameComponent";
import { Divider, IconButton, Stack } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import StoryComp from "./Components/StoryComp";
import EstimateForm from "./Components/EstimateForm";
import EstimatesFooter from "./Components/EstimatesFooter";
import useStories from "../../../../Common/Hooks/useStories";
import LoaderComp from "../../../../Components/Extras/LoaderComp";
import { STATUS } from "../../../../Common/Vars/Constants";

const EstimatesView = () => {
    const { status, stories, selectedStory, handleSelectStory } = useStories();

    return (
        <FrameComponent
            paperSx={{
                flex: 1,
            }}
            sx={{ paddingY: 1, paddingX: 0 }}
            title={"Stories"}
            icon={
                <IconButton>
                    <AddCircleOutline color="secondary" fontSize="small" />
                </IconButton>
            }
        >
            {status === STATUS.LOADING ? (
                <LoaderComp />
            ) : (
                <>
                    <Stack flex={1} spacing={1} paddingX={1} justifyContent="space-between">
                        {/* قسم الكروت */}
                        <Stack spacing={1} flex={1} overflow={"auto"}>
                            {stories.map((story) => (
                                <StoryComp
                                    key={story?.id}
                                    title={story?.title}
                                    selected={selectedStory.id === story?.id}
                                    estimate={story?.estimate}
                                    onClick={() => handleSelectStory(story?.id)}
                                />
                            ))}
                        </Stack>

                        {/* الفاصل */}
                        <Divider sx={{ my: 1 }} />

                        <Stack spacing={1}>
                            <EstimateForm />
                            <EstimatesFooter sessionId={"a23389cc"} />
                        </Stack>
                    </Stack>

                </>
            )}
        </FrameComponent>
    );
};

export default EstimatesView;
