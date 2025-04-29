import React from 'react'
import { useRoutes } from "react-router-dom";

import route from './routes';

export default function App() {
  const routes = useRoutes(route)
  return (
    <>
      {routes}
    </>
  )
}
