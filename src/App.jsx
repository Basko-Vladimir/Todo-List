import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList, setTodoLists} from "./redux/reducer";
import {api} from "./api/api";

class App extends React.Component{
    componentDidMount() {
        this.restoreState()
    }

    // state = {
    //     todoLists: []
    // };

    restoreState = () => {
            api.getTodoLists()
            .then(response => {
                this.props.setTodoLists(response.data)
            })
    };

    onAddTodoList = (title) => {
        api.addTodoList({title})
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

