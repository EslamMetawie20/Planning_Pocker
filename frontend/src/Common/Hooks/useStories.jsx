import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUS } from "../Vars/Constants";
import {
  fetchSessionStories,
  selectStory,
} from "../../_redux/reducers/storySlice";

const useStories = () => {
  const dispatch = useDispatch();
  const { status, stories, selectedStoryId } = useSelector(
    (state) => state.story
  );

  const selectedStory = stories.find((story) => story.id === selectedStoryId);

  useEffect(() => {
    if (status === STATUS.IDLE) {
      dispatch(fetchSessionStories());
    }
  }, [status, dispatch]);

  // Function to select a story
  const handleSelectStory = (storyId) => {
    dispatch(selectStory(storyId));
  };

  return { status, stories, selectedStory, handleSelectStory };
};

export default useStories;
