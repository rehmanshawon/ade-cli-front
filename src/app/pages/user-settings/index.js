import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { SplashScreen } from "../../../_metronic/_partials/controls";
import UserFeature from "./UserFeature";

export default function UserSettingsPage() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        {
          <Redirect
            exact
            from="/user-setting"
            to="/user-setting/user-feature"
          />
        }
        <ContentRoute path="/user-setting" component={UserFeature} />
      </Switch>
    </Suspense>
  );
}
