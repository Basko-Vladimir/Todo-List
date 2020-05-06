import React from 'react';
import TodoListHeader from "./TodoListHeader/TodoListHeader";
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import {connect} from "react-redux";
import {addTask, changeTask, deleteTask, deleteTodoList} from "../../redux/reducer";

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

    // onChangeTask = (taskId, obj) => {
    //     let newTasks = this.state.tasks.map( t => {
    //         if (t.id === taskId){
    //             return {...t, ...obj}
    //         } else {
    //             return t
    //         }
    //     });
    //     this.setState({
    //         tasks:newTasks
    //     }, () => this.saveState() )
    // };

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(taskId, {isDone}, this.props.id)
    };

    changeTitle = (taskId, title) => {
        this.props.changeTask(taskId, {title}, this.props.id)
    };

    onDeleteTask= (taskId) => {
        // let newTasks = this.state.tasks.filter( t => t.id !== taskId);
        // this.setState({
        //     tasks: newTasks
        // }, () => this.saveState() )
        this.props.deleteTask(taskId, this.props.id)
    };
    onDeleteTodoList = () => {
        this.props.deleteTodoList(this.props.id);
    };

    onAddItemClick = (newText) => {
        let newTask = {
            id: this.nextItemId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextItemId++;
        // let newTasks = [...this.state.tasks, newTask];
        // this.setState( {
        //     tasks: newTasks,
        // }, () => this.saveState() );
        this.props.addTask(newTask, this.props.id);
    };

    changeFilter = (newFilterValue) => {
          this.setState({
              filterValue: newFilterValue
          })
    };

    render = () => {
        return (
            <div className="todoList">
                <TodoListHeader addItem={this.onAddItemClick} title={this.props.title} deleteTodoList={this.onDeleteTodoList}/>
                <TodoListTasks  changeStatus={this.changeStatus}
                                changeTitle={this.changeTitle}
                                deleteTask={this.onDeleteTask}
                                tasks={this.props.tasks.filter( t => { switch (this.state.filterValue) {
                                                                            case 'All':  return true;
                                                                            case 'Active': return t.isDone;
                                                                            case 'Completed': return !t.isDone;
                    }})}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (newTask, todoListId) => {
            dispatch(addTask(newTask, todoListId))
        },
        changeTask: (taskId, obj, todoListId) => {
            dispatch(changeTask(taskId, obj, todoListId))
        },
        deleteTask: (taskId, todoListId) => {
            dispatch(deleteTask(taskId, todoListId))
        },
        deleteTodoList: (todoListId) => {
            dispatch(deleteTodoList(todoListId))
        }

    }
};

export default connect(null, mapDispatchToProps)(TodoList);

