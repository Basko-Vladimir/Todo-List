import React from 'react';
import './App.css';

class TodoListHeader extends React.Component {

    state = {
        error: false,
        title: ''
    };

    onAddTask = () => {
        let newText = this.state.title;
        if (!newText) {
            this.setState({
                error: true
            })
        } else {
            this.props.addTask(newText);
            this.state.title = '';
            this.setState({
                error: false
            })
        }
    };

    onChangeInput = (e) => {
        let newTitle = e.currentTarget.value;
        this.setState({
            error: false,
            title: newTitle
        })

    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onAddTask()
        }
    };

    render = () => {
        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input type="text"
                           value={this.state.title}
                           placeholder="New task name"
                           className={this.state.error && 'error' }
                           onChange={(e) => this.onChangeInput(e)}
                           onKeyPress={(e) => this.onKeyPress(e)}/>
                    <button onClick={this.onAddTask}>Add</button>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;
