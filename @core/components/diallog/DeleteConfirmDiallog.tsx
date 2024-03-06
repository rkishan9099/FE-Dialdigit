import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  Divider,
  IconButton,
  IconButtonProps,
  Slide,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import Icon from "@/@core/components/icon";
import IconifyIcon from "@/@core/components/icon";

const CustomCloseButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  top: 0,
  right: 0,
  color: "grey.500",
  position: "absolute",
  boxShadow: theme.shadows[2],
  transform: "translate(10px, -10px)",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: `${theme.palette.background.paper} !important`,
  transition: "transform 0.25s ease-in-out, box-shadow 0.25s ease-in-out",
  "&:hover": {
    transform: "translate(7px, -5px)",
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type PropsType = {
  show: boolean;
  setShow: (toogle: boolean) => void;
  confimHandler: () => void;
  msg: string;
};

const DeleteConfirmDiallog = (props: PropsType) => {
  const { show, setShow, confimHandler, msg } = props;
  const theme = useTheme();
  return (
    <Dialog
      fullWidth
      open={show}
      scroll="body"
      maxWidth={"xs"}
      onClose={() => setShow(false)}
      TransitionComponent={Transition}
      onBackdropClick={() => setShow(false)}
      sx={{ "& .MuiDialog-paper": { overflow: "visible" } }}
    >
      <DialogContentText
        sx={{
          padding: "10px",
        }}
      >
        <CustomCloseButton onClick={() => setShow(false)}>
          <Icon icon="tabler:x" fontSize="1.25rem" />
        </CustomCloseButton>
        <Stack
          sx={{
            margin: "25px 0",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={2}>
            <Box>
              <IconifyIcon
                icon={"typcn:warning"}
                width={50}
                height={50}
                color={"red"}
              />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Delete {msg}
            </Typography>
          </Stack>
          <Typography variant="h4">Are You sure Delete this {msg}</Typography>
        </Stack>
      </DialogContentText>
      <Divider />
      <DialogActions
        sx={{
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <Button variant="contained" sx={{ mr: 1 }} onClick={confimHandler}>
          Confirm
        </Button>
        <Button
          variant="tonal"
          color="secondary"
          onClick={() => setShow(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDiallog;
