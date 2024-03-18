/* eslint-disable react-hooks/exhaustive-deps */
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
import { Stack } from "@mui/material";
import TableHeader from "@/@core/views/Table/TableHeader";
import { useRouter } from "next/navigation";
import {
  deleteNumber,
  fetchNumbers,
  releaseNumber,
} from "@/store/dialer/number/number";
import { formatPhoneNumber } from "@/lib/Sip/sip-utils";

// ** Custom Table Components Imports

interface UserRoleChipType {
  [key: string]: { icon: string; color: string };
}

interface NumberStatusType {
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

const numberStatusObj: NumberStatusType = {
  Active: "success",
  Pending: "warning",
  Release: "error",
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

  const releaseNumberHandle = async () => {
    const res: any = await dispatch(releaseNumber(id));
    if (res && res?.status === "success") {
      toast.success(res?.message);
      dispatch(fetchNumbers());
    } else {
      toast.error(res?.message);
    }
    setAnchorEl(null);
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
        <MenuItem onClick={releaseNumberHandle} sx={{ "& svg": { mr: 2 } }}>
          <Icon icon="humbleicons:arrow-go-forward" fontSize={20} />
          Release Number
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

const NumberList = () => {
  // ** State
  const [value, setValue] = useState<string>("");
  const { numbers, isLoading } = useAppSelector((state) => state.number);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchNumbers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditUser = async (id: string) => {
    dispatch(getUserById(id));
    setIsEdit(true);
  };

  const confimDeleteHandler = (id: string) => {
    setConfirmDelete(id);
    setOpen(true);
  };

  const handleSearch = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    dispatch(fetchNumbers({ searchQuery: value }));
  }, [value]);

  const columns: GridColDef[] = [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: "Number",
      field: "number",
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
            {row?.numberDetails?.friendlyName || formatPhoneNumber(row?.number)}
          </Typography>
        );
      },
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: "assignUser",
      headerName: "Assign User",
      renderCell: ({ row }: CellType) => {
        return (
          <Stack>
            {row?.assignUser?.length > 0 ? (
              <Stack>
                {row?.assignUser?.map((user: any) => (
                  <CustomChip
                    key={user?._id}
                    rounded
                    skin="light"
                    size="small"
                    label={`${user?.firstName} ${user?.lastName}`}
                    color={"success"}
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  />
                ))}
              </Stack>
            ) : (
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={"NA"}
                color={"error"}
                sx={{ textTransform: "capitalize" }}
              />
            )}
          </Stack>
        );
      },
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: "extention",
      headerName: "Extension",
      renderCell: ({ row }: CellType) => {
        return (
          <Stack>
            {row?.assignExtention?.length > 0 ? (
              <Stack>
                {row?.assignExtention?.map((extention: any) => (
                  <CustomChip
                    key={extention}
                    rounded
                    skin="light"
                    size="small"
                    label={extention}
                    color={"info"}
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  />
                ))}
              </Stack>
            ) : (
              <CustomChip
                rounded
                skin="light"
                size="small"
                label={"NA"}
                color={"error"}
                sx={{ textTransform: "capitalize" }}
              />
            )}
          </Stack>
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
            label={row.status}
            color={numberStatusObj[row?.status]}
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

  const deleteNumberHandler = async () => {
    const res: any = await dispatch(deleteNumber(confirmDelete));
    setConfirmDelete("");
    setOpen(false);
    if (res?.statusCode === 200 && res?.status === "success") {
      toast.success(res?.message);
      dispatch(fetchNumbers());
    } else {
      toast.error(res?.message);
    }
  };

  const addNumberHandle = () => {
    router.replace(PATH_DASHBOARD.numbers.add);
  };

  return (
    <>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <CardHeader title="Numbers" />

              <TableHeader
                value={value}
                handleFilter={handleSearch}
                buttonLabel="Add Number"
                onClickHandle={addNumberHandle}
              />
            </Stack>

            <DataGrid
              getRowId={(row) => row._id} // Specify the _id property as the unique identifierssss
              rowHeight={75}
              autoHeight
              rows={numbers || []}
              rowCount={numbers?.length || 0}
              columns={columns}
              loading={isLoading}
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50, 100]}
            />
          </Card>
        </Grid>
      </Grid>
      <DeleteConfirmDiallog
        show={open}
        setShow={setOpen}
        confimHandler={deleteNumberHandler}
        msg={"Number"}
      />
    </>
  );
};

export default NumberList;
