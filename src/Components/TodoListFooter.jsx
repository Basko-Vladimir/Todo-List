import React from 'react';

class TodoListFooter extends React.Component{

    classForAll = this.props.filterValue === 'All' ? 'filter-active' : '';
    classForCompleted = this.props.filterValue === 'Completed' ? 'filter-active' : '';
    classForActive = this.props.filterValue === 'Active' ? 'filter-active' : '';

    render = () => {
        return (
            <div className="todoList-footer">
                <button className={this.classForAll}>All</button>
                <button className={this.classForCompleted}>Completed</button>
                <button className={this.classForActive}>Active</button>
            </div>
        )
    }
}

export default TodoListFooter;