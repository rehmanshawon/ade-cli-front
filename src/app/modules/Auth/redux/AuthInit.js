import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { getModuleList } from "./authCrud";
import * as auth from "./authRedux";

function AuthInit(props) {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(false);
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken,
    }),
    shallowEqual
  );

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async (authToken) => {
      try {
        if (!didRequest.current) {
          // const { data: { user }, } = await getUserByToken();

          const { data } = await getModuleList();

          // JSON.stringify(localStorage.setItem("user", userData));

          dispatch(props.modules(data.data?.sys_modules));
        }
      } catch (error) {
        if (!didRequest.current) {
          dispatch(props.logout());
        }
      } finally {
        setShowSplashScreen(false);
      }

      return () => (didRequest.current = true);
    };
    // getModules();
    if (authToken) {
      requestUser(authToken);
      const userData = jwtDecode(authToken);
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(props.fulfillUser(userData));
      if (Object.keys(userData).length > 0) {
        localStorage.setItem("AUTH", authToken);

        setShowSplashScreen(false);
      } else {
        dispatch(props.logout());
        setShowSplashScreen(false);
      }
      return;
    } else {
      dispatch(props.fulfillUser(undefined));
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, [authToken]);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
}

export default connect(null, auth.actions)(AuthInit);
