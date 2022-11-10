/**
 * Entry application component used to compose providers and render Routes.
 * */

import "antd/dist/antd.css";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen } from "../_metronic/layout";
import AuthInit from "./modules/Auth/redux/AuthInit";

export default function App({ store, basename }) {
  return (
    /* Provide Redux store */

    <Provider store={store}>
      {/* Asynchronously persist redux stores and show `SplashScreen` while it's loading. */}
      {/* <PersistGate persistor={persistor} loading={<LayoutSplashScreen />}> */}
      {/* Add high level `Suspense` in case if was not handled inside the React tree. */}
      <React.Suspense fallback={<LayoutSplashScreen />}>
        {/* Override `basename` (e.g: `homepage` in `package.json`) */}
        <HashRouter basename={basename}>
          {/*This library only returns the location that has been active before the recent location change in the current window lifetime.*/}

          {/* Provide `react-intl` context synchronized with Redux state.  */}
          <I18nProvider>
            {/* Render routes with provided `Layout`. */}
            <AuthInit>
              <Toaster />
              <Routes />
            </AuthInit>
          </I18nProvider>
        </HashRouter>
      </React.Suspense>
      {/* </PersistGate> */}
    </Provider>
  );
}
