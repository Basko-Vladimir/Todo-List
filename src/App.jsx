import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";
import {connect} from "react-redux";
import {addTodoList} from "./redux/reducer";

class App extends React.Component{
    componentDidMount() {
        this.restoreState()
    }

    state = {
        todoLists: []
    };
    nextTodoList = 0;

    restoreState = () => {
        let todoLists = localStorage.getItem(`todoLists`);
        if (todoLists) {
            todoLists = JSON.parse(todoLists);
            todoLists.todoLists.forEach( t => {
                if (t.id >= this.nextTodoList){
                    this.nextTodoList = t.id + 1;
                }
            });
            this.setState(todoLists);
        }
    };

    saveState = () => {
        let stateToLocalStorage = JSON.stringify(this.state);
        localStorage.setItem(`todoLists`, stateToLocalStorage)
    };

    onAddTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoList,
            title: title,
            tasks: []
        };
        this.nextTodoList++;
        this.props.addTodoList(newTodoList);
        // this.setState({
        //     todoLists: [...this.state.todoLists, newTodoList]
        // }, () => this.saveState() )
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

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodoList) => {
            dispatch(addTodoList(newTodoList))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

