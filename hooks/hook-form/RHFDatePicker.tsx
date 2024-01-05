import { useFormContext, Controller } from 'react-hook-form'
import { TextField, TextFieldProps } from '@mui/material'
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

type Props = TextFieldProps & {
  name: string
  label: string
}

export default function RHFDatePicker({ name, helperText, label, ...other }: Props) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <DatePicker
          onChange={onChange}
          // onBlur={onBlur}
          value={value}
          inputRef={ref}
          renderInput={(params: any) => (
            <TextField label={label} {...params} helperText={error ? error?.message : helperText} {...other} />
          )}
        />
      )}
    />
  )
}

export const RHFTimePicker = ({ name, helperText, label, ...other }: Props) => {
  const { control } = useFormContext()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
          <TimePicker
            label={label}
            value={value}
            onChange={onChange}
            inputRef={ref}
            renderInput={(params: any) => (
              <TextField label={label} {...params} helperText={error ? error?.message : helperText} {...other} />
            )}
          />
        )}
      />
    </LocalizationProvider>
  )
}
