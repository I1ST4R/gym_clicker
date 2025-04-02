import { useState, useEffect } from 'react';
import { loadState, saveState } from '../../../../js/storage';

export const useStory = () => {
  const [storyIntroShown, setStoryIntroShown] = useState(() => loadState('storyIntroShown', false, JSON.parse));
  const [storyAutroShown, setStoryAutroShown] = useState(() => loadState('storyAutroShown', false, JSON.parse));

  const resetStory = () => {
    setStoryIntroShown(false);
    setStoryAutroShown(false);
  };

  useEffect(() => {
    saveState('storyIntroShown', JSON.stringify(storyIntroShown));
    saveState('storyAutroShown', JSON.stringify(storyAutroShown));
  }, [storyIntroShown, storyAutroShown]);

  return {
    storyIntroShown,
    setStoryIntroShown,
    storyAutroShown,
    setStoryAutroShown,
    resetStory,
  };
};