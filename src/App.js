import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserTable from './components/UserTable';
import AddUserForm from './components/AddUserForm';
import EditUserForm from './components/EditUserForm';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: '', username: '' };
  const [currentUser, setCurrentUser] = useState(initialFormState);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (user) => {
    setEditing(true);
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
  };

  return (
    <Router>
      <div>
        <h1>CRUD App with React</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/add">Add User</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/add"
            element={<AddUserForm addUser={addUser} />}
          />
          <Route
            path="/"
            element={
              <div>
                {editing ? (
                  <div>
                    <h2>Edit User</h2>
                    <EditUserForm
                      editing={editing}
                      setEditing={setEditing}
                      currentUser={currentUser}
                      updateUser={updateUser}
                    />
                  </div>
                ) : (
                  <div>
                    <h2>View Users</h2>
                    <UserTable users={users} editUser={editUser} deleteUser={deleteUser} />
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
