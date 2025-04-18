"use client";

import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
export interface VideoSource {
  src: string;
  type: string;
}

interface VideoPlayerProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  videoSrc: string | VideoSource[];
}

function VideoPlayer({ videoSrc, autoPlay, ...props }: VideoPlayerProps) {
  const videoElement = useRef<HTMLVideoElement>(null);
  if (autoPlay === undefined) {
    autoPlay = true;
  }

  const { ref, inView } = useInView();

  useEffect(() => {
    if (videoElement.current) {
      if (inView && autoPlay) {
        videoElement.current?.play().catch((err) => {
          if (err.name !== "AbortError") console.error(err);
        });
      } else {
        videoElement.current?.pause();
      }
    }
  });

  return (
    <video
      src={typeof videoSrc === "string" ? videoSrc : undefined}
      loop
      preload="none"
      muted
      playsInline
      onContextMenu={(e) => e.preventDefault()}
      ref={(e) => {
        videoElement.current = e;
        ref(e);
      }}
      {...props}
    >
      {typeof videoSrc === "string"
        ? null
        : videoSrc.map((video, index) => (
            <source key={index} src={video.src} type={video.type} />
          ))}
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
