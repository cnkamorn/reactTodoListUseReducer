export const todoReducer = (todoList,action) =>{
    switch (action.type) {
        case "Add":
            return [...todoList,action.payload.task]
        case "Delete":
            return todoList.filter((task,i) => action.payload.id !== i)
        case "Mark":
            return todoList.map((task,i)=> {
                if (i === action.payload.taskId)
                    return {...task,done:action.payload.done};
                return task;
            });
        default:
        return todoList;
    }
}

export const initialState = [
    {
        name:"Add a task item",
        done:false
    }
]

export const deleteAction = (id) => {
    return {
        type:"Delete",
        payload: {
            id
        }
    }
}
export const markAction = (taskId,done) => {
    return {
        type:"Mark",
        payload: {
            taskId,
            done
        }
    }
}
export const addAction = (taskText) => {
    return {
        type: "Add",
        payload: {
            task: {
                name:taskText,
                done:false
            }
        }
    }
}