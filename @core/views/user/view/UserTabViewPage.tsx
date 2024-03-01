// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Types
import UserViewLeft from "./UserViewLeft";
import UserViewRight from "./UserViewRight";
import { store } from "@/store";
import { getUserById } from "@/store/users/users";

// ** Demo Components Imports

type Props = {
  tab: string;
  id:string;
};

const UserTabViewPage = ({ tab ,id}: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab}  />
      </Grid>
    </Grid>
  );
};

export default UserTabViewPage;
