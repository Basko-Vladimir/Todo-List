import React from 'react';
import './App.css';
import TodoList from "./components/TodoList/TodoList";
import AddNewItemForm from "./components/AddNewItemForm/AddNewItemForm";


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

    addTodoList = (title) => {
        let newTodoList = {
            id: this.nextTodoList,
            title: title
        };
        this.nextTodoList++;
        this.setState({
            todoLists: [...this.state.todoLists, newTodoList]
        }, () => this.saveState() )

    };

    render = () => {
        let todoLists = this.state.todoLists.map( t => <TodoList key={t.id} id={t.id} title={t.title}/> );
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList} />
                </div>
                <div className="App">
                    { todoLists }
                </div>
            </>
        );
    }
}

export default App;

