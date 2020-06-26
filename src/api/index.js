const saveTask = async (taskName) => {
    // bare minimum task object
    let task = {
        "title": taskName,
        "notes": "This is a test, bye!",
        "owner": "HarryHill"
    };

    let response = await fetch(`${process.env.REACT_APP_API}/tasks`, {
        method: 'POST',
        body: JSON.stringify(task)
    });

    let respData = await response.json();

    if (response.ok) {
        return respData.title;
    } else {
        // API should return error details as JSON
        if (respData.message) {
            throw new Error(respData.message);
        }
        throw new Error(respData);
    }
};

const findTasksByOwner = (owner) => {
    return [{ id: 1, name: "Task Item 1 (owner)" }, { id: 2, name: "Task Item 2  (owner)" }];
};

const findTasksByAssignee = (assignee) => {
    return [{ id: 1, name: "Task Item 1 (assignee)" }, { id: 2, name: "Task Item 2  (assignee)" }];
};

const findTaskById = (id) => {
    return { id, name: "Task Item (id)" };
};

const findUsers = () => {
    return [
        {
            id: 1,
            name: 'Person 1'
        },
        {
            id: 2,
            name: 'Person 2'
        }
    ];
};

export {
    findTaskById,
    findTasksByAssignee,
    findTasksByOwner,
    findUsers,
    saveTask,
};
