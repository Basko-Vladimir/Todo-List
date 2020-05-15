import React from 'react';
import TodoListHeader from "./TodoListHeader/TodoListHeader";
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import {connect} from "react-redux";
import {addTask, deleteTask, deleteTodoList, setTasks, updateTask} from "../../redux/reducer";
import axios from "axios";

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
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {withCredentials: true,
            headers: {'API-KEY':'c2812a99-b1c5-4f1a-b023-99177b7645a3'}})
            .then(response => {
                if (!response.data.error){
                    this.props.setTasks(response.data.items, this.props.id)
                }
            })
    };

    changeTask = (task, obj) => {
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
            { ...task, ...obj},
            {withCredentials: true,
            headers: {'API-KEY': 'c2812a99-b1c5-4f1a-b023-99177b7645a3'}})
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
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {withCredentials: true,
                headers: { 'API-KEY':'c2812a99-b1c5-4f1a-b023-99177b7645a3'}})
            .then(response => {
                if (response.data.resultCode === 0)
                    this.props.deleteTask(taskId, this.props.id)
            });
    };

    onDeleteTodoList = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {withCredentials: true,
            headers: { 'API-KEY':'c2812a99-b1c5-4f1a-b023-99177b7645a3'}})
            .then(response => {
                if (response.data.resultCode === 0){
                    this.props.deleteTodoList(this.props.id)
                }
            })
    };

    onAddItemClick = (newText) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newText},
            {withCredentials: true,
                headers: {'API-KEY': 'c2812a99-b1c5-4f1a-b023-99177b7645a3'}})
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
                <TodoListHeader addItem={this.onAddItemClick} title={this.props.title} deleteTodoList={this.onDeleteTodoList}/>
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

export default connect(null, {addTask, updateTask, deleteTask, deleteTodoList, setTasks})(TodoList);