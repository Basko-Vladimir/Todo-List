import axios from "axios";
import {TaskType, TodoType} from "../types/types";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers:{'API-KEY': 'c2812a99-b1c5-4f1a-b023-99177b7645a3'}
});

type CommonResponseType<myType> = {
    resultCode: number
    messages: Array<string>,
    data: myType
}

type getTasksResponseType = {
    items: Array<TaskType>
    totalCount?: number
    error?: string
}

export const api = {
    changeTask(todoListId: string, taskId: string, task: TaskType){
        return instance.put<CommonResponseType <{}> >(`${todoListId}/tasks/${taskId}`, task)
    },

    deleteTask(todoListId: string, taskId: string){
        return instance.delete<CommonResponseType <{}> >(`${todoListId}/tasks/${taskId}`)
    },

    getTasks(todoListId: string){
        return instance.get<getTasksResponseType>(`${todoListId}/tasks`)
    },

   addTask(todoListId: string, newText: string){
        return instance.post<CommonResponseType <{item: TaskType}> >(`${todoListId}/tasks`, {title: newText})
   },

   deleteTodoList(todoListId: string){
        return instance.delete<CommonResponseType <{}> >(`${todoListId}`)
   },

    getTodoLists(){
        return instance.get<Array<TodoType>>('')
    },

    addTodoList(title: string){
        return instance.post('', {title})
    },

    changeTodoList(todoListId: string, newTitle: string){
        return instance.put<CommonResponseType <{}> >(`${todoListId}`, {title:newTitle})
    }
};

