import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }
    state = {
        tasks: [],
        filterValue: "All",
    };
    nextTaskId = 0;

    saveState = () => {
       let stateAsString = JSON.stringify(this.state);
       localStorage.setItem('our-state', stateAsString);
    };

    restoreState = () => {
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) {
            this.state = JSON.parse(stateAsString);
            this.state.tasks.forEach( t => {
                if (t.id >= this.nextTaskId){
                    this.nextTaskId = t.id + 1;
                }
            });
            this.setState(this.state);
        }
    };

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map( t => {
            if (t.id === taskId){
                return {...t, ...obj}
            } else {
                return t
            }
        });
        this.setState({
            tasks:newTasks
        }, () => this.saveState() )
    };

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title})
    };

    deleteTask = (taskId) => {
        let newTasks = this.state.tasks.filter( t => t.id !== taskId);
        this.setState({
            tasks: newTasks
        }, () => this.saveState() )
    };

    onAddTaskClick = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks,
        }, () => this.saveState() );
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
                                    changeTitle={this.changeTitle}
                                    deleteTask={this.deleteTask}
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

