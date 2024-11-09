"use client";
import { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";

export default function IntersectionTransition(props: PropsWithChildren) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once
    threshold: 0.1 // Trigger when 30% of the component is in view
  });

  return (
    <div
      ref={ref}
      className={clsx(
        "transition duration-500 ease-out",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
    >
      {props.children}
    </div>
  );
}
