const AdminDashboard = ({ currentUser }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {currentUser?.name}!</p>
    </div>
  );
};

export default AdminDashboard;
