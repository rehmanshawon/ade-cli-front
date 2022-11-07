import React from "react";
import { MixedWidget1, StatsWidget11, StatsWidget12 } from "../widgets";
export function Demo1Dashboard() {
  return (
    <>
      <div className="row">
        <div className="col-lg-6 col-xxl-5">
          <MixedWidget1 className="card-stretch gutter-b" />
        </div>

        <div className="col-lg-6 col-xxl-7">
          <StatsWidget11 className="card-stretch card-stretch-half gutter-b" />
          <StatsWidget12 className="card-stretch card-stretch-half gutter-b" />
        </div>
      </div>
    </>
  );
}
