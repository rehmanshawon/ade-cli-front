import React from "react";
import { toAbsoluteUrl } from "../../_helpers";

export function SplashScreen() {
  return (
    <>
      <div className="splash-screen">
        <img
          src={toAbsoluteUrl("/media/logos/logo-mini-md.png")}
          alt="Metronic logo"
        />
      </div>
    </>
  );
}
