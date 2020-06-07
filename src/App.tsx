import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import AddNewItemForm from './components/AddNewItemForm/AddNewItemForm';
import {connect} from "react-redux";
import {addTodoListThunk, getTodoListsThunk} from './redux/todoLists-reducer';
import {TodoType} from './types/types';
import { AppStateType } from './redux/store';

type MapStatePropsType = {
    todoLists: Array<TodoType>
}

type MapDispatchPropsType = {
    addTodoListThunk: (arg: string) => void
    getTodoListsThunk: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class App extends React.Component<PropsType>{
    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getTodoListsThunk()
    };

    onAddTodoList = (newTitle: string) => {
        this.props.addTodoListThunk(newTitle);
    };

    render = () => {
        let todoLists = this.props.todoLists.map( (t) => <TodoList key={t.id}
                                                                              id={t.id}
                                                                              title={t.title}
                                                                              tasks={t.tasks}/> );
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

const mapStateToProps = (state: AppStateType ): MapStatePropsType => {
    return {
        todoLists: state.todoLists.todoLists
    }
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
        (mapStateToProps, {addTodoListThunk, getTodoListsThunk})(App);

