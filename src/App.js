import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map( t => {
            if (t === task){
                return {...t, isDone: isDone}
            } else {
                return t
            }
        });

        this.setState({
            tasks:newTasks
        })
    };

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: "medium"},
            {title: "HTML", isDone: true, priority: "low"},
            {title: "CSS", isDone: true, priority: "low"},
            {title: "ReactJS", isDone: false, priority: "high"}
        ],
        filterValue: "All"
    };

    onAddTaskClick = (newText) => {
        let newTask = {
            title: newText,
            isDone: false,
            priority: "low"
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        });
    };

    changeFilter = (newFilterValue) => {
          this.setState({
              filterValue: newFilterValue
          })
    };

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.onAddTaskClick}/>
                    <TodoListTasks  changeStatus={this.changeStatus}
                                    tasks={this.state.tasks.filter( t => { switch (this.state.filterValue) {
                                                                                case 'All':  return true;
                                                                                case 'Active': return t.isDone;
                                                                                case 'Completed': return !t.isDone;
                        }})}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}

export default App;

