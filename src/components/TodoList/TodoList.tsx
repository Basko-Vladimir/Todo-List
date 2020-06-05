import React from 'react';
import TodoListHeader from "./TodoListHeader/TodoListHeader";
import TodoListTasks from "./TodoListTasks/TodoListTasks";
import TodoListFooter from "./TodoListFooter/TodoListFooter";
import {connect} from "react-redux";
import {addTaskThunk, changeTaskThunk, changeTodoListThunk,
        deleteTaskThunk, deleteTodoListThunk, getTasksThunk } from "../../redux/todoLists-reducer";
import {TaskType, UpdateChangeTask} from "../../types/antities";
import {AppStateType} from "../../redux/store";


type LocalStateType = {
    tasks: Array<TaskType>
    filterValue: string
}

type OwnPropsType = {
    id : string,
    title: string
}

type MapDispatchToPropsType = {
    addTaskThunk: (arg1: string, arg2: string) => void
    changeTaskThunk: (arg1: string, arg2: string, arg3: TaskType) => void
    deleteTaskThunk: (arg1: string, arg2: string) => void
    deleteTodoListThunk: (arg1: string) => void
    getTasksThunk: (arg1: string) => void
    changeTodoListThunk: (arg1: string, arg2: string) => void
};

type PropsType = LocalStateType & OwnPropsType & MapDispatchToPropsType;



class TodoList extends React.Component <PropsType, LocalStateType> {
    componentDidMount() {
        this.restoreState();
    }

    state = {
        tasks: [],
        filterValue: "All",
    };

    restoreState = () => {
        this.props.getTasksThunk(this.props.id);
    };

    changeTask = (task: TaskType, obj:UpdateChangeTask) => {
        this.props.changeTaskThunk(this.props.id, task.id, {...task, ...obj});
    };

    changeStatus = (task: TaskType, status: string) => {
        this.changeTask(task, {status : status ? 2 : 0})
    };

    changeTitle = (task: TaskType, title: string) => {
        this.changeTask(task, {title})
    };

    onDeleteTask= (taskId: string) => {
        this.props.deleteTaskThunk(this.props.id, taskId)
    };

    onDeleteTodoList = () => {
        this.props.deleteTodoListThunk(this.props.id)
    };

    changeTodoList = (newTitle: string) => {
        this.props.changeTodoListThunk(this.props.id, newTitle);
    };

    onAddTask = (newTitle: string) => {
        this.props.addTaskThunk(this.props.id, newTitle)
    };

    changeFilter = (newFilterValue: string) => {
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
                                tasks={tasks.filter( (t) => { switch (this.state.filterValue) {
                                                                            case 'All':  return true;
                                                                            case 'Active': return t.status !== 2 ;
                                                                            case 'Completed': return t.status === 2;
                    }})}/>
                <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
            </div>
        );
    }
}

export default connect<{}, MapDispatchToPropsType, PropsType, AppStateType>(null,
    {addTaskThunk, changeTaskThunk, deleteTaskThunk, deleteTodoListThunk, getTasksThunk, changeTodoListThunk})(TodoList);