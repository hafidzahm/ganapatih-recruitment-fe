import { createRoot } from "react-dom/client";
import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "./components/ui/sonner";
import FeedPage from "./pages/FeedPage";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import SearchPage from "./pages/SearchPage";
import MyProfilePage from "./pages/MyProfilePage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./contexts/queryPostContext/queryClientProvider";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/me" element={<MyProfilePage />} />
        </Route>
      </Routes>
      <Toaster
        swipeDirections={["left", "right", "bottom", "top"]}
        position="bottom-center"
      />
    </BrowserRouter>
  </QueryClientProvider>
);
