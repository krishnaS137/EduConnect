import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import Navbar from "./components/CustomComponents/Navbar/Navbar";

const root = createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain="dev-3vc6shlr12tgfx50.us.auth0.com"
    clientId="4fpwv7T6nCSBeW7FDeZEzxrzkTfFAZvs"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Navbar/>
  </Auth0Provider>
);
