import React, { useState, useEffect } from 'react';
import { addUser, getUsers, deleteUser } from '../utils/indexedDB';

const UserComponent = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUsers();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        if (name) {
            await addUser({ name });
            setName('');
            setUsers(await getUsers()); // Refresh the user list
        }
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        setUsers(await getUsers()); // Refresh the user list
    };

    return (
        <div>
            <h2>IndexedDB User List</h2>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter name" 
            />
            <button onClick={handleAddUser}>Add User</button>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserComponent;
