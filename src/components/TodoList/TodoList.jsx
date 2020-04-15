import React from 'react';
import TodoListHeader from "./TodoListHeader/TodoListHeader";
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";

class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState();
    }
    state = {
        tasks: [],
        filterValue: "All",
    };
    nextItemId = 0;

    saveState = () => {
       let tasksToLocalStorage = JSON.stringify(this.state);
       localStorage.setItem(`our-state ${this.props.id}`, tasksToLocalStorage);
    };

    restoreState = () => {
        let tasks = localStorage.getItem(`our-state ${this.props.id}`);
        if (tasks) {
            tasks = JSON.parse(tasks);
            tasks.tasks.forEach( t => {
                if (t.id >= this.nextItemId){
                    this.nextItemId = t.id + 1;
                }
            });
            this.setState(tasks);
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

    deleteItem= (taskId) => {
        let newTasks = this.state.tasks.filter( t => t.id !== taskId);
        this.setState({
            tasks: newTasks
        }, () => this.saveState() )
    };

    onAddItemClick = (newText) => {
        let newTask = {
            id: this.nextItemId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextItemId++;
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
            <div className="todoList">
                <TodoListHeader addItem={this.onAddItemClick} title={this.props.title}/>
                <TodoListTasks  changeStatus={this.changeStatus}
                                changeTitle={this.changeTitle}
                                deleteItem={this.deleteItem}
                                tasks={this.state.tasks.filter( t => { switch (this.state.filterValue) {
                                                                            case 'All':  return true;
                                                                            case 'Active': return t.isDone;
                                                                            case 'Completed': return !t.isDone;
                    }})}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>
        );
    }
}

export default TodoList;
