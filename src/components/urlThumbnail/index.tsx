import React, { useState, useRef, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
// TODO
// Throughly test giving width, default width etc

export interface ThumbnailProps {
  url: string;
  height?: number;
  width?: number;
  interactive?: boolean;
  iframeWidth?: number;
  iframeHeight?: number;
  style?: any;
  onLoad?: () => void;
}
export const Thumbnail: React.FC<ThumbnailProps> = ({
  url,
  height: heightProp,
  width: widthProp,
  interactive = false,
  iframeWidth: iframeWidthProp,
  iframeHeight: iframeHeightProp,
  style: customStyle,
  onLoad,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [calculatedSize, setCalculatedSize] = useState({});
  const ref = useRef(null);
  useEffect(() => {
    setCalculatedSize({
      width: ref?.current?.offsetWidth,
      height: ref?.current?.offsetHeight,
    });
  }, [ref.current?.offsetWidth, ref.current?.offsetHeight]);

  let width;
  if (!widthProp) {
    width = "100%";
  } else {
    width = `${widthProp}px`;
  }

  let height;
  if (!heightProp) {
    height = "100%";
  } else {
    height = `${heightProp}px`;
  }

  let aspectRatioHeight = "3";
  let aspectRatioWidth = "4";
  if (widthProp && heightProp) {
    aspectRatioHeight = height;
    aspectRatioWidth = width;
  }

  // Dealing with Height and Width
  // Variables to do with size and scale:
  // - width, height, iframeWidth, iframeHeight, xscale, yscale
  let iframeWidth = iframeWidthProp;
  let iframeHeight = iframeHeightProp;
  if (!iframeWidth && !iframeHeight) {
    iframeWidth = 1440;
    iframeHeight = 1080;
  } else if (iframeWidth && !iframeHeight) {
    iframeHeight = iframeWidth * (aspectRatioHeight / aspectRatioWidth);
  } else if (!iframeWidth && iframeHeight) {
    iframeWidth = iframeHeight * (aspectRatioWidth / aspectRatioHeight);
  }

  const xscale = calculatedSize.width / iframeWidth;
  const yscale = calculatedSize.height / iframeHeight;

  const outerWrapper = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width,
    height,
  };

  const iframeWrapper = {
    width: calculatedSize.width,
    maxHeight: calculatedSize.height,
  };

  const iframe = {
    transform: `scaleX(${xscale}) scaleY(${yscale})`,
    transformOrigin: "0 0",
    width: `${iframeWidth}px`,
    height: `${iframeHeight}px`,
    border: "0px",
  };

  const iframeShade = {
    position: "absolute",
    width: calculatedSize.width,
    height: calculatedSize.height,
    zIndex: "10",
  };

  const combinedOnLoad = () => {
    if (onLoad) {
      onLoad();
    }
    setLoading(false);
  };

  return (
    <div
      ref={ref}
      style={{ ...outerWrapper, ...customStyle }}
      data-testid="div-outer-wrapper"
    >
      {ref.current && (
        <div style={iframeWrapper} data-testid="div-iframe-wrapper">
          {!interactive && <div style={iframeShade}> </div>}
          {loading && (
            <Skeleton
              style={{ position: "absolute", zIndex: "15" }}
              width={calculatedSize.width}
              height={calculatedSize.height}
              duration={0.8}
            />
          )}

          <iframe
            tabIndex={-1}
            style={iframe}
            title="webpage-thumbnail"
            src={url}
            sandbox="allow-scripts allow-same-origin"
            scrolling="no"
            onLoad={combinedOnLoad}
            {...props}
          />
        </div>
      )}
    </div>
  );
};
export default Thumbnail;
