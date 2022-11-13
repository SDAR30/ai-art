import React, { useState, useEffect } from 'react';

const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const URL = 'http://localhost:3333/users'
        fetch(URL).then(res => res.json())
            .then(data => {
                setUsers(data.users)
            })
    }, [])

    return (
        <div>
            Users:
            {users.map(user=> <div key={user.name}>{user.name}</div>)}
        </div>
    );
}

export default UserList;