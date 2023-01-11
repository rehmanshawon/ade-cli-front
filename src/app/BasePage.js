import React, { Fragment, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../_metronic/layout";
import AllDashboardPages from "./pages/dashboard";

export default function BasePage() {
  // console.log(userRole);

  // pages lists
  const UserSettingsPage = lazy(() => import("./pages/user-settings"));
  const UserRolePage = lazy(() => import("./pages/user-settings/roles"));
  const AdminSettingsPage = lazy(() => import("./pages/admin-settings"));
  const MasterGridPage = lazy(() => import("./pages/master-grid"));

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {/* {<Redirect exact from="/" to="/dashboard" />} */}
        <Route exact path="/dashboard" component={AllDashboardPages} />
        <Route path="/user-setting" component={UserSettingsPage} />
        <Route path="/admin-settings" component={AdminSettingsPage} />

        <Route path="*/masterdata" component={MasterGridPage} />

        {/* <Redirect to="error/error-v1" /> */}
      </Switch>
    </Suspense>
  );
}
