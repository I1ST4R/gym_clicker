export const useReset = ({ 
  stateSetters, 
  initialState,
  additionalStateSetters = {}, 
  additionalInitialState = {} 
}) => {
  const reset = (resetAdditionalStates = false) => {
    
    Object.entries(initialState).forEach(([key, value]) => {
      if (stateSetters[key]) stateSetters[key](value);
    });

    if (resetAdditionalStates) {
      Object.entries(additionalInitialState).forEach(([key, value]) => {
        if (additionalStateSetters[key]) additionalStateSetters[key](value);
      });
    }
  };

  return { reset };
};