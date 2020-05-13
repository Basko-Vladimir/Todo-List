import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, setTodoLists} from "./redux/reducer";
import axios from "axios";

class App extends React.Component{
    componentDidMount() {
        this.restoreState()
    }

    state = {
        todoLists: []
    };
    nextTodoList = 0;

    restoreState = () => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true})
            .then(response => {
                this.props.setTodoLists(response.data)
            })
    };

    saveState = () => {
        let stateToLocalStorage = JSON.stringify(this.state);
        localStorage.setItem(`todoLists`, stateToLocalStorage)
    };

    onAddTodoList = (title) => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: title},
            {
                withCredentials: true,
                headers: { 'API-KEY':'c2812a99-b1c5-4f1a-b023-99177b7645a3'}
            })
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.addTodoList(response.data.data.item);
                }
            })
    };

    render = () => {
        let todoLists = this.props.todoLists.map( t => <TodoList key={t.id} id={t.id} title={t.title} tasks={t.tasks}/> );
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.onAddTodoList} />
                </div>
                <div className="App">
                    { todoLists }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.todoLists
    }
};


export default connect(mapStateToProps, {addTodoList, setTodoLists})(App);

