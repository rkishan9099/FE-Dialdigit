// @mui
import { TextField, InputAdornment } from '@mui/material'
import IconifyIcon from '@/@core/components/icon'
// components

// ----------------------------------------------------------------------

type Props = {
  filterName: string
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function FileFilterName({ filterName, onFilterName }: Props) {
  return (
    <TextField
      size='small'
      value={filterName}
      onChange={onFilterName}
      placeholder='Search...'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <IconifyIcon icon='eva:search-fill' style={{ color: 'text.disabled' }} />
          </InputAdornment>
        )
      }}
    />
  )
}
