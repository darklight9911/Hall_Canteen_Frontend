import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
          color: "#1C1C1C",
          fontSize: 104,
          fontWeight: 900,
          letterSpacing: -6,
        }}
      >
        hc
      </div>
    ),
    { ...size }
  );
}
