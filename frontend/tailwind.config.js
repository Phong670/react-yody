/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      indigo: "#6610f2",
      purple: "#6f42c1",
      pink: "#e83e8c",
      red: "#dc3545",
      orange: "#fd7e14",
      yellow: "#ffc107",
      green: "#28a745",
      teal: "#20c997",
      cyan: "#17a2b8",
      white: "#fff",
      gray: "#6c757d",
      primary: "#007bff",
      secondary: "#6c757d",
      success: "#28a745",
      info: "#17a2b8",
      warning: "#ffc107",
      danger: "#dc3545",
      light: "#f8f9fa",
      dark: "#343a40",
    },
    // --breakpoint-xs: 0;
    // --breakpoint-sm: 576px;
    // --breakpoint-md: 768px;
    // --breakpoint-lg: 992px;
    // --breakpoint-xl: 1200px;

    screens: {
      xxs: "0",
      xs: "300px",
      sm: "620px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [],
};
