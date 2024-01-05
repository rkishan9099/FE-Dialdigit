// form
import { useFormContext, Controller } from 'react-hook-form'
// @mui
import {
  FormHelperText,
  FormControlLabel,
  FormControlLabelProps,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  styled,
  useRadioGroup
} from '@mui/material'

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean
}

interface RHFRadioProps extends Omit<FormControlLabelProps, 'control' | 'label'> {
  name: string
  options: { label: string; value: any }[]
  grid?: boolean
  gridColumn?: number
  row?: boolean
  label?: string
  spacing?: number
  helperText?: React.ReactNode
  defaultValue?: string
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main
    }
  })
)

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup()

  let checked = false

  if (radioGroup) {
    checked = radioGroup.value === props.value
  }

  return <StyledFormControlLabel checked={checked} {...props} />
}

export function RHFRadio({ grid, gridColumn, row, name, label, options, spacing, helperText }: RHFRadioProps) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl component='fieldset'>
          {label && (
            <FormLabel component='legend' sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}
          <RadioGroup
            {...field}
            sx={{
              ...(grid && {
                display: 'grid',
                gridTemplateColumns: `repeat(${gridColumn}, 1fr)`, // Set grid template columns to display 4 checkboxes in one row
                gridGap: '8px' // Add grid gap for spacing between checkboxes
              }),
              ...(row && {
                flexDirection: 'row'
              }),
              '& .MuiFormControlLabel-root': {
                '&:not(:last-of-type)': {
                  mb: spacing || 0
                },
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2
                  }
                })
              }
            }}
          >
            {options.map(option => (
              <MyFormControlLabel
                key={option.value}
                control={<Radio />}
                label={option.label}
                value={option.value}
                defaultChecked={true}
              />
            ))}
          </RadioGroup>
          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}
