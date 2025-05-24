// components/BackgroundImageBox.tsx
import Image from "next/image";
import React from "react";

interface BackgroundImageBoxProps {
  imageUrl: string;
  altText?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode; // To allow passing child elements
}

const BackgroundImageBox: React.FC<BackgroundImageBoxProps> = ({
  imageUrl,
  altText = "Background",
  title,
  subtitle,
  className = "",
  children
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-xl p-6 shadow-lg ${className}`}
    >
      <Image
        src={imageUrl}
        alt={altText}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-80" // Adjust opacity as needed
        priority // Good for LCP elements
      />
      <div className="relative z-10 flex h-full flex-col">
        {title && (
          <h3 className="mb-1 text-2xl font-bold text-shadow-sm">{title}</h3>
        )}
        {subtitle && <p className="mb-4 text-sm text-shadow-xs">{subtitle}</p>}
        {/* Ensure children are rendered, typically at the end or in a specific section */}
        {children && <div className="mt-auto">{children}</div>}
      </div>
    </div>
  );
};

export default BackgroundImageBox;
