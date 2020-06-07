import React from 'react';
import '../../../App.css';
import TodoListTitle from "./TodoListTittle/TodoListTittle";
import AddNewItemForm from "../../AddNewItemForm/AddNewItemForm";

type OwnPropsType = {
    title: string
    changeTodoList: (todoListId: string) => void
    deleteTodoList: () => void
    addItem: (title: string) => void
}

class TodoListHeader extends React.Component<OwnPropsType> {
    render = () => {
        return (
            <div className="todoList-header">
                <TodoListTitle title={this.props.title}
                               changeTodoList={this.props.changeTodoList}
                               deleteTodoList={this.props.deleteTodoList}/>
                <AddNewItemForm addItem={this.props.addItem} />
            </div>
        );
    }
}

export default TodoListHeader;
