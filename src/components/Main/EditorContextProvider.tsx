import { createContext, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

import { plateHeight, plateWidth } from '../../core/calc';

import { useAppContext } from '../App/AppContextProvider';

interface EditorContextShape {
  width: number;
  height: number;
  outerWidth: number;
  outerHeight: number;
  pixelRatio: number;
}

export const EditorContext = createContext<EditorContextShape>({
  width: 0,
  height: 0,
  outerWidth: 0,
  outerHeight: 0,
  pixelRatio: 1,
});

function EditorContextProvider({ children }: { children?: ReactNode }) {
  const { state } = useAppContext();
  const { plate } = state;
  const container = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    outerWidth: 0,
    outerHeight: 0,
  });

  const padding = 10;
  const width = plateWidth(plate);
  const height = plateHeight(plate);
  const totalWidth = padding * 2 + width;
  const totalHeight = padding * 2 + height;

  useEffect(() => {
    if (!container.current) {
      return;
    }

    const main = container.current.querySelector('.designer-main');

    if (!main) {
      return;
    }

    const resizeObserver = new ResizeObserver(([mainContainer]) => {
      if (!container.current) {
        return;
      }

      const mainRect = mainContainer.target.getBoundingClientRect();
      const containerRect = container.current.getBoundingClientRect();

      setDimensions({
        width: mainRect.width,
        height: mainRect.height,
        outerWidth: containerRect.width,
        outerHeight: containerRect.height,
      });
    });

    resizeObserver.observe(main);
  }, []);

  const value = useMemo((): EditorContextShape => ({
    ...dimensions,
    pixelRatio: totalWidth > totalHeight
      ? dimensions.width / totalWidth
      : dimensions.height / totalHeight,
  }), [dimensions, totalHeight, totalWidth]);

  return (
    <EditorContext.Provider value={value}>
      <div ref={container} className="SizeContainer">
        {children}
      </div>
    </EditorContext.Provider>
  );
}

export default EditorContextProvider;
