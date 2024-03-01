"use client";
// ** React Imports
import { SyntheticEvent, useState, useEffect } from "react";

// ** Next Import

// ** MUI Imports
import Box from "@mui/material/Box";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiTab, { TabProps } from "@mui/material/Tab";
import MuiTabList, { TabListProps } from "@mui/lab/TabList";
import CircularProgress from "@mui/material/CircularProgress";

// ** Icon Imports
import Icon from "@/@core/components/icon";
import UserViewAccount from "./UserViewAccount";
import UserViewSecurity from "./UserViewSecurity";
import UserViewBilling from "./UserViewBilling";
import UserViewNotification from "./UserViewNotification";
import UserViewConnection from "./UserViewConnection";
import { useParams, useRouter } from "next/navigation";
import { PATH_DASHBOARD, UserTabs } from "@/routes/paths";

// ** Types
interface Props {
  tab: string;
}

// ** Styled Tab component
const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  flexDirection: "row",
  "& svg": {
    marginBottom: "0 !important",
    marginRight: theme.spacing(1.5),
  },
}));

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  borderBottom: "0 !important",
  "&, & .MuiTabs-scroller": {
    boxSizing: "content-box",
    padding: theme.spacing(1.25, 1.25, 2),
    margin: `${theme.spacing(-1.25, -1.25, -2)} !important`,
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  "& .Mui-selected": {
    boxShadow: theme.shadows[2],
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
  },
  "& .MuiTab-root": {
    lineHeight: 1,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
}));

type ValueOf<T> = T[keyof T];

const UserViewRight = ({ tab }: Props) => {
  // ** State
  const {id} = useParams()
  const [activeTab, setActiveTab] = useState<any>(tab);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ** Hooks
  const router = useRouter();

  const handleChange = (event: SyntheticEvent, value:any) => {
    setIsLoading(true);
    setActiveTab(value);
    router.push(`${PATH_DASHBOARD.user.list}/${id}/${value}`)
  };

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <TabContext value={activeTab}>
      <TabList
        variant="scrollable"
        scrollButtons="auto"
        onChange={handleChange}
        aria-label="forced scroll tabs example"
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Tab
          value={UserTabs.view}
          label="Account"
          icon={<Icon fontSize="1.125rem" icon="tabler:user-check" />}
        />
        <Tab
          value={UserTabs.security}
          label="Security"
          icon={<Icon fontSize="1.125rem" icon="tabler:lock" />}
        />
        <Tab
          value={UserTabs["billing-plan"]}
          label="Billing & Plan"
          icon={<Icon fontSize="1.125rem" icon="tabler:currency-dollar" />}
        />
        <Tab
          value={UserTabs.notification}
          label="Notification"
          icon={<Icon fontSize="1.125rem" icon="tabler:bell" />}
        />
       
      </TabList>
      <Box sx={{ mt: 4 }}>
        {isLoading ? (
          <Box
            sx={{
              mt: 6,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value={UserTabs.view}>
              <UserViewAccount />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value={UserTabs.security}>
              <UserViewSecurity />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value={UserTabs["billing-plan"]}>
              <UserViewBilling />
            </TabPanel>
            <TabPanel sx={{ p: 0 }} value={UserTabs.notification}>
              <UserViewNotification />
            </TabPanel>
           
          </>
        )}
      </Box>
    </TabContext>
  );
};

export default UserViewRight;