import React, { useState, useEffect } from "react";

// Custom hook for dismissable banner
export default function useDismissableBanner(bannerId: string) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Asynchronously check if the banner was previously dismissed
    const loadDismissState = async () => {
      const dismissed = localStorage.getItem(bannerId) === "dismissed";
      setIsVisible(!dismissed);
      setIsLoading(false); // Set loading to false after state is set
    };

    loadDismissState();
  }, [bannerId]);

  // Function to dismiss the banner
  const dismissBanner = () => {
    localStorage.setItem(bannerId, "dismissed");
    setIsVisible(false);
  };

  return { isVisible, isLoading, dismissBanner };
}
