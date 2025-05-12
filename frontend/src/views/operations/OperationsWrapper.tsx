import Operations from "./Operations"
import { ProtectedRoute } from "../login/PostLogin";
import { userStore } from "../../utils/store"


export const OperationsWrapper = () => {
  const isLoggedIn = userStore((state) => state.isLoggedIn);

  return (
    <ProtectedRoute isAuthenticated={isLoggedIn}>
      <Operations />
    </ProtectedRoute>
  );
}
