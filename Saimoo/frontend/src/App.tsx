import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ManageRoutes from "./routes/MangeRoutes";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster/>
        <ManageRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
