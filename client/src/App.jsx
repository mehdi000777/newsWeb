import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import NewsPage from "./pages/NewsPage";
import Layout from "./pages/Layout";
import Auth from "./pages/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PersistLogin from "./components/auth/PersistLogin";
import Archive from "./pages/Archive";
import AdminNewsPage from "./pages/AdminNewsPage";
import AdminLayout from "./components/Admin/Layout/AdminLayout";
import AdminCategoryPage from "./pages/AdminCategoryPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateNews from "./components/Admin/CreateNews";
import CreateCategory from "./components/Admin/CreateCategory";
import AdminEditNewsPage from "./pages/AdminEditNewsPage";
import AdminEditCategoryPage from "./pages/AdminEditCategoryPage";
import AdminEditUserPage from "./pages/AdminEditUserPage";
import AboutUs from "./pages/AboutUs";

const App = () => {
  return (
    <>
      <ToastContainer
        rtl={false}
        position="top-center"
        autoClose={5000}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/:id" element={<NewsPage />} />
          </Route>
          <Route path="/archive" element={<Archive />}>
            <Route path=":category_id" />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="news">
                <Route index element={<AdminNewsPage />} />
                <Route path=":id" element={<AdminEditNewsPage />} />
              </Route>
              <Route path="category">
                <Route index element={<AdminCategoryPage />} />
                <Route path=":id" element={<AdminEditCategoryPage />} />
              </Route>
              <Route path="users">
                <Route index element={<AdminUsersPage />} />
                <Route path=":id" element={<AdminEditUserPage />} />
              </Route>
              <Route path="createNews" element={<CreateNews />} />
              <Route path="createCategory" element={<CreateCategory />} />
            </Route>
          </Route>
          <Route path="/aboutUs" element={<AboutUs />} />
        </Route>
        <Route path="auth" element={<Auth />} />
      </Routes>
    </>
  );
};

export default App;
