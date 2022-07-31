import Container from "@mui/material/Container";
import { Routes, Route, Navigate } from "react-router-dom";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { useAuth } from "./hooks";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          {!user && (
            <>
              <Route path="/register" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
          {user && (
            <>
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/posts/:id/edit" element={<AddPost />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
