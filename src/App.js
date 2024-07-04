import { BrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="134165473966-0dnln141c85h92cuqi64dnbiebuk8bv6.apps.googleusercontent.com">
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
