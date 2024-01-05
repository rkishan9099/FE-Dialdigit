// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { PricingPlanType } from '@/@core/components/plan-details/types'

// ** Demo Components
import CurrentPlanCard from '@/views/pages/account-settings/billing/CurrentPlanCard'
import PaymentMethodCard from '@/views/pages/account-settings/billing/PaymentMethodCard'
import BillingAddressCard from '@/views/pages/account-settings/billing/BillingAddressCard'
import BillingHistoryTable from '@/views/pages/account-settings/billing/BillingHistoryTable'

const TabBilling = ({ apiPricingPlanData }: { apiPricingPlanData: PricingPlanType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlanCard data={apiPricingPlanData} />
      </Grid>

      <Grid item xs={12}>
        <PaymentMethodCard />
      </Grid>

      <Grid item xs={12}>
        <BillingAddressCard />
      </Grid>

      <Grid item xs={12}>
        <BillingHistoryTable />
      </Grid>
    </Grid>
  )
}

export default TabBilling
