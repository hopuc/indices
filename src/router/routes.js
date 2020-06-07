
const routes = [
  {
    path: '/',
    // component: () => import('layouts/MainLayout.vue'),
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Table.vue') }
    ]
  },
  {
    path: '/chart',
    component: () => import('layouts/Main.vue'),
    children: [
      { path: '', component: () => import('pages/Chart.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
