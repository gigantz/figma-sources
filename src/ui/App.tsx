import React, { useEffect, useState } from "react";

import "./global.css";
import "figma-react-ui-kit/dist/react.css";
import "figma-react-ui-kit/dist/style.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import { ShareLink } from "./components/ShareLink";
import { Images } from "./components/Images";

export const App = () => {
  const [fileKey, setFileKey] = useState("");

  return (
    <div>
      {!fileKey ? (
        <ShareLink onSetFileKey={setFileKey} />
      ) : (
        <Images fileKey={fileKey} onSetFileKey={setFileKey} />
      )}
    </div>
  );
};
