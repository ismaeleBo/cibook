import "./style.css";
import React, { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const MAX_WIDTH_PERCENTAGE = 0.75;

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * MAX_WIDTH_PERCENTAGE);

  useEffect(() => {
    let timer: any;
    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * MAX_WIDTH_PERCENTAGE < width) {
          setWidth(window.innerWidth * MAX_WIDTH_PERCENTAGE);
        }
      });
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width]);

  // An ugly workaround to avoid unexpected ResizeObserver errors
  useEffect(() => {
    const resizeErrorListener = (e: ErrorEvent) => {
      //   prettier-ignore
      if (e.message ==="ResizeObserver loop completed with undelivered notifications.") {
              const resizeObserverErrDiv = document.getElementById("webpack-dev-server-client-overlay-div");
              const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
              if (resizeObserverErr) {
                resizeObserverErr.setAttribute("style", "display: none");
              }
              if (resizeObserverErrDiv) {
                resizeObserverErrDiv.setAttribute("style", "display: none");
              }
            }
    };
    window.addEventListener("error", resizeErrorListener);

    return () => window.removeEventListener("error", resizeErrorListener);
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * MAX_WIDTH_PERCENTAGE, Infinity],
      height: Infinity,
      width,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      className: "resize-vertical",
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
