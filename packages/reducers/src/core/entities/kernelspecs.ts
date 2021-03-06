import * as Immutable from "immutable";
import { Action } from "redux";
import { combineReducers } from "redux-immutable";

import * as actionTypes from "@nteract/actions";
import {
  KernelspecProps,
  makeKernelspec,
  makeKernelspecsByRefRecord,
  makeKernelspecsRecord
} from "@nteract/types";

const byRef = (state = Immutable.Map(), action: Action) => {
  const typedAction = action as actionTypes.FetchKernelspecsFulfilled;
  switch (action.type) {
    case actionTypes.FETCH_KERNELSPECS_FULFILLED:
      return state.set(
        typedAction.payload.kernelspecsRef,
        makeKernelspecsByRefRecord({
          hostRef: typedAction.payload.hostRef,
          defaultKernelName: typedAction.payload.defaultKernelName,
          byName: Immutable.Map(
            Object.keys(typedAction.payload.kernelspecs).reduce((r: any, k) => {
              r[k] = makeKernelspec(typedAction.payload.kernelspecs[k]);
              return r;
            }, {})
          )
        })
      );
    default:
      return state;
  }
};

const refs = (state = Immutable.List(), action: Action) => {
  let typedAction;
  switch (action.type) {
    case actionTypes.FETCH_KERNELSPECS_FULFILLED:
      typedAction = action as actionTypes.FetchKernelspecsFulfilled;
      return state.includes(typedAction.payload.kernelspecsRef)
        ? state
        : state.push(typedAction.payload.kernelspecsRef);
    default:
      return state;
  }
};

export const kernelspecs = combineReducers(
  { byRef, refs },
  makeKernelspecsRecord as any
);
