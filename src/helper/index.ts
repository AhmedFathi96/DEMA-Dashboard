import { useSelector } from "react-redux";
import { ensureState, OptimisticState } from "redux-optimistic-ui";
import { IRootReducerState } from "../React-Redux/Reducers";

export const useSelect = <TSelected>(
    selector: (
        state: IRootReducerState
    ) => OptimisticState<TSelected> | TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
    ) =>
    ensureState(
        useSelector<IRootReducerState, OptimisticState<TSelected> | TSelected>(
        selector,
        equalityFn as any
        )
);


export const selectToken = (state: IRootReducerState) => state.authReducer.token
