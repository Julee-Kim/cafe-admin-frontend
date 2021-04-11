import StoreLayout from './views/StoreLayout'

import StoreList from './views/StoreList'
import StoreCreate from './views/StoreCreate'
import StoreUpdate from './views/StoreUpdate'

const StoreRoute = {
  path: 'stores',
  redirect: '/stores',
  component: StoreLayout,
  children: [
    {
      path: '/',
      name: 'StoreList',
      component: StoreList
    },
    {
      path: 'new',
      name: 'StoreCreate',
      component: StoreCreate
    },
    {
      path: ':id',
      name: 'StoreUpdate',
      component: StoreUpdate
    }
  ]
}

export default StoreRoute