/** Results tables and evidence gallery — values verbatim from PDF p.14 and screenshots p.16–18 */
window.SOHAILA_RESULTS = {
  highTicket: {
    title: "High-Ticket Business Scaling — Success Stories",
    subtitle: "Low-Ticket Funnels · Paid Acquisition · High-Ticket Offers",
    columns: ["Client", "Low-Ticket Price", "ROAS", "High-Ticket Offer", "Units Sold"],
    rows: [
      ["Sewar amer", "$249", "6.0×", "$2,500", "300"],
      ["Noha Elbatrawi", "$450", "3.5×", "$4,000", "100"],
      ["Dr. Islam Mohamed", "$97", "8.0×", "$1,500", "600"],
      ["Mohamed Roshdy", "$45", "4.8×", "$2,000", "200"],
    ],
  },
  medical: {
    title: "Medical Personal Branding & Clinic Growth",
    subtitle: "Patient Acquisition · Clinic Bookings · Social Media Conversion",
    columns: ["Client", "Monthly Bookings", "Inquiry-to-Booking Rate", "Monthly Clinic Visits"],
    rows: [
      ["Dr. Rami Saad", "420", "32%", "310"],
      ["Abdullah Shaheer", "350", "29%", "265"],
      ["Karim Sayed", "510", "36%", "390"],
      ["Nelly Shams", "285", "27%", "215"],
    ],
  },
  ecommerce: {
    title: "E-commerce & Consumer Brand Growth",
    subtitle: "Online Revenue · Monthly Orders · Return on Ad Spend",
    columns: ["Brand", "Monthly Revenue", "Monthly Orders", "ROAS"],
    rows: [
      ["Bioderma Egypt", "EGP 8.4M", "9,200", "6.3×"],
      ["Avène Egypt", "EGP 6.7M", "6,850", "5.8×"],
      ["Vabilla", "EGP 12.5M", "15,400", "6.7×"],
      ["NutraScience", "EGP 5.8M", "7,600", "5.4×"],
      ["TS Group", "EGP 5.3M", "6,950", "5.1×"],
    ],
  },
  evidence: Array.from({ length: 26 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      id: `result-${n}`,
      src: `assets/images/results/result-${n}.png`,
      alt: `Results evidence screenshot ${n} from original portfolio`,
      caption: `Results evidence ${n}`,
    };
  }),
};
