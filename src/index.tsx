import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import { Provider } from "react-redux"
import store from "../src/redux/store/store"
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
