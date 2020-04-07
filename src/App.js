import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
       let stateAsString = JSON.stringify(this.state);
       localStorage.setItem('our-state', stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem('our-state');
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
            this.nextTaskId = state.tasks.sort((a, b) => a.id - b.id)[state.tasks.length - 1].id + 1; // установка id для новой таски после перезагрузки
            this.setState(state);
        }
    };

    state = {
        tasks: [],
        filterValue: "All",
    };

    nextTaskId = 0;

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

