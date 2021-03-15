import React, { memo, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useClipboard from "react-use-clipboard";

import { generateImgSrcUrl } from "../helpers";
import { ExternalIcon } from "../icons/External";
import { CopyIcon } from "../icons/Copy";

declare module "react" {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    loading?: "auto" | "eager" | "lazy";
  }
}

type Props = {
  hash: string;
  fileKey: string;
  selected?: boolean;
  positions: number[];
};

export const ImageItem = memo(({ fileKey, hash, positions }: Props) => {
  const url = useMemo(() => generateImgSrcUrl(fileKey, hash), [fileKey, hash]);

  const [isCopied, setCopied] = useClipboard(url, {
    successDuration: 1000,
  });

  const onPosition = (() => {
    let i = 0;

    return () => {
      parent.postMessage(
        { pluginMessage: { type: "image-position", data: positions[i] } },
        "*"
      );
      if (positions.length - 1 === i) {
        i = 0;
      } else {
        i++;
      }
    };
  })();

  return (
    <div className="image-item">
      {isCopied && (
        <div className="url-copied">
          <span>URL Copied!</span>
        </div>
      )}
      <LazyLoadImage
        width={145}
        height={140}
        src={url}
        effect="blur"
        onClick={onPosition}
      />

      <div className="image-item__info">
        <span onClick={onPosition}>{hash && hash.slice(0, 6)}</span>
        <div className="image-item__buttons">
          <a href={url} target="_blank" className="icon-link">
            <ExternalIcon />
          </a>
          <span className="line" />
          <CopyIcon onClick={setCopied} />
        </div>
      </div>
    </div>
  );
});
