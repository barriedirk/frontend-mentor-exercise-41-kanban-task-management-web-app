import { useEffect, useState } from "react";

export function useWidthViewPort() {
  const [widthViewPort, setWidthViewPort] = useState(0);

  useEffect(() => {
    const resizeCallBack = () => {
      const width = window.innerWidth;

      setWidthViewPort(width);
    };

    window.addEventListener("resize", resizeCallBack);

    return () => window.removeEventListener("resize", resizeCallBack);
  }, []);

  return widthViewPort;
}
