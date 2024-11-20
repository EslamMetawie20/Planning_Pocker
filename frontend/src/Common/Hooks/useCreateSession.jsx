import { useCallback, useEffect, useState } from "react";
import GoogleAvatars from "../Vars/GoogleAvatars";
import { createSession, updateStory } from "../../_redux/reducers/sessionSlice";
import { useDispatch } from "react-redux";

const useCreateSession = () => {
  const [openQuilEditor, setOpenQuilEditor] = useState(false);
  const [sessionEdited, setSessionEdited] = useState(false);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ name: false });
  const [initialStory, setInitialStory] = useState({}); // Story data

  const dispatch = useDispatch();

  const handleOpenQuilEditor = () => {
    setOpenQuilEditor(true);
  };

  const handleCloseQuilEditor = () => {
    setOpenQuilEditor(false);
  };

  const handleSwap = () => {
    setCurrentAvatarIndex((prevIndex) =>
        prevIndex === GoogleAvatars.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Update initialStory data when data is edited in the QuilEditor
  const getQuillData = useCallback((title, content) => {
    setInitialStory({ title, content });
  }, []);

  useEffect(() => {
    if (initialStory?.content && initialStory.title) {
      setSessionEdited(true);
    } else {
      setSessionEdited(false);
    }
  }, [initialStory]);

  // Function to handle story update
  const handleUpdateStory = (updatedStory) => {
    dispatch(updateStory(updatedStory)); // Dispatch action to update story in Redux
    handleCloseQuilEditor(); // Close QuilEditor after updating
  };

  const handleCreateSession = () => {
    const newErrors = {
      name: name.trim() === "",
    };
    setErrors(newErrors);

    if (!newErrors.name) {
      // const request = {
      //   name,
      //   initialStory: {
      //     title: initialStory?.title,
      //     description: initialStory?.content,
      //   },
      //   avatarIndex: currentAvatarIndex,
      // };

      const request = { userName: name };
      dispatch(createSession(request));
    }
  };

  return {
    handleCreateSession,
    handleSwap,
    handleCloseQuilEditor,
    handleOpenQuilEditor,
    handleUpdateStory,
    currentAvatarIndex,
    setName,
    name,
    sessionEdited,
    openQuilEditor,
    errors,
    getQuillData,
    initialStory,
  };
};

export default useCreateSession;
