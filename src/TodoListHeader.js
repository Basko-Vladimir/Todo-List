import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    newTaskTitleRef = React.createRef();

    addTask = () => {
        let newText = this.newTaskTitleRef.current.value;
        this.props.addTask(newText);
        this.newTaskTitleRef.current.value = '';
    };

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input type="text"
                           placeholder="New task name"
                           ref={this.newTaskTitleRef}/>
                    <button onClick={this.addTask}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;
