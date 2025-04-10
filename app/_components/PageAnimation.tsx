"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
// import { usePathname } from "next/navigation";
export default function PageAnimation({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  // const pathname = usePathname();

  return (
    <motion.div
      // key={pathname}
      initial={{ y: 128, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
