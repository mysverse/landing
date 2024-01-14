"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import BookCal from "public/img/book_us_with_cal_com.svg";

export default function CalButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  return (
    <button
      data-cal-link="yan3321/ventures"
      data-cal-config='{"layout":"month_view"}'
    >
      <BookCal className="pointer-events-none" />
    </button>
  );
}
