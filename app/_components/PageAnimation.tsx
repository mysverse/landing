"use client";

import type { PropsWithChildren } from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageAnimation(props: PropsWithChildren) {
  const pathname = usePathname();
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [pathname]);

  return (
    <motion.div
      key={key}
      initial={{ y: 128, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0, 0.71, 0.2, 1.01] }}
      className="mx-6 max-w-4xl lg:mx-auto"
    >
      {props.children}
    </motion.div>
  );
}
