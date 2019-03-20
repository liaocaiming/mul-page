const Home = () => import('@src/mobile/@screens/Home.vue');
const Cart = () => import('@src/mobile/@screens/Cart.vue');

export default  [
  {
    path: '/Home', 
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/cart', 
    component: Cart,
    meta: {
      title: '购物车'
    }
  }
];
