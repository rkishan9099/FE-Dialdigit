// ** MUI Import
import Checkbox from '@mui/material/Checkbox'

// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

// ** Data
import { top100Films } from '@/@fake-db/autocomplete'

const AutocompleteCheckboxes = () => {
  return (
    <CustomAutocomplete
      multiple
      disableCloseOnSelect
      options={top100Films}
      id='autocomplete-checkboxes'
      getOptionLabel={option => option.title || ''}
      renderInput={params => <CustomTextField {...params} label='Checkboxes' placeholder='Favorites' />}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox checked={selected} sx={{ mr: 2 }} />
          {option.title}
        </li>
      )}
    />
  )
}

export default AutocompleteCheckboxes
