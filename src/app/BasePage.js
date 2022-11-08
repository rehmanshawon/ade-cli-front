import React, { lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../_metronic/layout";
import AllDashboardPages from "./pages/dashboard";

export default function BasePage() {
  // console.log(userRole);

  // pages lists
  const UserSettingsPage = lazy(() => import("./pages/user-settings"));
  const UserRolePage = lazy(() => import("./pages/users"));

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* {<Redirect exact from="/" to="/dashboard" />} */}
        <Redirect exact from="/" to="/dashboard" />

        <Route path="/dashboard" component={AllDashboardPages} />
        <Route path="/user-setting" component={UserSettingsPage} />
        <Route path="/users" component={UserRolePage} />

        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
