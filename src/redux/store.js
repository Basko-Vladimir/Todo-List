import {createStore} from "redux";

const ADD_TODOLIST = 'ADD_TODOLIST';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK = 'CHANGE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const DELETE_TODOLIST = 'DELETE_TODOLIST';

const initialState = {
    todoLists: [
        {id: 0, title: 'aaaaaaa', tasks:[{title: 'html', isDone: false, priority: 'low', id: 0}] },
        {id: 1, title: 'bbbbbbbb', tasks: [{title: 'css', isDone: true, priority: 'middle', id: 1}] },
        {id: 2, title: 'ccccccc', tasks:[{title: 'JS', isDone: false, priority: 'high', id: 2}] }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [...state.todoLists, action.newTodoList]
            };
        case DELETE_TODOLIST:
            return{
                ...state,
                todoLists: [...state.todoLists.filter( tl => tl.id !== action.todoListId)]
            };
        case ADD_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map( tl => {
                    if (tl.id === action.todoListId){
                        return {...tl, tasks: [...tl.tasks, action.newTask] }
                    } else {
                        return tl;
                    }
                } )
            };
        case CHANGE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map( tl => {
                    if (tl.id === action.todoListId){
                        return {...tl, tasks: [...tl.tasks.map( task => {
                                if (task.id !== action.taskId) {
                                    return task;
                                } else {
                                    return {...task, ...action.obj}
                                }
                            })] }
                    } else {
                        return tl;
                    }
                } )
            };
        case DELETE_TASK:
            return{
                ...state,
                todoLists: [...state.todoLists.map(tl => {
                    if (tl.id !== action.todoListId) {
                        return tl;
                    } else {
                        return {...tl, tasks: [...tl.tasks.filter( task => {
                                return task.id !== action.taskId
                            })]}
                    }
                })]
            };
        default:
            return state;
    }
};

const store = createStore(reducer);

export default store;

