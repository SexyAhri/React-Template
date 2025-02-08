import RoutesComponent from '@/router/routers';
import stone from '@/redux/store';
import { Provider } from 'react-redux';
import '@/index.css';

const App = () => {
  return (
    <Provider store={stone}>
      <RoutesComponent></RoutesComponent>
    </Provider>
  );
};
export default App;
