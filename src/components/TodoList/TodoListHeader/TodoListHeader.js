import React from 'react';
import '../../../App.css';
import TodoListTitle from "./TodoListTittle/TodoListTittle";
import AddNewItemForm from "../../AddNewItemForm/AddNewItemForm";


class TodoListHeader extends React.Component {

    render = () => {
        return (
            <div className="todoList-header">
                <TodoListTitle title={this.props.title} />
                <AddNewItemForm addItem={this.props.addItem} />
            </div>
        );
    }
}

export default TodoListHeader;
