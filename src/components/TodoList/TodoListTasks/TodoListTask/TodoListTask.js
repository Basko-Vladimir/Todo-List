import React from 'react';
import '../../../../App.css';

class TodoListTask extends React.Component {
    state = {
        editMode: false
    };

    onChangeStatus = (event) => {
        this.props.changeStatus(this.props.task, event.currentTarget.checked);
    };

    // onTitleChanged = (event) => {
    //     this.props.changeTitle(this.props.task, event.currentTarget.value)
    // };

    activeEditMode = () => {
        this.setState({editMode: true})
    };

    deactivateEditMode = (event) => {
        this.setState({editMode: false});
        this.props.changeTitle(this.props.task, event.currentTarget.value)
    };

    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id);
    };

    render = () => {
        let isDone =  this.props.task.status === 2;
        return (
                <div className={isDone ? `todoList-task done` : `todoList-task`}>
                    <input type="checkbox" checked={isDone}
                           onChange={this.onChangeStatus}/>
                    { this.state.editMode
                        ? <input autoFocus={true}
                                 defaultValue={this.props.task.title}
                                 onBlur={this.deactivateEditMode}/>
                        : <span onClick={this.activeEditMode}>{`${this.props.task.title}`}, priority: {this.props.task.priority}</span>
                    }   <button onClick={this.onDeleteTask}>Delete</button>
                </div>
        );
    }
}

export default TodoListTask;

