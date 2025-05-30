import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {  protectedRoutes, authRoutes } from "./routes/routes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {protectedRoutes.map(({ path, component: Component }) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <ProtectedRoutes>
                    <Component />
                  </ProtectedRoutes>
                }
              />
            );
          })}
          {authRoutes.map(({ path, component: Component }) => {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <PublicRoutes>
                    <Component />
                  </PublicRoutes>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
