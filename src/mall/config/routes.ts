const Home = () => import('@src/mall/@screens/Home.vue');
const Cart = () => import('@src/mall/@screens/Cart.vue');

export default  [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'mall首页11',
    },
  },
  {
    path: '/home',
    component: Home,
    meta: {
      title: 'mall首页11',
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: 'mall购物车',
    },
  },
];
