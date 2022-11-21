import React, { Fragment, Suspense } from "react";
import { Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { SplashScreen } from "../../../_metronic/_partials/controls";
import GridBase from "./GridBase";

const data = [
  {
    link: "/Employe/masterdata/:type",
  },
  {
    link: "/Employe/masterdata/:type",
  },
];

export default function MasterGridPages() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        {data.map((item, i) => (
          <Fragment key={i}>
            <ContentRoute path={item.link} component={GridBase} />
          </Fragment>
        ))}
      </Switch>
    </Suspense>
  );
}
