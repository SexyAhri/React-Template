import Routes from "./router/routers";

import stone from "./redux/store";

import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={stone}>
      <Routes />
    </Provider>
  );
};
export default App;
