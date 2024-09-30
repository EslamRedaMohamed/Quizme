import { useEffect } from "react";
import postData from "../utils/postData";

const FRAME_POLLING_RATE = 10000;
const JPEG_IMAGE_QUALITY = 0.8;
const useWebCamPolling = (stream: MediaStream) => {
  useEffect(() => {
    const videoElement = document.createElement("video");
    videoElement.srcObject = stream;
    videoElement.play();

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 640;
    canvas.height = 480;

    if (!context) {
      console.error("Failed to get canvas context for webcam polling");
      return;
    }

    const interval = setInterval(() => {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error(
              "Failed to convert canvas to blob for webcam polling"
            );
            return;
          }
          postData("/monitor-frame/", blob).catch((error) => {
            console.error("Error sending frame:", error);
          });
        },
        "image/jpeg",
        JPEG_IMAGE_QUALITY
      );
    }, FRAME_POLLING_RATE);
    return () => {
      clearInterval(interval);
      videoElement.srcObject = null;
      videoElement.pause();
      document.body.removeChild(videoElement);
    };
  }, [stream]);
};

export default useWebCamPolling;
