"use client";

import type { HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";
interface VideoSource {
  src: string;
  type: string;
}

interface VideoPlayerProps
  extends Omit<HTMLMotionProps<"video">, "dragControls"> {
  videoSrc: string | VideoSource[];
  loopStart?: number;
  loopEnd?: number;
}

function VideoPlayer({
  videoSrc,
  loopStart,
  loopEnd,
  ...rest
}: VideoPlayerProps) {
  return (
    <m.video
      src={
        typeof videoSrc === "string"
          ? `${videoSrc}${loopStart ? `#t=${loopStart},${loopEnd}` : ""}`
          : undefined
      }
      onTimeUpdate={(e) => {
        if (loopStart && loopEnd) {
          const video = e.currentTarget;
          if (video.currentTime >= loopEnd) {
            video.currentTime = loopStart;
          }
        }
      }}
      autoPlay
      loop
      muted
      playsInline
      onContextMenu={(e) => e.preventDefault()}
      {...rest}
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

export default VideoPlayer;
