import React, { useState, useEffect } from 'react';

import { Flex, Form, Input, Button, Dialog, TextArea, Dropdown } from "@fluentui/react-northstar";

import { findUsers } from './../../api';

const AddTask = ({ addTask, owner }) => {
    const [newTask, setNewTask] = useState({ owner });
    const [isOpen, setIsOpen] = useState(false);

    const createNewTask = async (e) => {
        e.preventDefault();
        await addTask(newTask);
        setIsOpen(false);
    };

    const [people, setPeople] = useState(null);
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const users = await findUsers();
                setPeople(users.map(user => {
                    return {
                        id: user.userId,
                        header: user.userDetails,
                        image: `https://api.adorable.io/avatars/285/${user.userId}.png`
                    };
                }));
            } catch (err) {
                console.log('Error loading assignees' + err.toString());
            }
        };
        if (people) return;
        makeRequest();
    }, [people]);

    return (
        <Flex>
            <Dialog
                open={isOpen}
                onOpen={() => { setIsOpen(true); }}
                cancelButton="Cancel"
                onCancel={() => { setIsOpen(false); }}
                confirmButton="Create"
                onConfirm={createNewTask}
                content={
                    <Form>
                        <Form.Field
                            label="Title"
                            name="title"
                            id="title"
                            required
                            control={
                                <Input
                                    fluid
                                    id="title"
                                    name="title"
                                    onChange={(e, { name, value }) => { setNewTask({ ...newTask, [name]: value }); }} />
                            } />

                        <Form.Field
                            label="Notes"
                            name="notes"
                            id="notes"
                            required
                            control={
                                <TextArea
                                    id="notes"
                                    name="notes"
                                    fluid="true"
                                    resize="vertical"
                                    onChange={(e, { name, value }) => { setNewTask({ ...newTask, [name]: value }); }} />
                            } />

                        <Form.Field
                            label="Assignees"
                            name="assignedTo"
                            id="assignedTo"
                            control={
                                <Dropdown
                                    id="assignedTo"
                                    name="assignedTo"
                                    multiple
                                    search
                                    fluid
                                    items={people}
                                    placeholder="Start typing a name"
                                    onChange={
                                        (e, { value }) => {
                                            setNewTask({ ...newTask, assignedTo: value.map(x => x.id) });
                                        }
                                    }
                                    getA11ySelectionMessage={{
                                        onAdd: item => `${item.header} has been selected.`,
                                        onRemove: item => `${item.header} has been removed.`,
                                    }}
                                    noResultsMessage="We couldn't find any matches."
                                />
                            } />
                    </Form>}
                trigger={<Button content="Add" primary />}
            />
        </Flex>
    );
};

export default AddTask;