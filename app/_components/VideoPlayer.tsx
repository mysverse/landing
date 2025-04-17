"use client";

import type { HTMLMotionProps } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
export interface VideoSource {
  src: string;
  type: string;
}

interface VideoPlayerProps
  extends Omit<HTMLMotionProps<"video">, "dragControls"> {
  videoSrc: string | VideoSource[];
}

function VideoPlayer({ videoSrc, ...rest }: VideoPlayerProps) {
  const videoElement = useRef<HTMLVideoElement>(null);

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  useEffect(() => {
    const video = videoElement.current;
    if (video) {
      if (inView) {
        video.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      } else {
        video.pause();
      }
    }
  }, [inView, videoElement]);

  return (
    <m.video
      src={typeof videoSrc === "string" ? videoSrc : undefined}
      // autoPlay={inView}
      loop
      preload={"none"}
      muted
      playsInline
      onContextMenu={(e) => e.preventDefault()}
      ref={(el) => {
        ref(el);
        videoElement.current = el;
      }}
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
