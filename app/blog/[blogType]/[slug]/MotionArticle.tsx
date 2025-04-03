"use client";

import type { PropsWithChildren } from "react";
import { motion } from "motion/react";

export default function MotionArticle(props: PropsWithChildren) {
  return (
    <motion.article
      initial={{ y: 128, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
      className="mx-auto max-w-4xl px-6"
    >
      {props.children}
    </motion.article>
  );
}
