import { Button, ButtonTypes, ControlSizes } from "figma-react-ui-kit";
import React, { useEffect, useMemo, useState } from "react";
import useClipboard from "react-use-clipboard";
import { generateImgSrcUrl } from "../helpers";

// import { FixedSizeGrid as Grid } from "react-window";
import { ImageItem } from "./ImageItem";

type Props = {
  fileKey: string;
  onSetFileKey: (value: string) => void;
};

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

export const Images = ({ fileKey, onSetFileKey }: Props) => {
  const [images, setImages] = useState([]);
  const [positions, setPositions] = useState({});
  const [isLoading, setLoading] = useState(false);

  const allImagesSrc = useMemo(
    () => images.map((hash) => generateImgSrcUrl(fileKey, hash)).join("\n"),
    [images, fileKey]
  );
  const [isCopied, setCopied] = useClipboard(allImagesSrc, {
    successDuration: 1000,
  });

  const onMessage = (e) => {
    let msg = e.data.pluginMessage;
    if (msg.type === "images") {
      setImages(msg.data.images);
      setPositions(msg.data.imagePositions);
      setLoading(false);
    }
  };

  const onBack = () => onSetFileKey("");

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

  // const rowCount = images.length / 2;
  // const itemData = useMemo(() => ({ images, positions, fileKey }), [
  //   images,
  //   positions,
  //   fileKey,
  // ]);

  return (
    <div className="images-wrapper">
      <div className="images-top">
        {!isLoading ? (
          <>
            <Button
              buttonType={ButtonTypes.GHOST}
              buttonSize={ControlSizes.S}
              onClick={onBack}
              style={{ marginRight: 10, flex: 0, padding: "0 20px" }}
            >
              Back
            </Button>
            <Button
              buttonType={ButtonTypes.PRIMARY}
              buttonSize={ControlSizes.S}
              onClick={setCopied}
            >
              {isCopied ? "Copied!" : `Copy all urls (${images.length})`}
            </Button>
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
        {/* <Grid
          columnCount={2}
          columnWidth={153}
          height={540}
          rowCount={rowCount}
          rowHeight={170}
          width={470}
          itemData={itemData}
        >
          {Cell}
        </Grid> */}
      </div>
    </div>
  );
};
