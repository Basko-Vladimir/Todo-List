import React from 'react';
import TodoListHeader from "./TodoListHeader/TodoListHeader";
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import {connect} from "react-redux";
import {
    addTaskThunk, changeTaskThunk, changeTodoListThunk,
    deleteTaskThunk,
    deleteTodoList, deleteTodoListThunk,
    loadTasksThunk,
    setTasks,
    updateTask,
    updateTodoList
} from "../../redux/reducer";

class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [],
        filterValue: "All",
    };

    restoreState = () => {
        this.props.loadTasksThunk(this.props.id);
    };

    changeTask = (task, obj) => {
        this.props.changeTaskThunk(this.props.id, task.id, {...task, ...obj});
    };

    changeStatus = (task, status) => {
        this.changeTask(task, {status : status ? 2 : 0})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title})
    };

    onDeleteTask= (taskId) => {
        this.props.deleteTaskThunk(this.props.id, taskId)
    };

    onDeleteTodoList = () => {
        this.props.deleteTodoListThunk(this.props.id)
    };

    changeTodoList = (newTitle) => {
        this.props.changeTodoListThunk(this.props.id, newTitle);
    };

    onAddTask = (newText) => {
        this.props.addTaskThunk(this.props.id, newText)
    };

    changeFilter = (newFilterValue) => {
          this.setState({
              filterValue: newFilterValue
          })
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <TodoListHeader addItem={this.onAddTask} title={this.props.title} changeTodoList={this.changeTodoList} deleteTodoList={this.onDeleteTodoList}/>
                <TodoListTasks  changeStatus={this.changeStatus}
                                changeTitle={this.changeTitle}
                                deleteTask={this.onDeleteTask}
                                tasks={tasks.filter( t => { switch (this.state.filterValue) {
                                                                            case 'All':  return true;
                                                                            case 'Active': return t.status !== 2 ;
                                                                            case 'Completed': return t.status === 2;
                    }})}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>
        );
    }
}

export default connect(null,
    {addTaskThunk, changeTaskThunk, deleteTaskThunk, deleteTodoListThunk, loadTasksThunk, changeTodoListThunk})(TodoList);