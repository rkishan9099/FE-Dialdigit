import { Box, Button } from "@mui/material";
import React from "react";
import Icon from "@/@core/components/icon";
import CustomTextField from "@/@core/components/mui/text-field";

interface TableHeaderProps {
  value?: string;
  handleFilter?: (val: string) => void;
  searchLable?: string;
  isExport?: boolean;
  onClickHandle: () => void;
  buttonLabel: string;
}
const TableHeader = (props: TableHeaderProps) => {
  const {
    handleFilter,
    value,
    searchLable = "Search",
    isExport = false,
    buttonLabel,
    onClickHandle,
  } = props;

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {isExport && (
        <Button
          color="secondary"
          variant="tonal"
          startIcon={<Icon icon="tabler:upload" />}
        >
          Export
        </Button>
      )}
      <Box
        sx={{
          rowGap: 2,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder={searchLable}
          onChange={(e) => handleFilter && handleFilter(e.target.value)}
        />

        <Button
          onClick={onClickHandle}
          variant="contained"
          sx={{ "& svg": { mr: 2 } }}
        >
          <Icon fontSize="1.125rem" icon="tabler:plus" />
          {buttonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
