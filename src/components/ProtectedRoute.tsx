import { Route, redirect } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
}

export function ProtectedRoute({
  component: Component,
  path,
}: ProtectedRouteProps) {
  const token = useAppSelector((state: RootState) => state.auth.token);

  if (!token) return redirect("/login");

  return <Route path={path} render={(props) => <Component {...props} />} />;
}
