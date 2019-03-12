const Home = () => import('@src/mobile/@screens/Home.vue');
const Cart = () => import('@src/mobile/@screens/Cart.vue')

export default  [
  {
    path: '/home', 
    component: Home,
    meta: {
      title: 'mall首页'
    }
  },
  {
    path: '/cart', 
    component: Cart,
    meta: {
      title: 'mall购物车'
    }
  }
]