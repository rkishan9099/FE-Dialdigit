'use client'
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme
} from '@mui/material'
import React from 'react'
// ** Icon Imports
import Grid from '@mui/material/Grid'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import PickersRange from '@/@core/views/form/form-element/PickersRange'
import { ReactDatePickerProps } from 'react-datepicker'
import Icon from '@/@core/components/icon'

const CallFilterApply = ({
  expanded,
  filters,
  setFilters,
  setAgentName,
  pickerCalendar
}: {
  expanded: boolean
  filters: any
  setFilters: any
  setAgentName: any
  pickerCalendar: any
}) => {
  const theme = useTheme()
  const { direction } = theme
  const popperPlacement: ReactDatePickerProps['popperPlacement'] = direction === 'ltr' ? 'bottom-start' : 'bottom-end'

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DatePickerWrapper>
            <PickersRange
              popperPlacement={popperPlacement}
              title='Select Date'
              startDate={pickerCalendar.startDate}
              endDate={pickerCalendar.endDate}
              onChangeStartDate={pickerCalendar.onChangeStartDate}
              onChangeEndDate={pickerCalendar.onChangeEndDate}
              open={pickerCalendar.open}
              onClose={pickerCalendar.onClose}
              isSelected={pickerCalendar.isSelected}
              isError={pickerCalendar.isError}
            />
          </DatePickerWrapper>
        </Grid>
       
        {/* <Grid item xs={4}>
          <TextField
            size='small'
            value={filters.agent}
            onChange={event => setFilters({ ...filters, agent: event.target.value })}
            placeholder='Agent Extention'
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='tabler:search' fontSize={20} />
                </Box>
              ),
              endAdornment: (
                <IconButton
                  size='small'
                  title='Clear'
                  aria-label='Clear'
                  onClick={() => setFilters({ ...filters, agent: '' })}
                >
                  <Icon icon='tabler:x' fontSize={20} />
                </IconButton>
              )
            }}
            sx={{
              width: {
                xs: 1,
                sm: '100%'
              },
              '& .MuiInputBase-root > svg': {
                mr: 2
              }
            }}
          />
        </Grid> */}
        <Grid item xs={4}>
          <TextField
            size='small'
            value={filters.callerid}
            onChange={event => setFilters({ ...filters, callerid: event.target.value })}
            placeholder='Caller Id'
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='tabler:search' fontSize={20} />
                </Box>
              ),
              endAdornment: (
                <IconButton
                  size='small'
                  title='Clear'
                  aria-label='Clear'
                  onClick={() => setFilters({ ...filters, callerid: '' })}
                >
                  <Icon icon='tabler:x' fontSize={20} />
                </IconButton>
              )
            }}
            sx={{
              width: {
                xs: 1,
                sm: '100%'
              },
              '& .MuiInputBase-root > svg': {
                mr: 2
              }
            }}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            size='small'
            value={filters.destination_number}
            onChange={event => setFilters({ ...filters, destination_number: event.target.value })}
            placeholder='Destination'
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='tabler:search' fontSize={20} />
                </Box>
              ),
              endAdornment: (
                <IconButton
                  size='small'
                  title='Clear'
                  aria-label='Clear'
                  onClick={() => setFilters({ ...filters, destination_number: '' })}
                >
                  <Icon icon='tabler:x' fontSize={20} />
                </IconButton>
              )
            }}
            sx={{
              width: {
                xs: 1,
                sm: '100%'
              },
              '& .MuiInputBase-root > svg': {
                mr: 2
              }
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl sx={{ width: '100%' }} size='small'>
            <InputLabel id='demo-select-small-label'>Call Direction</InputLabel>
            <Select
              labelId='demo-select-small-label'
              id='demo-select-small'
              value={filters.direction}
              label='Call Direction'
              onChange={(e: SelectChangeEvent) => {
                setFilters({ ...filters, direction: e.target.value })
              }}
            >
              <MenuItem value=''>Select Dierction</MenuItem>
              <MenuItem value={'INBOUND'}>INBOUND</MenuItem>
              <MenuItem value={'OUTBOUND'}>OUTBOUND</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default CallFilterApply
