import "./App.css";
import AuthProvider from "./components/authProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Header from "./layouts/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/404";
import { EditProfile } from "./pages/EditProfile";
import { Profile } from "./pages/Profile";
import { Anime } from "./pages/Anime";
import { Search } from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Header />
          <div className="pt-13">
            <Routes>
              <Route index element={<Home />} />
              <Route
                path="/login"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/anime/:animeId" element={<Anime />} />
              <Route path="/search" element={<Search />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
