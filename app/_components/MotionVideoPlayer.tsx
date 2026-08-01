"use client";

import type { HTMLMotionProps } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

export interface VideoSource {
  src: string;
  type: string;
}

interface VideoPlayerProps extends Omit<
  HTMLMotionProps<"video">,
  "dragControls"
> {
  videoSrc: string | VideoSource[];
}

function MotionVideoPlayer({
  videoSrc,
  autoPlay = true,
  ...props
}: VideoPlayerProps) {
  const videoElement = useRef<HTMLVideoElement>(null);
  // Don't autoplay for users who prefer reduced motion.
  const shouldReduceMotion = useReducedMotion();
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
        if (autoPlay && !shouldReduceMotion) {
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
