import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ManageRoutes from "./routes/MangeRoutes";

function App() {

  return (
    <AuthProvider>
      <Router>
        <ManageRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
