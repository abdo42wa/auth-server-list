import { ProvideAuth } from "./contexts/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { client, QueryProvider } from "./services/query";

export const App = () => {
  return (
    <QueryProvider client={client} >
      <ProvideAuth>
        <Toaster />
        <AppRoutes />
      </ProvideAuth>
    </QueryProvider>
  );
};
