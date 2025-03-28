"use client";

import { AnimateNumber } from "motion-plus-react";
import { useInView } from "react-intersection-observer";

function getCountingStartValue(endValue: number): number {
  // For very small numbers, you might want to just start at 0.
  if (endValue < 10) return 0;

  // Calculate the number of digits in the end value.
  const digits = Math.floor(Math.log10(endValue)) + 1;

  // Return the smallest number with that many digits.
  return Math.pow(10, digits - 1);
}

interface AnimateNumberProps {
  start?: number;
  end: number;
  enableScrollSpy?: boolean;
  scrollSpyOnce?: boolean;
  suffix?: string;
  prefix?: string;
}

export function AnimateCountUp(props: AnimateNumberProps) {
  const { ref, inView } = useInView({
    triggerOnce: props.scrollSpyOnce, // Only trigger once
    threshold: 0.5 // Trigger when 30% of the component is in view
  });
  return (
    <AnimateNumber
      transition={{ duration: 1 }}
      prefix={props.prefix}
      suffix={props.suffix}
      ref={ref}
    >
      {props.enableScrollSpy
        ? inView
          ? props.end
          : (props.start ?? getCountingStartValue(props.end))
        : props.end}
    </AnimateNumber>
  );
}
