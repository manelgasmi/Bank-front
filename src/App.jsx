import Navigation from "./navigation/Navigation";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import "./App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
