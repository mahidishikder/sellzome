import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";

  
  export const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error></Error>,
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        }
      ]
    },
  ]);