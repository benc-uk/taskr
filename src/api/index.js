const saveTask = async (task) => {
    let response = await fetch(`${process.env.REACT_APP_API}/tasks`, {
        method: 'POST',
        body: JSON.stringify(task)
    });

    let respData = await response.json();

    if (response.ok) {
        return respData;
    } else {
        // API should return error details as JSON
        if (respData.message) {
            throw new Error(respData.message);
        }
        throw new Error(respData);
    }
};

const findTaskById = async (identifier) => {
};

const findTasksByOwner = async (owner) => {
    let response = await fetch(`${process.env.REACT_APP_API}/tasks?owner=${owner}`, {
        method: 'GET'
    });

    let respData = await response.json();

    if (response.ok) {
        return respData;
    } else {
        // API should return error details as JSON
        if (respData.message) {
            throw new Error(respData.message);
        }
        throw new Error(respData);
    }
};

const findTasksByAssignee = async (assignee) => {
    let response = await fetch(`${process.env.REACT_APP_API}/tasks?assignee=${assignee}`, {
        method: 'GET'
    });

    let respData = await response.json();

    if (response.ok) {
        return respData;
    } else {
        // API should return error details as JSON
        if (respData.message) {
            throw new Error(respData.message);
        }
        throw new Error(respData);
    }
};


const findUsers = async () => {
    let response = await fetch(`${process.env.REACT_APP_API}/users`, {
        method: 'GET'
    });

    let respData = await response.json();

    if (response.ok) {
        return respData;
    } else {
        // API should return error details as JSON
        if (respData.message) {
            throw new Error(respData.message);
        }
        throw new Error(respData);
    }
};

export {
    findTaskById,
    findTasksByAssignee,
    findTasksByOwner,
    findUsers,
    saveTask,
};
