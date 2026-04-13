import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
      });
  }, []); // missing dependencies not critical here but okay

  return (
    <div>
      <h1>User List</h1>
      {users.map((user, index) => (
        <div key={index}>
          <p>{user.name.toUpperCase()}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
