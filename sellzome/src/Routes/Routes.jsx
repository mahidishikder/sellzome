import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Layout/Root";
import Error from "../pages/Error/Error";
import Home from "../pages/Home/Home";
import Form from "../components/Form/Form";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

  
  export const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error></Error>,
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path:'/form',
          element:<Form></Form>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/register',
          element:<Register></Register>
        }
      ]
    },
  ]);