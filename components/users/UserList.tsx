"use client";
// ** React Imports
import { useState, useEffect, MouseEvent, useCallback } from "react";

// ** Next Imports
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next/types";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Menu from "@mui/material/Menu";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { SelectChangeEvent } from "@mui/material/Select";

// ** Icon Imports
import Icon from "@/@core/components/icon";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";

// ** Custom Components Imports
import CustomChip from "@/@core/components/mui/chip";
import CustomAvatar from "@/@core/components/mui/avatar";
import CustomTextField from "@/@core/components/mui/text-field";

// ** Utils Import
import { getInitials } from "@/@core/utils/get-initials";

// ** Actions Imports

// ** Types Imports
import { RootState, AppDispatch } from "@/store";
import { ThemeColor } from "@/@core/layouts/types";
import { UserRoleType, UsersType } from "@/types/apps/userTypes";
import TableHeader from "@/@core/views/user/list/TableHeader";
import SidebarAddUser from "@/@core/views/user/list/AddUserDrawer";
import {
  deleteUser,
  getUserById,
  getUserRoles,
  getUsersList,
} from "@/store/users/users";
import { useAppSelector } from "@/lib/redux/store";
import { PATH_DASHBOARD } from "@/routes/paths";
import DeleteConfirmDiallog from "@/@core/components/diallog/DeleteConfirmDiallog";
import toast from "react-hot-toast";

// ** Custom Table Components Imports

interface UserRoleChipType {
  [key: string]: { icon: string; color: string };
}

interface UserStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: any;
}

// ** renders client column
const userRoleObj: UserRoleChipType = {
  MASTER_ADMIN: { icon: "tabler:device-laptop", color: "secondary" },
  SUPER_ADMIN: { icon: "tabler:circle-check", color: "success" },
  ADMIN: { icon: "tabler:edit", color: "info" },
  USER: { icon: "tabler:chart-pie-2", color: "primary" },
  DEALER: { icon: "tabler:user", color: "warning" },
  AGENT: { icon: "tabler:user", color: "warning" },
};

const userStatusObj: UserStatusType = {
  1: "success",
  2: "warning",
  0: "secondary",
};

// ** renders client column
const renderClient = (row: any) => {
  if (row?.avatar?.length) {
    return (
      <CustomAvatar src={row?.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={row.avatarColor}
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
      >
        {getInitials(row?.firstName ? `${row.firstName} ${row?.lastName}` : "")}
      </CustomAvatar>
    );
  }
};

const RowOptions = ({
  id,
  setIsEdit,
  deleteHandler,
}: {
  id: string;
  setIsEdit: any;
  deleteHandler: any;
}) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const editUser = () => {
    setIsEdit(id);
  };

  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="tabler:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{ style: { minWidth: "8rem" } }}
      >
        <MenuItem
          component={Link}
          sx={{ "& svg": { mr: 2 } }}
          href={PATH_DASHBOARD.user.tab.view(id)}
          onClick={handleRowOptionsClose}
        >
          <Icon icon="tabler:eye" fontSize={20} />
          View
        </MenuItem>
        <MenuItem onClick={editUser} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="tabler:edit" fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem
          sx={{ "& svg": { mr: 2 } }}
          onClick={() => {
            deleteHandler(id);
            setAnchorEl(null);
          }}
        >
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const UserList = () => {
  // ** State
  const { roles } = useSelector((state: RootState) => state.users);
  const [role, setRole] = useState<string>("");
  const [plan, setPlan] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const store = useAppSelector((state) => state.users);
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>({
    role: "",
    status: "",
    searchQuery: "",
  });
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const handleFilter = useCallback((val: string) => {
    setValue(val);
    setFilter({ ...filter, searchQuery: val });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRoleChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setRole(e.target.value as string);
    setFilter({ ...filter, role: e.target.value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStatusChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setStatus(e.target.value as string);
    setFilter({ ...filter, status: e.target.value });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen);

  const handlePageChange = useCallback((val: any) => {
    setPaginationModel(val);
  }, []);

  useEffect(() => {}, [paginationModel, role, status]);

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getUserRoles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = useCallback(() => {
    dispatch(getUsersList({ ...paginationModel, filters: filter }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, paginationModel]);

  useEffect(() => {
    fetchUser();
  }, [filter, paginationModel]);

  const handleEditUser = async (id: string) => {
    dispatch(getUserById(id));
    setIsEdit(true);
    setAddUserOpen(true);
  };

  const confimDeleteHandler = (id: string) => {
    setOpen(true);
    setConfirmDelete(id);
  };
  const columns: GridColDef[] = [
    {
      flex: 0.25,
      minWidth: 280,
      field: "fullName",
      headerName: "User",
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {renderClient(row)}
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography
                noWrap
                component={Link}
                href={PATH_DASHBOARD.user.tab.view(row?._id)}
                sx={{
                  fontWeight: 500,
                  textDecoration: "none",
                  color: "text.secondary",
                  "&:hover": { color: "primary.main" },
                }}
              >
                {`${row?.firstName} ${row?.lastName}`}
              </Typography>
              <Typography
                noWrap
                variant="body2"
                sx={{ color: "text.disabled" }}
              >
                {row?.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.15,
      field: "role",
      minWidth: 170,
      headerName: "Role",
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomAvatar
              skin="light"
              sx={{ mr: 4, width: 30, height: 30 }}
              color={
                (userRoleObj[row.roles?.role].color as ThemeColor) || "primary"
              }
            >
              <Icon icon={userRoleObj[row.roles?.role].icon} />
            </CustomAvatar>
            <Typography
              noWrap
              sx={{ color: "text.secondary", textTransform: "capitalize" }}
            >
              {row.roles?.name}
            </Typography>
          </Box>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: "Mobile",
      field: "mobile",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography
            noWrap
            sx={{
              fontWeight: 500,
              color: "text.secondary",
              textTransform: "capitalize",
            }}
          >
            {row?.mobile}
          </Typography>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: "status",
      headerName: "Status",
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={row.status === 1 ? "Active" : "In-Active"}
            color={userStatusObj[row?.status]}
            sx={{ textTransform: "capitalize" }}
          />
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: "actions",
      headerName: "Actions",
      renderCell: ({ row }: CellType) => (
        <RowOptions
          id={row._id}
          setIsEdit={handleEditUser}
          deleteHandler={confimDeleteHandler}
        />
      ),
    },
  ];

  const deleteUserHandler = async () => {
    const res: any = await dispatch(deleteUser(confirmDelete));
    if (res?.statusCode === 200 && res?.status === "success") {
      setOpen(false);
      toast.success(res?.message);
      dispatch(getUsersList());
    } else {
      toast.error(res?.message);
    }
  };
  useEffect(() => {
    fetchUser();
  }, [filter, paginationModel]);

  return (
    <>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Search Filters" />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item sm={4} xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue="Select Role"
                    SelectProps={{
                      value: role,
                      displayEmpty: true,
                      onChange: (e) => handleRoleChange(e),
                    }}
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    {roles &&
                      roles?.length > 0 &&
                      roles?.map((role) => (
                        <MenuItem key={role?._id} value={role?._id}>
                          {role.name}
                        </MenuItem>
                      ))}
                  </CustomTextField>
                </Grid>

                <Grid item sm={4} xs={12}>
                  <CustomTextField
                    select
                    fullWidth
                    defaultValue="Select Status"
                    SelectProps={{
                      value: status,
                      displayEmpty: true,
                      onChange: (e) => handleStatusChange(e),
                    }}
                  >
                    <MenuItem value="">Select Status</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                    <MenuItem value="0">Inactive</MenuItem>
                  </CustomTextField>
                </Grid>
              </Grid>
            </CardContent>
            <Divider sx={{ m: "0 !important" }} />
            <TableHeader
              value={value}
              handleFilter={handleFilter}
              toggle={toggleAddUserDrawer}
            />
            <DataGrid
              getRowId={(row) => row._id} // Specify the _id property as the unique identifierssss
              rowHeight={75}
              autoHeight
              rows={store.users}
              rowCount={store.total}
              columns={columns}
              loading={store.isLoading}
              paginationMode="server"
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50, 100]}
              paginationModel={paginationModel}
              onPaginationModelChange={handlePageChange}
            />
          </Card>
        </Grid>

        <SidebarAddUser
          open={addUserOpen}
          toggle={toggleAddUserDrawer}
          isEdit={isEdit}
        />
      </Grid>
      <DeleteConfirmDiallog
        show={open}
        setShow={setOpen}
        confimHandler={deleteUserHandler}
        msg={"User"}
      />
    </>
  );
};

export default UserList;
