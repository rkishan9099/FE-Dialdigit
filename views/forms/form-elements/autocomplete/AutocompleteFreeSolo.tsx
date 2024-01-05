// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

// ** Data
import { top100Films } from '@/@fake-db/autocomplete'

const AutocompleteFreeSolo = () => {
  return (
    <CustomAutocomplete
      freeSolo
      sx={{ width: 250 }}
      id='autocomplete-free-solo'
      options={top100Films.map(option => option.title)}
      renderInput={params => <CustomTextField {...params} label='Free Solo' />}
    />
  )
}

export default AutocompleteFreeSolo
