import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { SplashScreen } from "../../../_metronic/_partials/controls";
import UserRoles from "./roles";
import UserFeature from "./UserFeature";
import { Users } from "./users";

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
        <ContentRoute
          exact
          path="/user-setting/user-feature"
          component={UserFeature}
        />
        <ContentRoute exact path="/user-setting/roles" component={UserRoles} />

        <ContentRoute exact path="/user-setting/users" component={Users} />
      </Switch>
    </Suspense>
  );
}
