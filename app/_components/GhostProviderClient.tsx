"use client";

import type { PropsWithChildren } from "react";
import { useEffect } from "react";

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function handleToggle(event: Event) {
  const card = event.currentTarget;
  if (card && card instanceof HTMLElement) {
    const currentState = card.getAttribute("data-kg-toggle-state");
    const newState = currentState === "open" ? "close" : "open";
    card.setAttribute("data-kg-toggle-state", newState);
  }
}

export default function GhostProviderClient(props: PropsWithChildren) {
  useEffect(() => {
    scrollToTop();
  });
  // Handle Ghost CMS toggle cards
  useEffect(() => {
    // Query all elements with the class "kg-toggle-card"
    const toggleCards = document.querySelectorAll(".kg-toggle-card");

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
