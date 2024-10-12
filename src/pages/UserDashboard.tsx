const UserDashboard = ({ currentUser }) => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {currentUser?.name}!</p>
    </div>
  );
};
export default UserDashboard;
