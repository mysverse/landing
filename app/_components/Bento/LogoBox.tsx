import Image from "next/image";
import React from "react";

interface LogoBoxProps {
  logoUrl: string;
  altText?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const LogoBox: React.FC<LogoBoxProps> = ({
  logoUrl,
  altText = "",
  className = "",
  width = 150,
  height = 50,
  priority = false
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
        className="object-contain"
        priority={priority}
      />
    </div>
  );
};

export default LogoBox;
