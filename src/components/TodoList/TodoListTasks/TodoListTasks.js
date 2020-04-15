import React from 'react';
import '../../../App.css';
import TodoListTask from "./TodoListTask/TodoListTask";

class TodoListTasks extends React.Component {
    render = () => {
        let tasksElements = this.props.tasks.map(
                task => <TodoListTask task={task}
                                      key={task.id}
                                      changeTitle={this.props.changeTitle}
                                      changeStatus={this.props.changeStatus}
                                      deleteItem={this.props.deleteItem} />);
        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;
