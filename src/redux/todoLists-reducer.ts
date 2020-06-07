import {api} from "../api/api";
import {TaskType, TodoType} from "../types/types";
import {Dispatch} from "redux";

const ADD_TODOLIST = 'todoList/Reducer/ADD_TODOLIST';
const ADD_TASK = 'todoList/Reducer/ADD_TASK';
const UPDATE_TASK = 'todoList/Reducer/UPDATE_TASK';
const DELETE_TASK = 'todoList/Reducer/DELETE_TASK';
const SET_TASKS = 'todoList/Reducer/SET_TASKS';
const DELETE_TODOLIST = 'todoList/Reducer/DELETE_TODOLIST';
const SET_TODOLISTS = 'todoList/Reducer/SET_TODOLISTS';
const UPDATE_TODOLIST = 'todoList/Reducer/UPDATE_TODOLIST';

type InitialStateType = typeof initialState;

const initialState = {
    todoLists: [] as Array<TodoType>
};

const todoListsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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


// ActionCreators
type SetTasksSuccessType = {
    type: typeof SET_TASKS
    tasks: Array<TaskType>
    todoListId: string
}
const setTasksSuccess = (tasks: Array<TaskType>, todoListId: string): SetTasksSuccessType => ({type: SET_TASKS, tasks, todoListId});
type SetTodoListsSuccessType = {
    type: typeof SET_TODOLISTS
    todoLists: Array<TodoType>
}
export const setTodoListsSuccess = (todoLists: Array<TodoType>): SetTodoListsSuccessType  => ({type:SET_TODOLISTS, todoLists});
type AddTodoListSuccessType = {
    type: typeof ADD_TODOLIST
    newTodoList: TodoType
}
export const addTodoListSuccess  = (newTodoList: TodoType): AddTodoListSuccessType => ({type:ADD_TODOLIST, newTodoList});
type DeleteTodoListSuccessType = {
    type: typeof DELETE_TODOLIST
    todoListId: string
}
const deleteTodoListSuccess  = (todoListId: string): DeleteTodoListSuccessType => ({type:DELETE_TODOLIST, todoListId});
type AddTaskSuccessType = {
    type: typeof ADD_TASK
    newTask: TaskType
}
export const addTaskSuccess  = (newTask: TaskType): AddTaskSuccessType => ({type:ADD_TASK, newTask});
type UpdateTaskSuccessType = {
    type : typeof UPDATE_TASK
    taskId: string
    obj: TaskType
    todoListId: string
}
const updateTaskSuccess  = (taskId: string, todoListId: string, obj: TaskType): UpdateTaskSuccessType => ({type:UPDATE_TASK, taskId, obj, todoListId});
type DeleteTaskSuccessType = {
    type: typeof DELETE_TASK
    taskId: string
    todoListId: string
}
const deleteTaskSuccess  = (taskId: string, todoListId: string): DeleteTaskSuccessType => ({type:DELETE_TASK, taskId, todoListId});
type UpdateTodoListSuccessType = {
    type: typeof UPDATE_TODOLIST
    todoListId: string
    newTitle: string
}
const updateTodoListSuccess  = (todoListId: string, newTitle: string):UpdateTodoListSuccessType  => ({type:UPDATE_TODOLIST, todoListId, newTitle});

type ActionsType = SetTasksSuccessType | SetTodoListsSuccessType | AddTodoListSuccessType | DeleteTodoListSuccessType
    | AddTaskSuccessType | UpdateTaskSuccessType | DeleteTaskSuccessType | UpdateTodoListSuccessType;


// ThunkCreators
export const getTasksThunk = (todoListId: string) => (dispatch: Dispatch <ActionsType>) => {
    api.getTasks(todoListId)
        .then(response => {
            if (!response.data.error){
                dispatch(setTasksSuccess(response.data.items, todoListId));
            }
        })
};

export const changeTaskThunk = (todoListId: string, taskId: string, obj: TaskType) => (dispatch: Dispatch <ActionsType>) => {
    api.changeTask(todoListId, taskId, obj)
        .then(response => {
            if (response.data.resultCode === 0){
                dispatch(updateTaskSuccess(taskId, todoListId, obj));
            }
        })
};

export const deleteTaskThunk = (todoListId: string, taskId: string) => (dispatch: Dispatch <ActionsType>) => {
    api.deleteTask(todoListId, taskId)
        .then( response => {
            if (response.data.resultCode === 0){
                dispatch(deleteTaskSuccess(taskId, todoListId))
            }
        })
};

export const addTaskThunk = (todoListId: string, newTitle: string) => (dispatch: Dispatch <ActionsType>) => {
    api.addTask(todoListId, newTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTaskSuccess(response.data.data.item))
            }
        })
};

export const deleteTodoListThunk = (todoListId: string) => (dispatch: Dispatch <ActionsType>) => {
    api.deleteTodoList(todoListId)
        .then( response => {
            if (response.data.resultCode === 0){
                dispatch(deleteTodoListSuccess(todoListId))
            }
        })
};

export const changeTodoListThunk = (todoListId: string, newTitle: string) => (dispatch: Dispatch <ActionsType>) => {
    api.changeTodoList(todoListId, newTitle)
        .then( response => {
            if (response.data.resultCode === 0){
                dispatch(updateTodoListSuccess(todoListId, newTitle))
            }
        })
};

export const getTodoListsThunk = () => (dispatch: Dispatch <ActionsType>) => {
    api.getTodoLists()
        .then(response => {
            dispatch(setTodoListsSuccess(response.data))
        })
};

export const addTodoListThunk = (newTitle: string) => (dispatch: Dispatch <ActionsType>) => {
    api.addTodoList(newTitle)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(addTodoListSuccess(response.data.data.item));
            }
        })
};

export default todoListsReducer;