import { Button, ButtonTypes, ControlSizes } from "figma-react-ui-kit";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import useClipboard from "react-use-clipboard";
import { generateImgSrcUrl, generateShellScript } from "../helpers";

import { ImageItem } from "./ImageItem";

type Props = {
  fileKey: string;
  onSetFileKey: (value: string) => void;
};

// import { FixedSizeGrid as Grid } from "react-window";

// const Cell = ({ columnIndex, rowIndex, style, data }: any) => {
//   const hash = data.images[rowIndex * 2 + columnIndex];
//   if (!hash) return null;
//   return (
//     <div style={style}>
//       <ImageItem
//         hash={hash}
//         positions={data.positions[hash]}
//         fileKey={data.fileKey}
//       />
//     </div>
//   );
// };

// const rowCount = images.length / 2;
// const itemData = useMemo(() => ({ images, positions, fileKey }), [
//   images,
//   positions,
//   fileKey,
// ]);

// <Grid
//   columnCount={2}
//   columnWidth={153}
//   height={540}
//   rowCount={rowCount}
//   rowHeight={170}
//   width={470}
//   itemData={itemData}
//   >
//   {Cell}
// </Grid>

export const Images = ({ fileKey, onSetFileKey }: Props) => {
  const [images, setImages] = useState([]);
  const [positions, setPositions] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");

  const allImagesSrc = useMemo(
    () => images.map((hash) => generateImgSrcUrl(fileKey, hash)).join("\n"),
    [images, fileKey]
  );

  const [isCopied, setCopied] = useClipboard(allImagesSrc, {
    successDuration: 1000,
  });

  const downloadFile = useCallback(
    (images) => {
      const code = generateShellScript(fileKey, images);
      const blob = new Blob([code], { type: "application/x-sh" });
      setBlobUrl(window.URL.createObjectURL(blob) as any);
    },
    [fileKey, allImagesSrc]
  );

  const onMessage = (e) => {
    let msg = e.data.pluginMessage;
    if (msg.type === "images") {
      setImages(msg.data.images);
      setPositions(msg.data.imagePositions);
      setLoading(false);
      downloadFile(msg.data.images);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      parent.postMessage({ pluginMessage: { type: "get-images" } }, "*");
    }, 600);

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <div className="images-wrapper">
      <div className="images-top">
        {!isLoading ? (
          <>
            <Button
              buttonType={ButtonTypes.PRIMARY}
              buttonSize={ControlSizes.S}
              onClick={setCopied}
            >
              {isCopied ? "Copied!" : `Copy all urls (${images.length})`}
            </Button>

            <a
              download={`figma-download-${fileKey}.sh`}
              href={blobUrl}
              target="_self"
              style={{ paddingLeft: 10 }}
            >
              <Button
                buttonType={ButtonTypes.GHOST}
                buttonSize={ControlSizes.S}
              >
                Download all (shell script)
              </Button>
            </a>
          </>
        ) : (
          "Loading..."
        )}
      </div>
      <div className="images-container">
        {images &&
          images.map((hash) => (
            <ImageItem
              key={hash}
              hash={hash}
              positions={positions[hash]}
              fileKey={fileKey}
            />
          ))}
      </div>
    </div>
  );
};
