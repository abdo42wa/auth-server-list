import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { LoginView, ServerListView } from "./views";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};
const queryClient = new QueryClient();

export const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route
              path="/servers"
              element={
                <ProtectedRoute>
                  <ServerListView />
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/servers" />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};
