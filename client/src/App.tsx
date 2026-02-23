// ... imports
import { AuthProvider } from "@/providers/auth-provider";
import LoginPage from "@/pages/auth/login";

// ... inside App component
<AuthProvider>
  <Toaster />
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      // ... existing routes
    </Routes>
  </BrowserRouter>
</AuthProvider>
