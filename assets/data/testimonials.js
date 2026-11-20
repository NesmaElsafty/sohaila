/** Testimonial screenshots — original assets from PDF pages 19–25. No fabricated transcripts. */
window.SOHAILA_TESTIMONIALS = Array.from({ length: 52 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  const page = 19 + Math.floor(i / 8);
  return {
    id: `testimonial-${n}`,
    src: `assets/images/testimonials/testimonial-${n}.png`,
    alt: `Original testimonial screenshot ${n} (portfolio page ${Math.min(page, 25)})`,
    caption: `Testimonial ${n}`,
    category: "all",
  };
});
