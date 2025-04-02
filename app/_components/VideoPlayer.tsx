"use client";

interface VideoSource {
  src: string;
  type: string;
}
type VideoPlayerProps = {
  src: string | VideoSource[];
  className?: string;
};

function VideoPlayer({ src, className }: VideoPlayerProps) {
  return (
    <video
      src={typeof src === "string" ? src : undefined}
      autoPlay
      loop
      muted
      playsInline
      onContextMenu={(e) => e.preventDefault()}
      className={className}
    >
      {typeof src === "string"
        ? null
        : src.map((videoSrc, index) => (
            <source key={index} src={videoSrc.src} type={videoSrc.type} />
          ))}
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
