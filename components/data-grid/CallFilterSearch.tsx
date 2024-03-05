'use client';
// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import { Button, Stack } from '@mui/material'
import moment from 'moment'
import { useDateRangePicker } from '@/@core/views/form/form-element'
import IconifyIcon from '@/@core/components/icon'
import FileFilterExport from '@/@core/views/files/FileFilterExport'
import CallFilterApply from '../reports/call/CallFilterApply'

interface Props {
  onChange: (val: any) => void
  filterType: string
  onFilterType: (type: string) => void
  resetFilterType: any
  exportData: any
}

const ServerSideCallSearch = ({ onChange, filterType, onFilterType, resetFilterType, exportData }: Props) => {
  const [searchValue, setSearchValue] = useState<string | null>('')
  const [agentsName, setAgentName] = useState('')
  const pickerCalendar = useDateRangePicker(null, null)
  const [filters, setFilters] = useState<any>({
    agent: '',
    callerid: '',
    destination: '',
    direction: ''
  })

  const [expanded, setExpanded] = useState<boolean>(false)
  const toggleExpand = () => {
    if (expanded) {
      setFilters({ agent: '', callerid: '', destination_number: '', agentsName: '', direction: '' })
      pickerCalendar?.onReset && pickerCalendar?.onReset()
    }
    setExpanded(!expanded)
  }

  useEffect(() => {
    const start_date = pickerCalendar?.startDate ? moment(pickerCalendar?.startDate).format('YYYY-MM-DD') : ''
    const end_date = pickerCalendar?.endDate ? moment(pickerCalendar?.endDate).format('YYYY-MM-DD') : ''
    onChange({ SearchQuery: searchValue, filters, agentsName, start_date, end_date })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, filters, agentsName, pickerCalendar?.startDate, pickerCalendar?.endDate])

  return (
    <>
      <Box
        sx={{
          gap: 2,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: theme => theme.spacing(2, 5, 4, 5)
        }}
      >
        <TextField
          size='small'
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
          placeholder='Search…'
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <IconifyIcon icon='tabler:search' fontSize={20} />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={() => setSearchValue('')}>
                <IconifyIcon icon='tabler:x' fontSize={20} />
              </IconButton>
            )
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />
        <Stack direction='row' spacing='1'>
          <Button variant='text' onClick={toggleExpand}>
            {expanded ? 'Less' : 'More Filters'}
          </Button>

          <FileFilterExport
            filterType={filterType}
            onFilterType={onFilterType}
            optionsType={['csv']}
            onReset={resetFilterType}
            dataFiltered={exportData}
          />
        </Stack>
        {expanded && (
          <CallFilterApply
            expanded={expanded}
            filters={filters}
            setFilters={setFilters}
            setAgentName={setAgentName}
            pickerCalendar={pickerCalendar}
          />
        )}
      </Box>
    </>
  )
}

export default ServerSideCallSearch
