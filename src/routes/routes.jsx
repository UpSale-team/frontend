import DashboardPageLayout from "../pages/Dashboard/PageLayout";
import RedirectPage from "../pages/Utils/Redirect";
import Home from "../pages/Dashboard/Home";
import LandingPage from "../pages/LandingPage/LandingPage";

const appRoutes  = [
    {path: "/",
    element: <LandingPage/>,
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