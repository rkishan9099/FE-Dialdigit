// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`
)

const AutocompleteDisabledOptions = () => {
  return (
    <CustomAutocomplete
      sx={{ width: 250 }}
      options={timeSlots}
      id='autocomplete-disabled-options'
      renderInput={params => <CustomTextField {...params} label='Disabled options' />}
      getOptionDisabled={option => option === timeSlots[0] || option === timeSlots[2]}
    />
  )
}

export default AutocompleteDisabledOptions
