import React, { ChangeEvent } from 'react';
import '../../../../App.css';
import {TaskType} from '../../../../types/types';

type OwnPropsType = {
    changeStatus: (task: TaskType, status: boolean) => void
    changeTitle: (task: TaskType, title: string) => void
    task: TaskType
    deleteTask: (taskId: string) => void
}

type LocalStateType = {
    editMode: boolean
    title: string
}

class TodoListTask extends React.Component<OwnPropsType, LocalStateType> {
    state = {
        editMode: false,
        title: this.props.task.title
    };

    onChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.changeStatus(this.props.task, event.currentTarget.checked);
    };

    onTitleChanged = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            title: event.currentTarget.value
        })
    };

    activeEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task, this.state.title)
    };

    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };

    render = () => {
        let isDone =  this.props.task.status === 2;
        return (
                <div className={isDone ? `todoList-task done` : `todoList-task`}>
                    <input type='checkbox' checked={isDone}
                           onChange={this.onChangeStatus}/>
                    { this.state.editMode
                        ? <input autoFocus={true}
                                 onChange={this.onTitleChanged}
                                 value={this.state.title}
                                 onBlur={this.deactivateEditMode}/>
                        : <span onClick={this.activeEditMode}>{`${this.props.task.title}`}, priority: {this.props.task.priority}</span>
                    }   <button onClick={this.onDeleteTask}>Delete</button>
                </div>
        );
    }
}

export default TodoListTask;

