import "./App.css";
import AuthProvider from "./components/authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./layouts/Header";
import { Home } from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
