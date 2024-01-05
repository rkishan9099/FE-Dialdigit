// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Types
import { InvoiceType } from '@/types/apps/invoiceTypes'

// ** Demo Components Imports
import UserViewLeft from '@/views/apps/user/view/UserViewLeft'
import UserViewRight from '@/views/apps/user/view/UserViewRight'

type Props = {
  tab: string
  invoiceData: InvoiceType[]
}

const UserView = ({ tab, invoiceData }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <UserViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <UserViewRight tab={tab} invoiceData={invoiceData} />
      </Grid>
    </Grid>
  )
}

export default UserView
