import { useLayoutEffect, useState } from "react";

export const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  // Since if we use useeffect here, div will be rendered with 0 width and height and that will cause flicker
  useLayoutEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setDimensions({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    });

    resizeObserver.observe(ref.current);

    return () => resizeObserver.disconnect();
  });

  return dimensions;
};
