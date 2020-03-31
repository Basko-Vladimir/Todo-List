import React from 'react';
import './App.css';

class TodoListTask extends React.Component {

    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task, event.currentTarget.checked);
    };

    render = () => {
        return (
                <div className={this.props.task.isDone ? `todoList-task done` : `todoList-task`}>
                    <input type="checkbox" checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}/>
                    <span>{this.props.task.title}, priority: {this.props.task.priority}</span>
                </div>
        );
    }
}

export default TodoListTask;

