import React, { ReactNode } from "react";
import Wrapper from "./LayoutWrapper";
import ProtectedPage from "../ProtectedRoute";
import { ToastContainer } from "react-toastify";

function AlumniLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedPage expectedRole="alumni">
      <ToastContainer />
      <Wrapper>{children}</Wrapper>
    </ProtectedPage>
  );
}

export default AlumniLayout;
