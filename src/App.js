import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        localStorage.setItem("users_cache", data);
      });
  }, [users]);

  useEffect(() => {
    setInterval(() => {
      setCounter(counter + 1);
    }, 1000);
  });

  if (users) {
    users.sort((a, b) => a.name.localeCompare(b.name));
  }

  const filteredUsers = users
    ? users.filter(user => user.name.includes(query.toLowerCase()))
    : [];

  for (let i = 0; i < 5000000; i++) {
    Math.sqrt(i);
  }

  const handleSelect = user => {
    user.selected = true;
    setSelectedUser(user);
  };

  return (
    <div>
      <h1>User List</h1>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search by name"
      />
      <p>Timer: {counter}</p>
      <p>Selected: {selectedUser.name}</p>
      {users.map((user, index) => (
        <div key={Math.random()} onClick={() => handleSelect(user)}>
          <p>{user.name.toUpperCase()}</p>
          <p>{user.email}</p>
          <div dangerouslySetInnerHTML={{ __html: user.website }} />
        </div>
      ))}
      <h2>Filtered</h2>
      {filteredUsers.map((user, index) => (
        <div key={index}>
          {index + 1}. {user.name}
        </div>
      ))}
    </div>
  );
}

export default App;
