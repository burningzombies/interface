import { useEffect, useState } from "react";

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set size at the first client-side load
    handler();

    window.addEventListener("resize", handler);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return windowSize;
}

export default useWindowSize;
