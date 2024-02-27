"use client";
/* eslint-disable react-hooks/exhaustive-deps */
// ** React Imports
import { useState, useEffect, useCallback } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// ** Store Imports
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CustomChip from "@/@core/components/mui/chip";
import { IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { AppDispatch, RootState } from "@/store";
import { formatPhoneNumber } from "@/lib/Sip/sip-utils";
import { secondsToHms } from "@/Utils/utils";
import IconifyIcon from "@/@core/components/icon";
import { getCallReports } from "@/store/reports/calls";
import AudioPlayer from "./AudioPlayer";
import ServerSideCallSearch from "@/components/data-grid/CallFilterSearch";

interface CellType {
  row: any;
}

const ROW_PROPS = {
  fontWeight: 500,
  color: "text.secondary",
  textTransform: "capitalize",
  fontSize: 14,
};

const CallDispositionChip = (disposition: any) => {
  let dispostion_label = "";

  switch (disposition) {
    case "INVALID_URL":
      dispostion_label = "Url Invalid";
      break;
    case "MANAGER_REQUEST":
      dispostion_label = "Force Hangup";
      break;
    case "NORMAL_CLEARING":
      dispostion_label = "Answered";
      break;
    case "CALL_REJECTED":
      dispostion_label = "Rejected Call";
      break;
    case "USER_BUSY":
      dispostion_label = "User Busy";
      break;
    case "NO_ANSWER":
      dispostion_label = "No Answered";
      break;
    case "NORMAL_TEMPORARY_FAILURE":
      dispostion_label = "Call Failed";
      break;
    case "ORIGINATOR_CANCEL":
      dispostion_label = "Call Canceled";
      break;
    default:
      dispostion_label = "Service Unavailable";
      break;
  }

  return (
    <CustomChip
      rounded
      skin="light"
      size="small"
      label={dispostion_label}
      color="warning"
      sx={{ textTransform: "capitalize" }}
    />
  );
};

const CallReports = () => {
  // ** State
  const theme = useTheme();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [tempPaginationModel, setTempPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [audioid, setAudioId] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [openAudio, setOpenAudio] = useState(false);
  const [audioPlay, setAudioPlay] = useState(false);

  const [exportType, setExportType] = useState("");

  const { user } = useAuth();

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>();

  const store = useSelector((state: RootState) => state.callReports);

  const [SearchQuery, setSearchQuery] = useState<any>({});
  let timer: any;

  const playPauseHandler = (id: string, src: string) => {
    setOpenAudio(true);

    const element: any = document && document.getElementById(id);

    if (id === audioid && audioPlay) {
      element && element.pause();
      setAudioPlay(false);
    } else {
      element && element.play();
      setAudioPlay(true);
    }

    setAudioId(id);
    setAudioSrc(src);
  };

  const closeAudioHandler = () => {
    setOpenAudio(false);
    setAudioId("");
    setAudioSrc("");
    setAudioPlay(false);
  };

  const columns: GridColDef[] = [
    {
      minWidth: 170,
      headerName: "Agent Name",
      field: "name",
      renderCell: ({ row }: CellType) => {
        return (
          <Box
            sx={{ display: "flex", alignItems: "center", padding: "10px 0" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
                <Tooltip
                  title={
                    [undefined, null, "", "called"].includes(
                      row?.outbound_call_type
                    )
                      ? "Cold Dialing"
                      : "Dialer"
                  }
                >
                  <IconButton
                    sx={{
                      borderRadius: "2px",
                      padding: "2px",
                      marginRight: "8px",
                    }}
                    color={
                      [undefined, null, "", "called"].includes(
                        row?.outbound_call_type
                      )
                        ? "success"
                        : "primary"
                    }
                  >
                    {[undefined, null, "", "called"].includes(
                      row?.outbound_call_type
                    ) ? (
                      <IconifyIcon icon="fluent:call-outbound-16-filled" />
                    ) : (
                      <IconifyIcon icon="mdi:phone-dial" />
                    )}
                  </IconButton>
                </Tooltip>
                {row.name}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      minWidth: 100,
      headerName: "agent",
      field: "Agent",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {formatPhoneNumber(row?.caller_id_number)}
            </Typography>
          </Box>
        );
      },
    },
    {
      minWidth: 150,
      headerName: "Caller Id",
      field: "callerid",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {formatPhoneNumber(row?.callerid)}
            </Typography>
          </Box>
        );
      },
    },
    {
      minWidth: 150,
      headerName: "Destination",
      field: "destination",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {formatPhoneNumber(row?.callee_id_number)}
            </Typography>
          </Box>
        );
      },
    },

    {
      minWidth: 150,
      headerName: "Call Start",
      field: "callstart",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {moment(row?.callstart).format("MM-DD-YYYY HH:MM A")}
            </Typography>
          </Box>
        );
      },
    },

    {
      minWidth: 100,
      headerName: "Billsec",
      field: "billsec",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {secondsToHms(row?.billsec)}
            </Typography>
          </Box>
        );
      },
    },

    {
      minWidth: 100,
      headerName: "DTMF",
      field: "DTMF",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {row?.digits_dialed}
            </Typography>
          </Box>
        );
      },
    },
    {
      minWidth: 120,
      headerName: "Direction",
      field: "direction",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {row?.direction !== "" ? row?.direction : "OUTBOUND"}
            </Typography>
          </Box>
        );
      },
    },

    {
      minWidth: 170,
      headerName: "Dispostion",
      field: "disposition",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            {CallDispositionChip(row?.disposition)}
          </Box>
        );
      },
    },
    {
      minWidth: 100,
      headerName: "Result",
      field: "custom_disposition",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {![undefined, null, ""].includes(row?.custom_disposition) && (
                <CustomChip
                  rounded
                  skin="light"
                  size="small"
                  label={row?.custom_disposition}
                  color="success"
                  sx={{ textTransform: "capitalize" }}
                />
              )}
            </Typography>
          </Box>
        );
      },
    },

    {
      minWidth: 150,
      headerName: "Recordings",
      field: "recording_path",
      renderCell: ({ row }: any) => {
        return (
          <Box
            sx={{ display: "flex", flexDirection: "column", padding: "10px 0" }}
          >
            <Typography noWrap sx={{ ...ROW_PROPS, textTransform: "none" }}>
              {/* {!['recording', '', null].includes(row?.recording_path) && row?.billsec > 5 && (
                <audio
                  onPlay={() => currenPlayAudio(`audio${row?.freeswitch_call_uuid.replaceAll('-', '')}`)}
                  id={`audio${row?.freeswitch_call_uuid.replaceAll('-', '')}`}
                  style={{ width: '220px' }}
                  src={process.env.RECORDING_PATH + row?.recording_path}
                  controls
                  loop
                />
              )} */}
              {!["recording", "", null].includes(row?.recording_path) &&
                row?.billsec > 5 && (
                  <>
                    <IconButton
                      sx={{
                        width: "40px",
                        height: "40px",
                        background:
                          theme.palette.mode === "light"
                            ? "rgba(115, 103, 240, 0.16)"
                            : "rgb(115 103 240 / 66%)",
                        borderRadius: "9px",
                        color:
                          theme.palette.mode === "light"
                            ? "#7367F0"
                            : "#c9c5f5",
                      }}
                      onClick={() =>
                        playPauseHandler(
                          `audio${row?.freeswitch_call_uuid.replaceAll(
                            "-",
                            ""
                          )}`,
                          // 'https://auxout.s3.amazonaws.com/dev-recordings/2023-07-27/518efbb4-0bdf-43e6-b26c-737b139e75b4.wav'
                          `${process.env.RECORDING_PATH}${row?.recording_path}`
                        )
                      }
                    >
                      {!(
                        audioPlay &&
                        audioid ===
                          `audio${row?.freeswitch_call_uuid.replaceAll(
                            "-",
                            ""
                          )}`
                      ) && <IconifyIcon icon="solar:play-bold" />}
                      {audioPlay &&
                        audioid ===
                          `audio${row?.freeswitch_call_uuid.replaceAll(
                            "-",
                            ""
                          )}` && <IconifyIcon icon="solar:pause-bold" />}
                    </IconButton>
                    <IconButton
                      sx={{
                        width: "40px",
                        height: "40px",
                        background:
                          theme.palette.mode === "light"
                            ? "rgba(115, 103, 240, 0.16)"
                            : "rgb(115 103 240 / 66%)",
                        borderRadius: "9px",
                        color:
                          theme.palette.mode === "light"
                            ? "#7367F0"
                            : "#c9c5f5",
                        marginLeft: "10px",
                      }}
                      onClick={() =>
                        downloadHandler(
                          `${process.env.RECORDING_PATH}${row?.recording_path}`,
                          `recording_${row?.callstart}.wav`
                        )
                      }
                    >
                      <IconifyIcon icon="ph:download-fill" />
                    </IconButton>
                  </>
                )}

              {["recording", "", null].includes(row?.recording_path) ||
                (row?.billsec <= 5 && <span>N/A</span>)}
            </Typography>
          </Box>
        );
      },
    },
  ];

  useEffect(() => {
    fetchList();
  }, [tempPaginationModel, SearchQuery]);

  const fetchList = useCallback(() => {
    dispatch(
      getCallReports({
        ...SearchQuery,
        page: paginationModel.page,
        size: paginationModel.pageSize,
      })
    );
  }, [paginationModel, tempPaginationModel, SearchQuery]);

  const handlePageChange = useCallback((val: any) => {
    setPaginationModel(val);
    setTempPaginationModel(val);
  }, []);

  const handleSearch = (value: any) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchQuery(value);
    }, 1000);
  };

  const handleExportType = (value: string) => {
    setPaginationModel({ page: 0, pageSize: paginationModel?.pageSize || 10 });
    setExportType(value);
  };
  const downloadHandler = async (url: any, filename: any) => {
    const data = await fetch(url);
    const blob = await data.blob();
    const objectUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.setAttribute("href", objectUrl);
    link.setAttribute("download", filename);
    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  return (
    <>
      <Grid container spacing={6.5}>
        <Grid item xs={12}>
          <Card>
            <DataGrid
              getRowId={(row) => row._id} // Specify the _id property as the unique identifierssss
              rowHeight={75}
              autoHeight
              rows={store.callReports}
              rowCount={store.total}
              columns={columns}
              loading={store.isLoading}
              paginationMode="server"
              disableRowSelectionOnClick
              pageSizeOptions={[10, 25, 50, 100]}
              paginationModel={paginationModel}
              onPaginationModelChange={handlePageChange}
              slots={{ toolbar: ServerSideCallSearch }}
              slotProps={{
                toolbar: {
                  onChange: (value: any) => handleSearch(value),
                  filterType: exportType,
                  onFilterType: handleExportType,
                  resetFilterType: () => setExportType(""),
                  exportData: store?.allCall,
                },
              }}
            />
          </Card>
        </Grid>
      </Grid>
      <Stack
        sx={{ position: "fixed", bottom: "20px", zIndex: 99999, right: "10px" }}
      >
        {openAudio && (
          <AudioPlayer
            id={audioid}
            src={audioSrc}
            closeHandle={closeAudioHandler}
            openAudio={openAudio}
          />
        )}
      </Stack>
    </>
  );
};

export default CallReports;
