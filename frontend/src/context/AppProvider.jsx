import { AuthProvider } from "./AuthContext";
import { StationProvider } from "./StationContext";
import { BookingProvider } from "./BookingContext";

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <StationProvider>
        <BookingProvider>{children}</BookingProvider>
      </StationProvider>
    </AuthProvider>
  );
};

export default AppProvider;
