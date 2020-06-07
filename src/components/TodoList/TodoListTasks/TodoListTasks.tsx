import React from 'react';
import '../../../App.css';
import TodoListTask from './TodoListTask/TodoListTask';
import {TaskType} from "../../../types/types";

type OwnPropsType = {
    changeStatus: (task: TaskType, status: boolean) => void
    changeTitle: (task: TaskType, title: string) => void
    tasks: Array<TaskType>
    deleteTask: (taskId: string) => void
}

class TodoListTasks extends React.Component<OwnPropsType> {
    render = () => {
        let tasksElements = this.props.tasks.map((task) => {
            return <TodoListTask task = {task}
                                 key = {task.id}
                                 changeTitle = {this.props.changeTitle}
                                 changeStatus = {this.props.changeStatus}
                                 deleteTask = {this.props.deleteTask} />});
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

