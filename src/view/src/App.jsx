import "./App.css";
import AuthProvider from "./components/authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./layouts/Header";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/404";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <div className="pt-13">
            <Routes>
              <Route index element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
