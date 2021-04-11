import ProductLayout from './views/ProductLayout'

import ProductList from './views/ProductList'
import ProductCreate from './views/ProductCreate'
import ProductUpdate from './views/ProductUpdate'

const ProductRoute = {
  path: 'products',
  redirect: '/products',
  component: ProductLayout,
  children: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductList
    },
    {
      path: 'new',
      name: 'ProductCreate',
      component: ProductCreate
    },
    {
      path: ':id',
      name: 'ProductUpdate',
      component: ProductUpdate
    }
  ]
}

export default ProductRoute