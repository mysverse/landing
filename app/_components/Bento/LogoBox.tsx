import Image from "next/image";
import React from "react";

interface LogoBoxProps {
  logoUrl: string;
  altText?: string;
  className?: string;
  width?: number;
  height?: number;
}

const LogoBox: React.FC<LogoBoxProps> = ({
  logoUrl,
  altText = "Logo",
  className = "",
  width = 150,
  height = 50
}) => {
  return (
    <div
      className={`bg-dark-green flex items-center justify-center rounded-xl p-4 shadow-lg ${className}`}
    >
      <Image
        src={logoUrl}
        alt={altText}
        width={width}
        height={height}
        objectFit="contain"
        priority
      />
    </div>
  );
};

export default LogoBox;
