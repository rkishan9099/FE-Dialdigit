// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

// ** Data
import { top100Films } from '@/@fake-db/autocomplete'

const AutocompleteLimitTags = () => {
  return (
    <CustomAutocomplete
      multiple
      limitTags={2}
      options={top100Films}
      id='autocomplete-limit-tags'
      getOptionLabel={option => option.title || ''}
      defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
      renderInput={params => <CustomTextField {...params} label='limitTags' placeholder='Favorites' />}
    />
  )
}

export default AutocompleteLimitTags
