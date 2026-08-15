import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 主 tab 页
  { path: '/', name: 'Home', component: () => import('@/views/user/Home.vue'), meta: { showTabbar: true, transition: 'fade' } },
  { path: '/category', name: 'Category', component: () => import('@/views/user/Category.vue'), meta: { showTabbar: true, transition: 'fade' } },
  { path: '/cart', name: 'Cart', component: () => import('@/views/user/Cart.vue'), meta: { showTabbar: true, transition: 'fade' } },
  { path: '/user', name: 'User', component: () => import('@/views/user/User.vue'), meta: { showTabbar: true, transition: 'fade' } },

  // 商品
  { path: '/goods/list', name: 'GoodsList', component: () => import('@/views/user/GoodsList.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/goods/:id', name: 'GoodsDetail', component: () => import('@/views/user/GoodsDetail.vue'), meta: { showTabbar: false, transition: 'slide' } },

  // 交易
  { path: '/checkout', name: 'Checkout', component: () => import('@/views/user/Checkout.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/pay/success', name: 'PaySuccess', component: () => import('@/views/user/PaySuccess.vue'), meta: { showTabbar: false, transition: 'fade' } },

  // 拼团
  { path: '/group/list', name: 'GroupList', component: () => import('@/views/user/GroupList.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/group/detail/:id', name: 'GroupDetail', component: () => import('@/views/user/GroupDetail.vue'), meta: { showTabbar: false, transition: 'slide' } },

  // 接龙
  { path: '/jielong/list', name: 'JieLongList', component: () => import('@/views/user/JieLongList.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/jielong/detail/:id', name: 'JieLongDetail', component: () => import('@/views/user/JieLongDetail.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/jielong/create', name: 'JieLongCreate', component: () => import('@/views/user/JieLongCreate.vue'), meta: { showTabbar: false, transition: 'slide' } },

  // 个人中心相关
  { path: '/user/orders', name: 'UserOrders', component: () => import('@/views/user/UserOrders.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/group', name: 'UserGroup', component: () => import('@/views/user/UserGroup.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/jielong', name: 'UserJieLong', component: () => import('@/views/user/UserJieLong.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/address', name: 'UserAddress', component: () => import('@/views/user/UserAddress.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/favorite', name: 'UserFavorite', component: () => import('@/views/user/UserFavorite.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/points', name: 'UserPoints', component: () => import('@/views/user/UserPoints.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/vip', name: 'UserVip', component: () => import('@/views/user/UserVip.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/coupon', name: 'UserCoupon', component: () => import('@/views/user/UserCoupon.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/distribution', name: 'UserDistribution', component: () => import('@/views/user/UserDistribution.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/distribution/poster', name: 'DistributionPoster', component: () => import('@/views/user/DistributionPoster.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/distribution/team', name: 'DistributionTeam', component: () => import('@/views/user/DistributionTeam.vue'), meta: { showTabbar: false, transition: 'slide' } },
  { path: '/user/distribution/commission', name: 'DistributionCommission', component: () => import('@/views/user/DistributionCommission.vue'), meta: { showTabbar: false, transition: 'slide' } },

  // 登录
  { path: '/login', name: 'Login', component: () => import('@/views/user/Login.vue'), meta: { showTabbar: false, transition: 'slide' } },

  // 后台
  { path: '/admin', name: 'AdminLayout', component: () => import('@/views/admin/AdminLayout.vue'), meta: { showTabbar: false, transition: 'fade' },
    redirect: '/admin/dashboard',
    children: [
      { path: 'dashboard', name: 'AdminDashboard', component: () => import('@/views/admin/Dashboard.vue'), meta: { title: '数据看板' } },
      { path: 'goods', name: 'AdminGoods', component: () => import('@/views/admin/Goods.vue'), meta: { title: '商品管理' } },
      { path: 'orders', name: 'AdminOrders', component: () => import('@/views/admin/Orders.vue'), meta: { title: '订单管理' } },
      { path: 'group', name: 'AdminGroup', component: () => import('@/views/admin/Group.vue'), meta: { title: '拼团管理' } },
      { path: 'jielong', name: 'AdminJieLong', component: () => import('@/views/admin/JieLong.vue'), meta: { title: '接龙管理' } },
      { path: 'user', name: 'AdminUser', component: () => import('@/views/admin/User.vue'), meta: { title: '会员管理' } },
      { path: 'marketing', name: 'AdminMarketing', component: () => import('@/views/admin/Marketing.vue'), meta: { title: '营销中心' } },
      { path: 'settings', name: 'AdminSettings', component: () => import('@/views/admin/Settings.vue'), meta: { title: '店铺设置' } }
    ]
  },

  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
