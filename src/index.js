import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/root";
import { loader as contactLoader } from "./routes/contact";
import { Contact } from "./components/Contact";
import EditContact from "./components/EditContact";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import AddContact from "./components/AddContact";
import store from "./store/contacts.store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
  },
  {
    path: "/contact/:id/edit",
    element: <EditContact />,
    loader: contactLoader,
  },
  {
    path: "/contact/add",
    element: <AddContact />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
