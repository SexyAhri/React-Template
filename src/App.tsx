import RoutesComponent from "@/router/routers";
import stone from "@/redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={stone}>
      <RoutesComponent></RoutesComponent>
    </Provider>
  );
};
export default App;
