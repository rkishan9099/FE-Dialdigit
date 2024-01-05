// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

// ** Data
import { top100Films } from '@/@fake-db/autocomplete'

const AutocompleteGrouped = () => {
  const options = top100Films.map(option => {
    const firstLetter = option.title[0].toUpperCase()

    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option
    }
  })

  return (
    <CustomAutocomplete
      sx={{ width: 250 }}
      id='autocomplete-grouped'
      groupBy={option => option.firstLetter}
      getOptionLabel={option => option.title || ''}
      options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
      renderInput={params => <CustomTextField {...params} label='With categories' />}
    />
  )
}

export default AutocompleteGrouped
