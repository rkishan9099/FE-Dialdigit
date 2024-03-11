// ** Type import
import { VerticalNavItemsType } from "@/@core/layouts/types";
import { PATH_DASHBOARD } from "@/routes/paths";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Dashboards",
      icon: "tabler:smart-home",
      badgeContent: "new",
      badgeColor: "error",
      children: [
        {
          title: "Analytics",
          path: "/dashboards/analytics",
        },
        {
          title: "CRM",
          path: "/dashboards/crm",
        },
        {
          title: "eCommerce",
          path: "/dashboards/ecommerce",
        },
      ],
    },
    {
      title: "Users",
      path: PATH_DASHBOARD.user.list,
      icon:'iconoir:user'
    },
    {
      sectionTitle: "Reports",
    },
    {
      title: "Reports",
      icon: "iconoir:reports",
      children: [
        {
          title: "Call",
          path: PATH_DASHBOARD.reports.call,
        },
      ],
    },
    {
      sectionTitle: "Phone System",
    },
    {
      title: "Phone System",
      icon: "carbon:phone-ip",
      children: [
        {
          title: "Number",
          path: PATH_DASHBOARD.numbers.list,
          icon: "fluent-emoji-high-contrast:input-numbers",
        },
      ],
    },
  ];
};

export default navigation;
