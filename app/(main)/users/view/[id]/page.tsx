import UserDropdown from "@/@core/layouts/components/shared-components/UserDropdown";
import UserProfile from "@/@core/views/user/user-profile/UserProfile";
import React from "react";

const UserViewPage = ({ params: { id } }: { params: { id: string } }) => {
  console.debug('user',id)
  return <h1>User View page</h1>
};

export default UserViewPage;
