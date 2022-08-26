import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App';
import { Provider } from "react-redux"
import store from "../src/redux/store/store"
import { BrowserRouter } from "react-router-dom";
import './utils/ensure-basename'
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from './utils/config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter basename={config.ROUTER_BASE_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
