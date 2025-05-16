"use client";

import React, { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// You can also import optional Lightbox plugins if you need them
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import "yet-another-react-lightbox/plugins/fullscreen.css";
// import "yet-another-react-lightbox/plugins/slideshow.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";
// import "yet-another-react-lightbox/plugins/zoom.css";

// Define the props for the LightboxImage component
// It will accept all props that next/image accepts
// and an optional 'lightboxProps' for Lightbox specific configurations
interface LightboxImageProps extends React.ComponentProps<typeof Image> {
  lightboxProps?: Partial<React.ComponentProps<typeof Lightbox>>;
  // If you want to show a different image in the lightbox (e.g., a higher resolution one)
  lightboxSrc?: string;
}

const LightboxImage: React.FC<LightboxImageProps> = ({
  src,
  alt,
  width,
  height,
  lightboxSrc,
  lightboxProps,
  onClick, // Capture onClick from props if passed
  ...rest // Capture any other next/image props
}) => {
  // State to manage the lightbox visibility
  const [open, setOpen] = useState(false);

  // Determine the source for the lightbox slide
  // Prioritize lightboxSrc, then the regular src
  const actualLightboxSrc =
    typeof lightboxSrc === "string"
      ? lightboxSrc
      : typeof src === "string"
        ? src
        : "";

  // Handle the image click event
  const handleClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setOpen(true);
    // If an external onClick handler is provided, call it
    if (onClick) {
      onClick(event);
    }
  };

  if (!lightboxProps) {
    // If no lightboxProps are provided, set default values
    lightboxProps = {
      render: {
        buttonPrev: () => null,
        buttonNext: () => null
      },
      carousel: {
        finite: true
      }
    };
  }

  return (
    <>
      {/* The Next.js Image component */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={handleClick}
        style={{ cursor: "pointer" }} // Add pointer cursor to indicate it's clickable
        {...rest} // Spread the rest of the props
      />

      {/* The Lightbox component */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: actualLightboxSrc as string,
            alt: alt,
            width: Number(width),
            height: Number(height)
          }
        ]}
        // You can add more plugins here if needed, e.g.,
        // plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        {...lightboxProps} // Spread any additional lightbox props
      />
    </>
  );
};

export default LightboxImage;
