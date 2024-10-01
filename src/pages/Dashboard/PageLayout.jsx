import { Outlet, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import {
  IconHome,
  IconHomeFilled,
  IconPerspective,
  IconShare,
  IconTrash,
  IconTrashFilled,
  IconSettings,
  IconSettingsFilled,
} from "@tabler/icons-react";
import Logo from "../../components/Logo";

export default function DashboardPageLayout() {
  const navigate = useNavigate();
  const navbarItems = [
    {
      label: "Home",
      icon: <IconHome size="1rem" />,
      activeIcon: <IconHomeFilled size="1rem" />,
      action: () => navigate("/dashboard"),
    },
    {
      label: "Projects",
      icon: <IconPerspective size="1rem" />,
      activeIcon: <IconPerspective size="1rem" />,
      action: () => navigate("/dashboard/your-project"),
    },
    {
      label: "Shared",
      icon: <IconShare size="1rem" />,
      activeIcon: <IconShare size="1rem" />,
      action: () => navigate("/dashboard/shared-project"),
    },
    {
      label: "Trash",
      icon: <IconTrash size="1rem" />,
      activeIcon: <IconTrashFilled size="1rem" />,
      action: () => navigate("/dashboard/deleted-project"),
    },
  ];

  const navbarSettings = [
    {
      label: "Settings",
      icon: <IconSettings size="1rem" />,
      activeIcon: <IconSettingsFilled size="1rem" />,
      action: () => navigate("/dashboard/setting"),
    },
  ];

  return (
    <Layout navItems={navbarItems} navPostItems={navbarSettings}>
      <Outlet />
    </Layout>
  );
}
