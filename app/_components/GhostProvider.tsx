"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";

export default function GhostProvider(props: PropsWithChildren) {
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
      const card = event.currentTarget;
      if (card && card instanceof HTMLElement) {
        const currentState = card.getAttribute("data-kg-toggle-state");
        const newState = currentState === "open" ? "close" : "open";
        card.setAttribute("data-kg-toggle-state", newState);
      }
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

  return props.children;
}
