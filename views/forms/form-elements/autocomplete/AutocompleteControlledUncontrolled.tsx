// ** React Imports
import { useState, SyntheticEvent } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'

// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

// ** Data
import { top100Films } from '@/@fake-db/autocomplete'

interface FilmOptionType {
  year: number
  title: string
}

const AutocompleteControlledUncontrolled = () => {
  // ** State
  const [value, setValue] = useState<FilmOptionType | null>(null)

  const handleChange = (event: SyntheticEvent, newValue: FilmOptionType | null) => {
    setValue(newValue)
  }

  return (
    <Box className='demo-space-x' sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <CustomAutocomplete
        value={value}
        sx={{ width: 250 }}
        options={top100Films}
        onChange={handleChange}
        id='autocomplete-controlled'
        getOptionLabel={option => option.title || ''}
        renderInput={params => <CustomTextField {...params} label='Controlled' />}
      />
      <CustomAutocomplete
        sx={{ width: 250 }}
        options={top100Films}
        id='autocomplete-uncontrolled'
        getOptionLabel={option => option.title || ''}
        renderInput={params => <CustomTextField {...params} label='Uncontrolled' />}
      />
    </Box>
  )
}

export default AutocompleteControlledUncontrolled
