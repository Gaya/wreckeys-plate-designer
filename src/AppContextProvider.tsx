import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AppState {
  plate: {
    type: '19inch' | 'eurorack' | 'custom';
    width: number;
    height: number;
  };
}

interface AppActions {
  updatePlate: (newState: Partial<AppState['plate']>) => void;
}

interface AppContextShape {
  state: AppState;
  actions: AppActions;
}

const defaultState: AppState = {
  plate: {
    type: '19inch',
    width: 19,
    height: 3,
  },
};

const AppContext = createContext<AppContextShape>({
  state: defaultState,
  actions: {
    updatePlate: () => { throw new Error('Not implemented') },
  },
});

export function useAppContext() {
  return useContext(AppContext);
}

function AppContextProvider({ children }: { children?: ReactNode }) {
  const [plate, setPlate] = useState<AppState['plate']>(defaultState.plate);

  const state = useMemo((): AppState => {
    return {
      plate,
    };
  }, [plate]);

  const actions = useMemo((): AppActions => {
    return {
      updatePlate: (newState) => setPlate((prevState) => ({ ...prevState, ...newState })),
    };
  }, []);

  const value = useMemo(() => ({ state, actions }), [actions, state]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
