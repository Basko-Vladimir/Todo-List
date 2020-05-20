import * as axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers:{'API-KEY': 'c2812a99-b1c5-4f1a-b023-99177b7645a3'}
});

export const api = {
    changeTask(todoListId, taskId, task){
        return instance.put(`${todoListId}/tasks/${taskId}`, task)
            .then(response => response)
    },

    deleteTask(todoListId, taskId){
        return instance.delete(`${todoListId}/tasks/${taskId}`)
            .then(response => response)
    },

    getTasks(todoListId){
        return instance.get(`${todoListId}/tasks`)
            .then(response => response)
    },

   addTask(todoListId, newText){
        return instance.post(`${todoListId}/tasks`, {title: newText})
            .then(response => response)
   },

   deleteTodoList(todoListId){
        return instance.delete(`${todoListId}`)
            .then(response => response)
   },

    getTodoLists(){
        return instance.get()
            .then(response => response)
    },

    addTodoList(title){
        return instance.post(null, title)
    },

    changeTodoList(todoListId, newTitle){
        return instance.put(`${todoListId}`, {title:newTitle})
            .then(response => response)
    }


};

