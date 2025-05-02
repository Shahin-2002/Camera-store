import React from "react";
import { EmailProvider } from "./EmailContext/EmailContext";
import { useRoutes } from "react-router-dom";
import { UserProvider } from "./UserContext/UserContext";
import route from "./routes";

export default function App() {
  const routes = useRoutes(route);
  return (
    <UserProvider>
      <EmailProvider>{routes}</EmailProvider>
    </UserProvider>
  );
}
