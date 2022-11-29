import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AppState {
  plate: Plate;
  parts: Part[];
}

interface AppActions {
  updatePlate: (newState: Partial<AppState['plate']>) => void;
  addPart: (part: Part) => void;
  removePart: (id: Part['id']) => void;
  updatePart: (id: Part['id'], part: Partial<Part>) => void;
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
  parts: [],
};

const AppContext = createContext<AppContextShape>({
  state: defaultState,
  actions: {
    updatePlate: () => { throw new Error('Not implemented') },
    addPart: (part: Part) => { throw new Error('Not implemented') },
    removePart: (id: Part['id']) => { throw new Error('Not implemented') },
    updatePart: (id: Part['id'], part: Partial<Part>) => { throw new Error('Not implemented') },
  },
});

export function useAppContext() {
  return useContext(AppContext);
}

function AppContextProvider({ children }: { children?: ReactNode }) {
  const [plate, setPlate] = useState<AppState['plate']>(defaultState.plate);
  const [parts, setParts] = useState<AppState['parts']>(defaultState.parts);

  const state = useMemo((): AppState => {
    return {
      plate,
      parts,
    };
  }, [parts, plate]);

  const actions = useMemo((): AppActions => {
    return {
      updatePlate: (newState) => setPlate((prevState) => ({ ...prevState, ...newState })),
      addPart: (part) => setParts((currentParts) => [...currentParts, part]),
      removePart: (id) => setParts((currentParts) => currentParts.filter((p) => p.id !== id)),
      updatePart: (id, part) => {
        setParts((currentParts) => {
          return currentParts.map((p) => {
            if (p.id !== id) {
              return p;
            }

            return {
              ...p,
              ...part,
            };
          });
        });
      },
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
