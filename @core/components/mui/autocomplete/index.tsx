/* eslint-disable react/display-name */
// ** React Import
import { ElementType, forwardRef } from 'react'

// ** MUI Import
import Paper from '@mui/material/Paper'
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete'

const CustomAutocomplete = forwardRef(
  <
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends ElementType
  >(
    props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    ref: any
  ) => {
    return (
      <Autocomplete
        {...props}
        ref={ref}
        PaperComponent={props => <Paper {...props} className='custom-autocomplete-paper' />}
      />
    )
  }
) as typeof Autocomplete

export default CustomAutocomplete
