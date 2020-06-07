import React, {ChangeEvent, KeyboardEvent} from 'react';
import '../../App.css';

type LocalPropsType = {
    error: boolean
    title: string
}

type OwnPropsType = {
    addItem: (newText: string) => void
}

class AddNewItemForm extends React.Component<OwnPropsType, LocalPropsType> {
    state = {
        error: false,
        title: ''
    };

    onAddItem = () => {
        let newText = this.state.title;
        if (!newText) {
            this.setState({
                error: true
            })
        } else {
            this.props.addItem(newText);
            this.state.title = '';
            this.setState({
                error: false
            })
        }
    };

    onChangeInput = (e:ChangeEvent<HTMLInputElement>) => {
        let newTitle = e.currentTarget.value;
        this.setState({
            error: false,
            title: newTitle
        })

    };

    onKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.onAddItem()
        }
    };

    render = () => {
        return (
            <div className="todoList-newTaskForm">
                <input type="text"
                       value={this.state.title}
                       placeholder="New name"
                       className={this.state.error ? 'error' : ''}
                       onChange={(e) => this.onChangeInput(e)}
                       onKeyPress={(e) => this.onKeyPress(e)}/>
                <button onClick={this.onAddItem}>Add</button>
            </div>
        );
     }
}

export default AddNewItemForm;