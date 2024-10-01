import DashboardPageLayout from "../pages/Dashboard/PageLayout";
import RedirectPage from "../pages/Utils/Redirect";
import Home from "../pages/Dashboard/Home";

const appRoutes  = [
    {path: "/",
    element: <div>Landing Page</div>,
    },
    {
        path: "/dashboard",
        element: <DashboardPageLayout />,
        children: [
          {
            path: "/dashboard",
            element: <Home />,
          },
        ],
    },

]

export default appRoutes;