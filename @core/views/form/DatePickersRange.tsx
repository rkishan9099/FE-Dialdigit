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
  end: Date | number
  start: Date | number
}

type DateType = Date | null | undefined

interface PickersRangeProps {
  onChange: (val: any) => void
}

const DatePickersRange = (props: PickersRangeProps) => {
  const { onChange } = props;

  // ** States
  const [startDateRange, setStartDateRange] = useState<DateType | null>(null)
  const [endDateRange, setEndDateRange] = useState<DateType | null>(null)

  const handleOnChangeRange = (dates: any) => {
    console.log(dates)
    const [start, end] = dates
    setStartDateRange(start);
    setEndDateRange(end);
    if (start && end)
      onChange([format(start, 'MM-dd-yyyy'), format(end, 'MM-dd-yyyy')]);
  }

  // eslint-disable-next-line react/display-name
  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start ? format(props.start, 'MM/dd/yyyy') : null;
    const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null
    const value = `${startDate !== null ? startDate : ''}${endDate !== null ? endDate : ''}`
    
    return <TextField inputRef={ref} label={props.label || ''} {...props} value={value} size='small' sx={{ width: '100%' }} autoComplete={'off'} />
  })

  return (
    <Box sx={{ width: '100%' }}>
      <DatePicker
        selectsRange
        monthsShown={1}
        endDate={endDateRange}
        selected={startDateRange}
        startDate={startDateRange}
        shouldCloseOnSelect={true}
        id='date-range-picker-months'
        onChange={handleOnChangeRange}
        customInput={
          <CustomInput
            label='Select Date Range'
            end={endDateRange as Date | number}
            start={startDateRange as Date | number}
          />
        }
      />
    </Box>
  )
}

export default DatePickersRange
