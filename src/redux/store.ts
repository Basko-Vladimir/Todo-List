import {applyMiddleware, combineReducers, createStore} from "redux";
import todoListsReducer from "./todoLists-reducer";
import thunkMiddleWare from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducers = combineReducers({
    todoLists: todoListsReducer
});

type RootReducersType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducersType>

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunkMiddleWare)));
export default store;

