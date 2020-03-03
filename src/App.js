import React from 'react';
import './App.css';
import TodoListHeader from "./Components/TodoListHeader";
import TodoListTasks from "./Components/TodoListTasks";
import TodoListFooter from "./Components/TodoListFooter";

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader />
                    <TodoListTasks />
                    <TodoListFooter />
                </div>
            </div>
        );
    }
}

export default App;

