interface AdminDashboardProps {
  currentUser?: {
    name: string;
  };
}
const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {currentUser?.name}!</p>
    </div>
  );
};

export default AdminDashboard;
