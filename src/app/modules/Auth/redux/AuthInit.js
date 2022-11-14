import jwtDecode from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import { getModuleList, getUserByToken } from "./authCrud";
import * as auth from "./authRedux";

function AuthInit(props) {
  const didRequest = useRef(false);
  const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { authToken } = useSelector(
    ({ auth }) => ({
      authToken: auth.authToken,
    }),
    shallowEqual
  );

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          const { data } = await getUserByToken();

          if (data.success) {
            localStorage.setItem(
              "user",
              JSON.stringify(data?.data?.sys_users[0])
            );
            dispatch(props.fulfillUser(data?.data?.sys_users[0]));
          }
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
    if (authToken) {
      requestUser();
      localStorage.setItem("AUTH", authToken);
      setShowSplashScreen(false);

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
