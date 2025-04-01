"use client";

type VideoPlayerProps = {
  src: string;
  className?: string;
};

function VideoPlayer({ src, className }: VideoPlayerProps) {
  return (
    <video src={src} autoPlay loop muted playsInline className={className}>
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
