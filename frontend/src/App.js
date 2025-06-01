import React from "react";
import { EmailProvider } from "./EmailContext/EmailContext";
import { useRoutes } from "react-router-dom";
import { UserProvider } from "./UserContext/UserContext";
import route from "./routes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


export default function App() {
  const routes = useRoutes(route);
  const queryClient = new QueryClient();


  return (

    <QueryClientProvider client={queryClient}>

    <UserProvider>
      <EmailProvider>{routes}</EmailProvider>
    </UserProvider>
    </QueryClientProvider>
  );
}
