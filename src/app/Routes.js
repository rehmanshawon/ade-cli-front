/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { AuthPage } from "./modules/Auth";
import ErrorsPage from "./modules/ErrorsExamples/ErrorsPage";

export function Routes() {
  const { authToken } = useSelector((state) => state.auth, shallowEqual);

  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.user != null,
    }),
    shallowEqual
  );

  console.log({ isAuthorized });

  // const { isAuthorized } = useSelector(
  //   (state) => ({
  //     isAuthorized: state.auth != null,
  //   }),
  //   shallowEqual
  // );

  return (
    <Switch>
      {!isAuthorized ? (
        /*Render auth page when user at `/auth` and not authorized.*/
        <Route>
          <AuthPage />
        </Route>
      ) : (
        /*Otherwise redirect to root page (`/`)*/
        <Redirect from="/auth" to="/" />
      )}

      <Route path="/error" component={ErrorsPage} />

      {!isAuthorized ? (
        /*Redirect to `/auth` when user is not authorized*/
        <Redirect to="/auth/login" />
      ) : (
        <Layout>
          <BasePage />
        </Layout>
      )}
    </Switch>
  );
}
