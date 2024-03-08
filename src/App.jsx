import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Register,
  Login,
  DashboardLayout,
  Landing,
  Error,
  AddPosture,
  Stats,
  AllPosture,
  Profile,
  Admin,
  BlogManage,
  AddUser,
  AllPatient,
  EditPatient,
  DeletePatient,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { action as addUserAction } from "./pages/AddUser";
import { loader as allpatientLoader } from "./pages/AllPatient";
import { loader as editPatientLoader } from "./pages/EditPatient";
import { action as editPatientAction } from "./pages/EditPatient";
import { action as deletePatientAction } from "./pages/DeletePatient";

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);
  return isDarkTheme;
};

checkDefaultTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "/login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            path: "add-posture",
            element: <AddPosture />,
          },
          {
            index: true,
            // path: "stats",
            element: <Stats />,
          },
          {
            path: "all-posture",
            element: <AllPosture />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
          {
            path: "blogmanage",
            element: <BlogManage />,
          },
          {
            path: "add-user",
            element: <AddUser />,
            action: addUserAction,
          },
          {
            path: "all-patient",
            element: <AllPatient />,
            loader: allpatientLoader, // เพิ่ม loader ที่นี่
          },
          {
            path: "edit-patient/:_id",
            element: <EditPatient />,
            loader: editPatientLoader,
            action: editPatientAction,
          },
          {
            path: "delete-patient/:_id",
            element: <DeletePatient/>,
            action: deletePatientAction,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
