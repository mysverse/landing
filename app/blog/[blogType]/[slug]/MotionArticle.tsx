"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { motion } from "motion/react";

export default function MotionArticle(props: PropsWithChildren) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  // Handle Ghost CMS toggle cards
  useEffect(() => {
    // Query all elements with the class "kg-toggle-card"
    const toggleCards = document.querySelectorAll(".kg-toggle-card");

    // Define the click handler
    const handleToggle = (event: Event) => {
      const card = event.currentTarget as HTMLElement;
      const currentState = card.getAttribute("data-kg-toggle-state");
      const newState = currentState === "open" ? "close" : "open";
      card.setAttribute("data-kg-toggle-state", newState);
    };

    // Attach the event listener to each card
    toggleCards.forEach((card) => {
      card.addEventListener("click", handleToggle);
    });

    // Cleanup the event listeners when the component unmounts or htmlContent changes
    return () => {
      toggleCards.forEach((card) => {
        card.removeEventListener("click", handleToggle);
      });
    };
  }, [props.children]); // Re-run effect if the external HTML changes

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
