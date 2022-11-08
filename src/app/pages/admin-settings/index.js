import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { SplashScreen } from "../../../_metronic/_partials/controls";
import Menus from "./menus";
import Modules from "./modules";

export default function AdminSettingsPages() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        {<Redirect exact from="/admin-settings" to="/admin-settings/modules" />}
        <ContentRoute path="/admin-settings/modules" component={Modules} />
        <ContentRoute path="/admin-settings/menu-list" component={Menus} />
      </Switch>
    </Suspense>
  );
}
