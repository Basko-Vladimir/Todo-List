import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListThunk, getTodoListsThunk} from "./redux/reducer";


class App extends React.Component{
    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodoListsThunk()
    };

    onAddTodoList = (title) => {
        this.props.addTodoListThunk({title});
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

export default connect(mapStateToProps, {addTodoListThunk, getTodoListsThunk})(App);

