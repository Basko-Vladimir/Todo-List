import React from 'react';
import "../../../../App.css";

class TodoListTitle extends React.Component {

    state = {
        editMode: false,
        title: this.props.title
    };

    activateEditMode = () => {
        this.setState({ editMode: true })
    };

    onChangeTitle = (event) => {
        this.setState({
                title: event.currentTarget.value
            })
    };

    changeTitleTodoList = () => {
        this.setState({editMode: false });
        this.props.changeTodoList(this.state.title)
    };



    render = () => {
        return (
            <>
                {   this.state.editMode
                    ? <input type="text"
                             value={this.state.title}
                             autoFocus={true}
                             onChange={this.onChangeTitle}
                             onBlur={this.changeTitleTodoList}/>
                    : <div className={'headerTodoList'}>
                          <h3 className="todoList-header__title" onClick={this.activateEditMode}>
                          {this.props.title}
                          </h3>
                          <button onClick={this.props.deleteTodoList}>X</button>
                    </div>
                }

            </>
        );
    }
}

export default TodoListTitle;

