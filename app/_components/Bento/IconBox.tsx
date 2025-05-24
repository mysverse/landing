// components/IconBox.tsx
import React from "react";
// Ensure you have @heroicons/react installed: npm install @heroicons/react
import {
  BeakerIcon,
  FireIcon,
  TruckIcon,
  CogIcon,
  UserGroupIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/solid";

// Define a type for the icon names for better type safety
export type IconName =
  | "gamepad"
  | "fire"
  | "truck"
  | "settings"
  | "beaker"
  | "default";

interface IconMapType {
  [key: string]: React.ElementType; // Use string key for flexibility, or IconName for strictness
}

const iconMap: IconMapType = {
  gamepad: UserGroupIcon,
  fire: FireIcon,
  truck: TruckIcon,
  settings: CogIcon,
  beaker: BeakerIcon,
  default: QuestionMarkCircleIcon
};

interface IconBoxProps {
  iconName: IconName;
  text?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

const IconBox: React.FC<IconBoxProps> = ({
  iconName,
  text,
  className = "",
  textClassName = "",
  iconClassName = "h-12 w-12 mb-2 text-white"
}) => {
  const IconComponent = iconMap[iconName] || iconMap.default;
  return (
    <div
      className={`bg-dark-green flex flex-col items-center justify-center rounded-xl p-4 shadow-lg ${className}`}
    >
      <IconComponent className={iconClassName} />
      {text && (
        <p className={`text-center text-sm font-semibold ${textClassName}`}>
          {text}
        </p>
      )}
    </div>
  );
};

export default IconBox;
