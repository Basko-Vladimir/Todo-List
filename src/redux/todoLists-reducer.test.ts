import React from "react";
import todoListsReducer, {addTodoListSuccess} from "./todoLists-reducer";

test('array length should be 1', () => {
    //test data

    let state = {
        todoLists: []
    };

    let action = addTodoListSuccess({id: '123', title: 'new', addedDate: 'er', order: 19, tasks: []});

    // action

    let newState = todoListsReducer(state , action);

    // expectation
    expect(newState.todoLists.length).toBe(1)
});

test('first element title should be new', () => {
    //test data

    let state = {
        todoLists: []
    };

    let action = addTodoListSuccess({id: '123', title: 'new', addedDate: 'er', order: 19, tasks: []});

    // action

    let newState = todoListsReducer(state , action);

    // expectation

    expect(newState.todoLists[0].title).toBe('new');
});
