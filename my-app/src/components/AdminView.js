import "./AdminView.css";
import Button from "./Button";
import UserRow from "./UserRow";

const AdminView = ({ name, users }) => {
  const nonAdminUsers = users.filter((user) => !user.isAdmin);

  function renderRows() {
    const rows = [];
    for (let i = 0; i < nonAdminUsers.length; i++) {
      rows.push(
        <UserRow key={nonAdminUsers[i].firstName} client={nonAdminUsers[i]} />
      );
    }
    return rows;
  }

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <h2>Accounts</h2>
      <Button text="Add User" />
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default AdminView;
