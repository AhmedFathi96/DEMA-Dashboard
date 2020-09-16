import {createStore, applyMiddleware, Store} from 'redux'
import {rootReducer, IRootReducerState} from './Reducers/index';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './Saga';
import { persistStore, PersistPartial } from "redux-persist";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

export default () => {
    return new Promise<{ store: Store<IRootReducerState & PersistPartial> }>(
        res => {
        persistStore(store, {}, () => {
            res({ store } as { store: Store<IRootReducerState & PersistPartial> });
            sagaMiddleware.run(rootSaga);
        });
        }
    );
};

