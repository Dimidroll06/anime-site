import "./App.css";
import AuthProvider from "./components/authProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route index element={<h1>Home page</h1>} />
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
