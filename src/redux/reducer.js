import {api} from "../api/api";

const ADD_TODOLIST = 'todoList/Reducer/ADD_TODOLIST';
const ADD_TASK = 'todoList/Reducer/ADD_TASK';
const UPDATE_TASK = 'todoList/Reducer/UPDATE_TASK';
const DELETE_TASK = 'todoList/Reducer/DELETE_TASK';
const SET_TASKS = 'todoList/Reducer/SET_TASKS';
const DELETE_TODOLIST = 'todoList/Reducer/DELETE_TODOLIST';
const SET_TODOLISTS = 'todoList/Reducer/SET_TODOLISTS';
const UPDATE_TODOLIST = 'todoList/Reducer/UPDATE_TODOLIST';

const initialState = {
    todoLists: []
};

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST:
            let newTodoList = {...action.newTodoList, tasks: []};
            return {
                ...state,
                todoLists: [...state.todoLists, newTodoList]
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
                    if (tl.id === action.newTask.todoListId){
                        return {...tl, tasks: [...tl.tasks, action.newTask] }
                    } else {
                        return tl;
                    }
                } )
            };
        case UPDATE_TASK:
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
        case SET_TODOLISTS:
            return {
                ...state,
                todoLists: action.todoLists.map( tl => ({...tl, tasks:[] }))
            };
        case SET_TASKS:
            return {
                ...state,
                todoLists: state.todoLists.map(todo => {
                    if (todo.id !== action.todoListId){
                        return todo;
                    } else {
                        return {...todo, tasks: action.tasks}
                    }
                    })

            };
        case UPDATE_TODOLIST:
            return {
                ...state,
                todoLists: state.todoLists.map(tl => {
                    if (tl.id === action.todoListId) {
                        return {...tl, title: action.newTitle}
                    } else return tl
                })
            };
        default:
            return state;
    }
};

const setTasks = (tasks, todoListId) => ({type: SET_TASKS, tasks, todoListId});
export const setTodoLists = (todoLists) => ({type:SET_TODOLISTS, todoLists});
export const addTodoList  = (newTodoList) => ({type:ADD_TODOLIST, newTodoList});
const deleteTodoList  = (todoListId) => ({type:DELETE_TODOLIST, todoListId});
export const addTask  = (newTask) => ({type:ADD_TASK, newTask});
const updateTask  = (taskId, todoListId, obj) => ({type:UPDATE_TASK, taskId, obj, todoListId});
const deleteTask  = (taskId, todoListId) => ({type:DELETE_TASK, taskId, todoListId});
const updateTodoList  = (todoListId, newTitle) => ({type:UPDATE_TODOLIST, todoListId, newTitle});

export const loadTasksThunk = (todoListId) => (dispatch) => {
    api.getTasks(todoListId)
        .then(response => {
            if (!response.data.error){
                dispatch(setTasks(response.data.items, todoListId));
            }
        })
};

export const changeTaskThunk = (todoListId, taskId, obj) => (dispatch) => {
    api.changeTask(todoListId, taskId, obj)
        .then(response => {
            if (response.data.resultCode === 0){
                dispatch(updateTask(taskId, todoListId, obj));
            }
        })
};

export const deleteTaskThunk = (todoListId, taskId) => (dispatch) => {
    api.deleteTask(todoListId, taskId)
        .then( response => {
            if (response.data.resultCode === 0){
                dispatch(deleteTask(taskId, todoListId))
            }
        })
};

export const addTaskThunk = (todoListId, newTitle) => (dispatch) => {
    api.addTask(todoListId, newTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTask(response.data.data.item))
            }
        })
};

export const deleteTodoListThunk = (todoListId) => (dispatch) => {
    api.deleteTodoList(todoListId)
        .then( response => {
            if (response.data.resultCode === 0){
                dispatch(deleteTodoList(todoListId))
            }
        })
};

export const changeTodoListThunk = (todoListId, newTitle) => (dispatch) => {
    api.changeTodoList(todoListId, newTitle)
        .then( response => {
            if (response.data.resultCode === 0){
                dispatch(updateTodoList(todoListId, newTitle))
            }
        })
};

export const getTodoListsThunk = () => (dispatch) => {
    api.getTodoLists()
        .then(response => {
            dispatch(setTodoLists(response.data))
        })
};

export const addTodoListThunk = (title) => (dispatch) => {
    api.addTodoList(title)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodoList(response.data.data.item));
            }
        })
};

export default Reducer;