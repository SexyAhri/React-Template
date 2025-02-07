interface UserDashboardProps {
  currentUser?: { name: string };
}
const UserDashboard: React.FC<UserDashboardProps> = ({ currentUser }) => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {currentUser?.name}!</p>
    </div>
  );
};
export default UserDashboard;
