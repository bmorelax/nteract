import * as Immutable from "immutable";
import { Action } from "redux";
import { combineReducers } from "redux-immutable";

import * as actions from "@nteract/actions";
import {
  makeHostsRecord,
  makeJupyterHostRecord,
  makeLocalHostRecord
} from "@nteract/types";

const byRef = (state = Immutable.Map(), action: Action) => {
  let typedAction;
  switch (action.type) {
    case actions.ADD_HOST:
      typedAction = action as actions.AddHost;
      switch (typedAction.payload.host.type) {
        case "jupyter": {
          return state.set(
            typedAction.payload.hostRef,
            makeJupyterHostRecord(typedAction.payload.host)
          );
        }
        case "local": {
          return state.set(
            typedAction.payload.hostRef,
            makeLocalHostRecord(typedAction.payload.host)
          );
        }
        default:
          throw new Error(
            `Unrecognized host type "${typedAction.payload.host.type}".`
          );
      }
    default:
      return state;
  }
};

const refs = (state = Immutable.List(), action: Action) => {
  let typedAction;
  switch (action.type) {
    case actions.ADD_HOST:
      typedAction = action as actions.AddHost;
      return state.push(typedAction.payload.hostRef);
    default:
      return state;
  }
};

export const hosts = combineReducers({ byRef, refs }, makeHostsRecord as any);
