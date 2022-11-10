import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";
import { getUserByToken } from "./authCrud";

export const actionTypes = {
  Login: "[Login] Action",
  Logout: "[Logout] Action",
  Register: "[Register] Action",
  UserRequested: "[Request User] Action",
  UserLoaded: "[Load User] Auth API",
  ModulesLoaded: "[Load Modules] Auth API",
  MenuesLoaded: "[Load Menues] Auth API",
  SetUser: "[Set User] Action",
  SetMenuType: "[Set Menu Type] Action",
};

const initialAuthState = {
  user: undefined,
  authToken: undefined,
  modules: undefined,
  menuType: undefined,
  menu: [],
};

export const reducer = persistReducer(
  { storage, key: "unitoken", whitelist: ["authToken"] },
  (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.Login: {
        const { authToken } = action.payload;

        return { authToken, user: undefined };
      }

      //   case actionTypes.Register: {
      //     const { authToken } = action.payload;

      //     return { authToken, user: undefined };
      //   }

      case actionTypes.Logout: {
        // TODO: Change this code. Actions in reducer aren't allowed.
        return initialAuthState;
      }

      case actionTypes.UserLoaded: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.ModulesLoaded: {
        const { modules } = action.payload;
        return { ...state, modules };
      }

      case actionTypes.SetUser: {
        const { user } = action.payload;
        return { ...state, user };
      }

      case actionTypes.MenuesLoaded: {
        const { menu } = action.payload;
        return { ...state, menu };
      }

      case actionTypes.SetMenuType: {
        const { menuType } = action.payload;
        return { ...state, menuType };
      }

      default:
        return state;
    }
  }
);

export const actions = {
  login: (authToken) => ({ type: actionTypes.Login, payload: { authToken } }),
  //   register: (authToken) => ({
  //     type: actionTypes.Register,
  //     payload: { authToken },
  //   }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: (user) => ({
    type: actionTypes.UserRequested,
    payload: { user },
  }),
  fulfillUser: (user) => ({ type: actionTypes.UserLoaded, payload: { user } }),
  modules: (modules) => ({
    type: actionTypes.ModulesLoaded,
    payload: { modules },
  }),
  menu: (menu) => ({
    type: actionTypes.MenuesLoaded,
    payload: { menu },
  }),
  setUser: (user) => ({ type: actionTypes.SetUser, payload: { user } }),
  menuType: (menuType) => ({
    type: actionTypes.SetMenuType,
    payload: { menuType },
  }),
};

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser());
  });

  //   yield takeLatest(actionTypes.Register, function* registerSaga() {
  //     yield put(actions.requestUser());
  //   });

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data: user } = yield getUserByToken();

    yield put(actions.fulfillUser(user));
  });

  // yield takeLatest(actionTypes.SetMenuType, function* setMenuType() {
  //   const menuType =
  //     localStorage.getItem("menuType") &&
  //     JSON.parse(localStorage.getItem("menuType"));

  //   yield put(actions.setMenuType(menuType));
  // });
}
