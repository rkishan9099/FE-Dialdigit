// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import moment from 'moment'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateRangePickerProps } from './types'

interface CustomPickerProps extends DateRangePickerProps {
  popperPlacement: ReactDatePickerProps['popperPlacement']
}

const PickersRange = ({
  popperPlacement,
  title = 'Select date range',
  //
  startDate,
  endDate,
  //
  onChangeStartDate,
  onChangeEndDate
}: CustomPickerProps) => {
  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    if (onChangeStartDate) onChangeStartDate(start)
    if (onChangeEndDate) onChangeEndDate(end)
  }

  const CustomInput = forwardRef((props, ref) => {
    const StartDate = startDate !== null ? `${moment(startDate).format('MM-DD-YYYY')}` : null
    const EndDate = endDate !== null ? `${moment(endDate).format('MM-DD-YYYY')}` : null
    const value = `${StartDate !== null ? StartDate : ''}  ${EndDate !== null ? `to ${EndDate}` : ''}`
    // alert(`${StartDate} , ${EndDate} , ${value}`)

    return <TextField size='small' inputRef={ref} label={title || ''} {...props} value={value} sx={{ width: '100%' }} />
  })

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
      <DatePicker
        selectsRange
        endDate={endDate}
        selected={startDate}
        startDate={startDate}
        id='date-range-picker'
        onChange={handleOnChange}
        shouldCloseOnSelect={false}
        popperPlacement={popperPlacement}
        customInput={<CustomInput />}
        // ='100%'
      />
    </Box>
  )
}

export default PickersRange
