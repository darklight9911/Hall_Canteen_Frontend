import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Brand favicon: yellow rounded square with dark "hc" (adapted Blinkit style).
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8CB46",
          borderRadius: 7,
          color: "#1C1C1C",
          fontSize: 19,
          fontWeight: 900,
          letterSpacing: -1,
        }}
      >
        hc
      </div>
    ),
    { ...size }
  );
}
