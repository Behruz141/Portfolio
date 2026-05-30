import { useState } from "react";
// Import yo'li logotip qayerda turganiga qarab farq qilishi mumkin.
import { useTheme } from "../theme/theme-settings/useTheme";

const SIZES = {
  sm: { box: 32, font: 15, name: 14, gap: 8 },
  md: { box: 48, font: 24, name: 20, gap: 12 },
  lg: { box: 64, font: 32, name: 26, gap: 16 },
};

export default function PortfolioLogo({ size = "md" }) {
  const [hovered, setHovered] = useState(false);

  // Temani logotipning o'ziga chaqirib olamiz
  const theme = useTheme();
  const dark = theme?.dark ?? false;

  const s = SIZES[size] || SIZES.md;

  return (
    <>
      {/* 425px dan kichik ekranda matnni yashirish uchun CSS */}
      <style>
        {`
          @media (max-width: 425px) {
            .portfolio-text-container {
              display: none !important;
            }
          }
        `}
      </style>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: s.gap,
          cursor: "pointer",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Icon */}
        <div
          style={{
            width: s.box,
            height: s.box,
            borderRadius: hovered ? s.box * 0.35 : s.box * 0.25,
            background: dark ? "#18181b" : "#18181b",
            border: "0.5px solid rgba(255,255,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
          }}
        >
          {/* Dots */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 2,
              padding: s.box * 0.12,
              opacity: 0.25,
            }}
          >
            {Array(9)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: s.box * 0.1,
                    height: s.box * 0.1,
                    borderRadius: "50%",
                    background: "white",
                    margin: "auto",
                  }}
                />
              ))}
          </div>
          {/* Letter */}
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 900,
              fontSize: s.font,
              color: "white",
              position: "relative",
              zIndex: 1,
              lineHeight: 1,
            }}
          >
            P
          </span>
          {/* Accent line */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              height: 3,
              width: hovered ? "100%" : "40%",
              background: "#f59e0b",
              transition: "width 0.4s ease",
            }}
          />
        </div>

        {/* Text */}
        <div
          className="portfolio-text-container" // Yashirish uchun klass qo'shildi
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            lineHeight: 1,
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: s.name,
              color: dark ? "white" : "#f59f0bab", // Darkda oq, Lightda qoramtir
              letterSpacing: "-0.03em",
            }}
          >
            Portfolio
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: dark ? "#f59f0bcc" : "#2b2823df", // Darkda sarg'ish, Lightda qoramtir
              opacity: hovered ? 1 : 0.65,
              transition: "opacity 0.3s",
            }}
          >
            Creative Work
          </span>
        </div>
      </div>
    </>
  );
}
