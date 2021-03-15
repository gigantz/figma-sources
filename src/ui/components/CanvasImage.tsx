import React, { memo, useEffect, useRef } from "react";

export const CanvasImage = memo(({ src, width, height }: any) => {
  const ref = useRef<any>();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.src = src;
    img.onload = () => {
      console.log("loading image");
      ctx.drawImage(img, 0, 0, width, height);
    };
  }, []);

  return <canvas ref={ref} width={width} height={height} />;
});
