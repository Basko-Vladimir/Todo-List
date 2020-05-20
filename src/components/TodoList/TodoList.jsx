import React from 'react';
import TodoListHeader from "./TodoListHeader/TodoListHeader";
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import {connect} from "react-redux";
import {addTask, deleteTask, deleteTodoList, setTasks, updateTask, updateTodoList} from "../../redux/reducer";
import {api} from "../../api/api";

class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [],
        filterValue: "All",
    };

    restoreState = () => {
        api.getTasks(this.props.id)
            .then(response => {
                if (!response.data.error){
                    this.props.setTasks(response.data.items, this.props.id)
                }
            })
    };

    changeTask = (task, obj) => {
        api.changeTask(this.props.id, task.id, {...task, ...obj})
            .then(response => {
                if (response.data.resultCode === 0){
                    this.props.updateTask(task.id, obj, this.props.id)
                }
            })
        };



    changeStatus = (task, status) => {
        this.changeTask(task, {status : status ? 2 : 0})
    };

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title})
    };

    onDeleteTask= (taskId) => {
        api.deleteTask(this.props.id, taskId)
            .then( response => {
                if (response.data.resultCode === 0){
                    this.props.deleteTask(taskId, this.props.id)
                }
            })
    };

    onDeleteTodoList = () => {
        api.deleteTodoList(this.props.id)
            .then(response => {
                if (response.data.resultCode === 0){
                    this.props.deleteTodoList(this.props.id)
                }
            })
    };

    changeTodoList = (newTitle) => {
        api.changeTodoList(this.props.id, newTitle)
            .then(response => {
                if (response.data.resultCode === 0){
                    this.props.updateTodoList(this.props.id, newTitle)
                }
            })
    };

    onAddTask = (newText) => {
        api.addTask(this.props.id, newText)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTask(response.data.data.item)
                }
            })
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

export default connect(null, {addTask, updateTask, deleteTask, deleteTodoList, setTasks, updateTodoList})(TodoList);