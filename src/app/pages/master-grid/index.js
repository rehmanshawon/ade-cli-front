import React, { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { SplashScreen } from "../../../_metronic/_partials/controls";
import GridBase from "./GridBase";

export default function MasterGridPages() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        <ContentRoute path="*/masterdata/:type" component={GridBase} />
      </Switch>
    </Suspense>
  );
}
