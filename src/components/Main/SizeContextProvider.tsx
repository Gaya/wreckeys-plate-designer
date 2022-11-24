import { createContext, ReactNode, useEffect, useRef, useState } from 'react';

export const SizeContext = createContext<{ width: number; height: number }>({
  width: 0,
  height: 0,
});

function SizeContextProvider({ children }: { children?: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensionss] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function handleResize() {
      if (!container.current) {
        return;
      }

      const rect = container.current.getBoundingClientRect();

      setDimensionss({ width: rect.width, height: rect.height });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SizeContext.Provider value={dimensions}>
      <div ref={container} className="SizeContainer">
        {children}
      </div>
    </SizeContext.Provider>
  );
}

export default SizeContextProvider;
