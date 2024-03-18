"use client";
import { CustomRadioBasicData } from "@/@core/components/custom-radio/types";
import React, { ChangeEvent, useEffect, useState } from "react";
import CustomChip from "@/@core/components/mui/chip";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Stack,
  Theme,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import CustomRadioBasic from "@/@core/components/custom-radio/basic";

import PerfectScrollbarComponent from "react-perfect-scrollbar";
import CustomTextField from "@/@core/components/mui/text-field";
import CustomAvatar from "@/@core/components/mui/avatar";
import { ThemeColor } from "@/@core/layouts/types";
import { getInitials } from "@/@core/utils/get-initials";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { getUsersList } from "@/store/users/users";

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: "30rem",
});

const renderName = (row: any) => {
  if (row.avatar) {
    return (
      <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
    );
  } else {
    return (
      <CustomAvatar
        skin="light"
        color={(row.avatarColor as ThemeColor) || ("primary" as ThemeColor)}
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontSize: (theme) => theme.typography.body1.fontSize,
        }}
      >
        {getInitials(`${row?.firstName} ${row.lastName}`)}
      </CustomAvatar>
    );
  }
};

type PropsType = {
  assignUser: string[];
  setAssignUser: (userIds: any) => void;
};

const AssignNumber = (props: PropsType) => {
  const { assignUser, setAssignUser } = props;
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsersList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectUserHandle = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setAssignUser((prev: any) => [...prev, e.target.value]);
    } else {
      setAssignUser((prev: any) =>
        prev.filter((item: string) => item !== e.target.value)
      );
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%", padding: "15px" }}>
      <Grid container>
        <Grid item xs={12} sm={4} mb={4}>
          <CustomTextField
            label={"Search User"}
            type="search"
            fullWidth
            placeholder=""
          />
        </Grid>
      </Grid>
      <PerfectScrollbar
        options={{ wheelPropagation: false, suppressScrollX: true }}
      >
        <Grid container spacing={2}>
          {users &&
            users?.length > 0 &&
            users?.map((user: any) => {
              return (
                <Grid item md={4} key={user?._id}>
                  <Box
                    sx={{
                      p: 4,
                      height: "100%",
                      display: "flex",
                      borderRadius: 1,
                      cursor: "pointer",
                      position: "relative",
                      alignItems: "flex-start",
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                      ...(assignUser.includes(user?._id)
                        ? { borderColor: `primary.main` }
                        : {
                            "&:hover": {
                              borderColor: (theme) =>
                                `rgba(${theme.palette.customColors.main}, 0.25)`,
                            },
                          }),
                
                    }}
                  >
                    <Stack sx={{ width: "100%", height: "100%" }}>
                      <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        sx={{ width: "100%" }}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          {renderName(user)}{" "}
                          {`${user?.firstName} ${user.lastName}`}
                        </Typography>
                        <FormControlLabel
                          label=""
                          sx={{ margin: "-16px -13px 0px 0px" }}
                          control={
                            <Checkbox
                              defaultChecked
                              name="color-primary"
                              onChange={selectUserHandle}
                              value={user?._id}
                            />
                          }
                        />
                      </Stack>
                      <Divider>Extention </Divider>
                      <Stack sx={{ marginTop: "10px" }}>
                        <Stack>
                          {user?.extention?.length > 0 ? (
                            <>
                              {user?.extention?.map((extention: any) => (
                                <CustomChip
                                  key={extention?._id}
                                  rounded
                                  skin="light"
                                  size="small"
                                  label={extention?.username}
                                  color={"info"}
                                  sx={{
                                    textTransform: "capitalize",
                                    fontWeight: 600,
                                  }}
                                />
                              ))}
                            </>
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
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </PerfectScrollbar>
    </Stack>
  );
};

export default AssignNumber;
