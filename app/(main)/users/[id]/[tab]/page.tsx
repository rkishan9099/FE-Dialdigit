import UserProfile from "@/@core/views/user/user-profile/UserProfile";
import UserTabViewPage from "@/@core/views/user/view/UserTabViewPage";
import UserViewRight from "@/@core/views/user/view/UserViewRight";
import { PATH_DASHBOARD, UserTabs } from "@/routes/paths";
import { redirect } from "next/navigation";
import React from "react";

const UserTabList = ({ params }: { params: any }) => {
  const { tab, id } = params;
  !Object.values(UserTabs).includes(tab) && redirect(PATH_DASHBOARD.user.list);

  return <UserTabViewPage tab={tab.toString()} id={id}/>;
};

export default UserTabList;
