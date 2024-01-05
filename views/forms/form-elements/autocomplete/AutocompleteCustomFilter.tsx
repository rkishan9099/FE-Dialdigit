// ** MUI Import
import { createFilterOptions } from '@mui/material/Autocomplete'

// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

// ** Data
import { top100Films } from '@/@fake-db/autocomplete'

interface FilmOptionType {
  year: number
  title: string
}

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: FilmOptionType) => option.title
})

const AutocompleteCustomFilter = () => {
  return (
    <CustomAutocomplete
      options={top100Films}
      filterOptions={filterOptions}
      id='autocomplete-custom-filter'
      getOptionLabel={option => option.title || ''}
      renderInput={params => <CustomTextField {...params} label='Custom filter' />}
    />
  )
}

export default AutocompleteCustomFilter
