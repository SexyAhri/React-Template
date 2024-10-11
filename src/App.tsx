import RoutesComponent from "./router/routers";

import stone from "./redux/store";

import { Provider } from "react-redux";

const App = () => {
  const users = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
    { id: "3", name: "Charlie" },
  ];

  const userRole = "guest";

  return (
    <Provider store={stone}>
      <RoutesComponent users={users} userRole={userRole} />
    </Provider>
  );
};
export default App;
