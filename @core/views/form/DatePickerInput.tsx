// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'


interface PickerProps {
  label?: string
  start: Date | number
}

type DateType = Date | null | undefined

interface PickersRangeProps {
  onChange: (val: string) => void
}

const DatePickerInput = (props: PickersRangeProps) => {
  const { onChange } = props;

  // ** States
  const [startDateRange, setStartDateRange] = useState<DateType | null>(null)

  const handleOnChangeRange = (dates: any) => {
    const start = dates
    setStartDateRange(start);
    onChange(format(dates, 'MM-dd-yyyy'));
  }

  // eslint-disable-next-line react/display-name
  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : null;
    const value = `${startDate !== null ? startDate : ''}`

    return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} size='small' sx={{ width: '100%' }} />
  })

  return (
    <Box sx={{ width: '100%' }}>
      <DatePicker
        monthsShown={1}
        selected={startDateRange}
        startDate={startDateRange}
        shouldCloseOnSelect={true}
        id='date-range-picker-months'
        onChange={handleOnChangeRange}
        customInput={
          <CustomInput
            label='Payment Date'
            start={startDateRange as Date | number}
          />
        }
      />
    </Box>
  )
}

export default DatePickerInput
