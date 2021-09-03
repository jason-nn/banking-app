import "./AdminView.css";
import Button from "./Button";

const AdminView = ({ name, users }) => {
  const nonAdminUsers = users.filter((user) => !user.isAdmin);

  return (
    <div>
      <h1>Welcome, {name}</h1>
      <h2>Accounts</h2>
      <Button text="+" />
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Name</th>
            <th>Current Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>234567</td>
            <td>Juan de la Cruz</td>
            <td>$999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminView;
