import { Provider } from "react-redux";
import Body from "./components/Body";
import appStore from "./redux/appStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Provider store={appStore}>
      <Body />
      <ToastContainer />
    </Provider>

  );
};

export default App;
