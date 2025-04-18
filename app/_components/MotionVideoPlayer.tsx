"use client";

import type { HTMLMotionProps } from "motion/react";
import { useRef } from "react";
import * as m from "motion/react-m";
import type { VideoSource } from "./VideoPlayer";

interface VideoPlayerProps
  extends Omit<HTMLMotionProps<"video">, "dragControls"> {
  videoSrc: string | VideoSource[];
}

function MotionVideoPlayer({ videoSrc, autoPlay, ...props }: VideoPlayerProps) {
  const videoElement = useRef<HTMLVideoElement>(null);
  if (autoPlay === undefined) {
    autoPlay = true;
  }
  return (
    <m.video
      src={typeof videoSrc === "string" ? videoSrc : undefined}
      loop
      preload="none"
      muted
      playsInline
      onContextMenu={(e) => e.preventDefault()}
      ref={videoElement}
      onViewportEnter={() => {
        if (autoPlay) {
          videoElement.current?.play().catch((err) => {
            if (err.name !== "AbortError") console.error(err);
          });
        }
      }}
      onViewportLeave={() => {
        videoElement.current?.pause();
      }}
      {...props}
    >
      {typeof videoSrc === "string"
        ? null
        : videoSrc.map((video, index) => (
            <source key={index} src={video.src} type={video.type} />
          ))}
      Your browser does not support the video tag.
    </m.video>
  );
}

export default MotionVideoPlayer;
