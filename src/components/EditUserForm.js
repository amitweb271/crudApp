import React, { useState, useEffect } from 'react';

const EditUserForm = ({ currentUser, updateUser, setEditing }) => {
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!user.name || !user.username) return;
        updateUser(user.id, user);
        setEditing(false);
      }}
    >
      <label>Name</label>
      <input type="text" name="name" value={user.name} onChange={handleInputChange} />
      <label>Username</label>
      <input type="text" name="username" value={user.username} onChange={handleInputChange} />
      <button>Update user</button>
      <button onClick={() => setEditing(false)}>Cancel</button>
    </form>
  );
};

export default EditUserForm;
