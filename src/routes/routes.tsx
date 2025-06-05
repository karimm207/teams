import { createBrowserRouter } from "react-router-dom";
import TeamsDashboardRoute from "../routes/teams/teams-dashboard";
import HomePage from "../pages/HomePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />, 
  },
  {
    path: "/teams",
    element: <TeamsDashboardRoute />, 
  },
 
]);

export default router;
