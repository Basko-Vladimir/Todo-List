import React from 'react';
import '../../App.css';

class AddNewItemForm extends React.Component {
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

    onChangeInput = (e) => {
        let newTitle = e.currentTarget.value;
        this.setState({
            error: false,
            title: newTitle
        })

    };

    onKeyPress = (e) => {
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