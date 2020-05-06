const ADD_TODOLIST = 'todoList/Reducer/ADD_TODOLIST';
const ADD_TASK = 'todoList/Reducer/ADD_TASK';
const CHANGE_TASK = 'todoList/Reducer/CHANGE_TASK';
const DELETE_TASK = 'todoList/Reducer/DELETE_TASK';
const DELETE_TODOLIST = 'todoList/Reducer/DELETE_TODOLIST';

const initialState = {
    todoLists: []
};

const Reducer = (state = initialState, action) => {
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

export const addTodoList  = (newTodoList) => ({type:ADD_TODOLIST, newTodoList});
export const deleteTodoList  = (todoListId) => ({type:DELETE_TODOLIST, todoListId});
export const addTask  = (newTask, todoListId) => ({type:ADD_TASK, newTask, todoListId});
export const changeTask  = (taskId, obj, todoListId) => ({type:CHANGE_TASK, taskId, obj, todoListId});
export const deleteTask  = (taskId, todoListId) => ({type:DELETE_TASK, taskId, todoListId});

export default Reducer;