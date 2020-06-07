import React, {ChangeEvent} from 'react';
import '../../../../App.css';

type OwnPropsType = {
    title: string
    changeTodoList: (todoListId: string) => void
    deleteTodoList: () => void
}

class TodoListTitle extends React.Component<OwnPropsType> {
    state = {
        editMode: false,
        title: this.props.title
    };

    activateEditMode = () => {
        this.setState({ editMode: true })
    };

    onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
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

