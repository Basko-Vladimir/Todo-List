import React from 'react';
import './App.css';
import TodoListHeader from "./Components/TodoListHeader";
import TodoListTasks from "./Components/TodoListTasks/TodoListTasks";
import TodoListFooter from "./Components/TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef();
    }

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value;
        let newTask = {title: newText, isDone: true, priority: 'medium'};
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks});
        this.newTaskTitleRef.current.value = '';
    };

    state = {
        tasks: [
            {title: 'CSS', isDone: true, priority: 'low'},
            {title: 'JS', isDone: false, priority: 'medium'},
            {title: 'ReactJS', isDone: false, priority: 'high'},
            {title: 'Patterns', isDone: true, priority: 'high'}
        ],
        filterValue: 'Completed'
    };

    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader newTaskTitRef={this.newTaskTitleRef} onAddTaskClick={this.onAddTaskClick} />
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

