"use client";

import CountUp from "react-countup";

function getCountingStartValue(endValue: number): number {
  return endValue - 1000;
  // For very small numbers, you might want to just start at 0.
  // if (endValue < 10) return 0;

  // // Calculate the number of digits in the end value.
  // const digits = Math.floor(Math.log10(endValue)) + 1;

  // // Return the smallest number with that many digits.
  // return Math.pow(10, digits - 1);
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
  const startValue =
    props.start !== undefined ? props.start : getCountingStartValue(props.end);

  return (
    <CountUp
      // If scroll spy is enabled, start from the calculated start value;
      // otherwise, display the end value immediately by using a duration of 0.
      start={props.enableScrollSpy ? startValue : props.end}
      end={props.end}
      duration={props.enableScrollSpy ? 2 : 0}
      prefix={props.prefix}
      suffix={props.suffix}
      enableScrollSpy={props.enableScrollSpy}
      scrollSpyOnce={props.scrollSpyOnce}
    >
      {({ countUpRef }) => <span ref={countUpRef} />}
    </CountUp>
  );
}

// import { AnimateNumber } from "motion-plus-react";
// import { useInView } from "react-intersection-observer";

// function getCountingStartValue(endValue: number): number {
//   // For very small numbers, you might want to just start at 0.
//   if (endValue < 10) return 0;

//   // Calculate the number of digits in the end value.
//   const digits = Math.floor(Math.log10(endValue)) + 1;

//   // Return the smallest number with that many digits.
//   return Math.pow(10, digits - 1);
// }

// interface AnimateNumberProps {
//   start?: number;
//   end: number;
//   enableScrollSpy?: boolean;
//   scrollSpyOnce?: boolean;
//   suffix?: string;
//   prefix?: string;
// }

// export function AnimateCountUp(props: AnimateNumberProps) {
//   const { ref, inView } = useInView({
//     triggerOnce: props.scrollSpyOnce, // Only trigger once
//     threshold: 0.5 // Trigger when 30% of the component is in view
//   });
//   return (
//     <AnimateNumber
//       transition={{ duration: 1 }}
//       prefix={props.prefix}
//       suffix={props.suffix}
//       ref={ref}
//     >
//       {props.enableScrollSpy
//         ? inView
//           ? props.end
//           : (props.start ?? getCountingStartValue(props.end))
//         : props.end}
//     </AnimateNumber>
//   );
// }
