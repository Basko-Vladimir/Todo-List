import React from 'react';
import '../../../../App.css';

class TodoListTask extends React.Component {
    state = {
        editMode: false
    };

    onIsDoneChanged = (event) => {
        this.props.changeStatus(this.props.task.id, event.currentTarget.checked);
    };

    onTitleChanged = (event) => {
        this.props.changeTitle(this.props.task.id, event.currentTarget.value)
    };

    activeEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = () => {
        this.setState({editMode: false})
    };

    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };

    render = () => {
        return (
                <div className={this.props.task.isDone ? `todoList-task done` : `todoList-task`}>
                    <input type="checkbox" checked={this.props.task.isDone}
                           onChange={this.onIsDoneChanged}/>
                    { this.state.editMode
                        ? <input autoFocus={true}
                                 value={this.props.task.title}
                                 onBlur={this.deactivateEditMode}
                                 onChange={this.onTitleChanged}/>
                        : <span onClick={this.activeEditMode}>{`${this.props.task.id} - ${this.props.task.title}`}, priority: {this.props.task.priority}</span>
                    }   <button onClick={this.onDeleteTask}>Delete</button>
                </div>
        );
    }
}

export default TodoListTask;

