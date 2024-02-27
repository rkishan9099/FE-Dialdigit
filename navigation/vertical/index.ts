// ** Type import
import { VerticalNavItemsType } from '@/@core/layouts/types'
import { PATH_DASHBOARD } from '@/routes/paths'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      badgeContent: 'new',
      badgeColor: 'error',
      children: [
        {
          title: 'Analytics',
          path: '/dashboards/analytics'
        },
        {
          title: 'CRM',
          path: '/dashboards/crm'
        },
        {
          title: 'eCommerce',
          path: '/dashboards/ecommerce'
        }
      ]
    },
    {
      sectionTitle: 'Reports'
    },
    {
      title: 'Reports',
      icon: 'iconoir:reports',
      children: [
        {
          title: 'Call',
          path: PATH_DASHBOARD.reports.call
        }
      ]
    }
   
 
    


    
 
   
  ]
}

export default navigation
