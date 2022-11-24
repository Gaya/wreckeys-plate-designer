import { createContext, ReactNode, useState } from 'react';

interface EditorContextShape {
  pixelRatio: number;
  setPixelRatio: (ratio: number) => void;
}

export const EditorContext = createContext<EditorContextShape>({
  pixelRatio: 1,
  setPixelRatio: () => undefined,
});

function EditorContextProvider({ children }: { children?: ReactNode }) {
  const [pixelRatio, setPixelRatio] = useState(1);

  return (
    <EditorContext.Provider value={{ pixelRatio, setPixelRatio }}>
      {children}
    </EditorContext.Provider>
  );
}

export default EditorContextProvider;
