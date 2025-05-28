// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message));

    axios.get('http://localhost:5000/api/profiles')
      .then(res => setProfiles(res.data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>

      <h1>Profiles</h1>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id}>{profile.bio}</li>
        ))}
      </ul>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}

export default App;
