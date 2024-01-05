// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Custom Component Import
import CustomTextField from '@/@core/components/mui/text-field'

// ** Third Party Imports
import Payment from 'payment'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from '@/@core/utils/format'

// ** Styled Component Imports
import CardWrapper from '@/@core/styles/libs/react-credit-cards'

// ** Styles Import

const TabBilling = () => {
  // ** States
  const [name, setName] = useState<string>('')
  const [cvc, setCvc] = useState<string | number>('')
  const [cardNumber, setCardNumber] = useState<string>('')
  const [expiry, setExpiry] = useState<string | number>('')


  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.name === 'number') {
      target.value = formatCreditCardNumber(target.value, Payment)
      setCardNumber(target.value)
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value)
      setExpiry(target.value)
    } else if (target.name === 'cvc') {
      target.value = formatCVC(target.value, cardNumber, Payment)
      setCvc(target.value)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sx={{ pt: theme => ['0 !important', `${theme.spacing(6)} !important`] }}>
        
      </Grid>
      <Grid item xs={12}>
        <CustomTextField
          fullWidth
          name='number'
          value={cardNumber}
          autoComplete='off'
          label='Card Number'
          onChange={handleInputChange}
          placeholder='0000 0000 0000 0000'
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <CustomTextField
          fullWidth
          name='name'
          value={name}
          autoComplete='off'
          label='Name on Card'
          placeholder='John Doe'
          onChange={e => setName(e.target.value)}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <CustomTextField
          fullWidth
          name='expiry'
          label='Expiry'
          value={expiry}
          placeholder='MM/YY'
          onChange={handleInputChange}
          inputProps={{ maxLength: '5' }}
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <CustomTextField
          fullWidth
          name='cvc'
          label='CVC'
          value={cvc}
          autoComplete='off'
          onChange={handleInputChange}
          placeholder={Payment.fns.cardType(cardNumber) === 'amex' ? '1234' : '123'}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label='Save Card for future billing?'
          sx={{ '& .MuiTypography-root': { color: 'text.secondary' } }}
        />
      </Grid>
    </Grid>
  )
}

export default TabBilling
