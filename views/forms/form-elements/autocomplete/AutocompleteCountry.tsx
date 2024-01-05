// ** MUI Import
import Box from '@mui/material/Box'

// ** Custom Component Imports
import CustomTextField from '@/@core/components/mui/text-field'
import CustomAutocomplete from '@/@core/components/mui/autocomplete'

// ** Data
import { countries } from '@/@fake-db/autocomplete'
import Image from 'next/image'

interface CountryType {
  code: string
  label: string
  phone: string
}

const AutocompleteCountry = () => {
  return (
    <CustomAutocomplete
      autoHighlight
      sx={{ width: 250 }}
      id='autocomplete-country-select'
      options={countries as CountryType[]}
      getOptionLabel={option => option.label || ''}
      renderOption={(props, option) => (
        <Box component='li' sx={{ '& > img': { mr: 4, flexShrink: 0 } }} {...props}>
          <Image
            alt=''
            width='20'
            loading='lazy'
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={params => (
        <CustomTextField
          {...params}
          label='Choose a country'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password'
          }}
        />
      )}
    />
  )
}

export default AutocompleteCountry
