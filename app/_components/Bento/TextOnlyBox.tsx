import React from "react";

interface TextOnlyBoxProps {
  title?: string;
  text?: string;
  className?: string;
  titleClassName?: string;
  textClassName?: string;
  children?: React.ReactNode;
}

const TextOnlyBox: React.FC<TextOnlyBoxProps> = ({
  title,
  text,
  className = "",
  titleClassName = "",
  textClassName = "",
  children
}) => {
  return (
    <div className={`bg-brand-green rounded-xl p-6 shadow-lg ${className}`}>
      {title && (
        <h3 className={`mb-2 text-xl font-bold ${titleClassName}`}>{title}</h3>
      )}
      {text && <p className={`text-sm ${textClassName}`}>{text}</p>}
      {children}
    </div>
  );
};

export default TextOnlyBox;
