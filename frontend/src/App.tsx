import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import UserLayout from "./components/layout/UserLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
