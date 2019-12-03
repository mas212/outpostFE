/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '/',
    name: 'Login',
    view: 'Login'
  },  
  {
    path: '/dashboard',
    // Relative to /src/views
    view: 'Dashboard'
  },
  {
    path: '/active-members/present',
    name: 'Present Members',
    view: 'Members'
  },
  {
    path: '/active-members/current',
    name: 'Current Members',
    view: 'Members'
  },
  {
    path: '/hourly-plans/25-hours',
    name: '25 Hours',
    view: 'Members'
  },
  {
    path: '/hourly-plans/70-hours',
    name: '70 Hours',
    view: 'Members'
  },
  {
    path: '/restricted-plans/daily',
    name: 'Daily',
    view: 'Members'
  },
  {
    path: '/restricted-plans/night-owl',
    name: 'Night Owl',
    view: 'Members'
  },
  {
    path: '/unlimited-plans/unlimited-monthly',
    name: 'Unlimited Monthly',
    view: 'Members'
  },
  {
    path: '/unlimited-plans/three-month-unlimited',
    name: 'Three Month Unlimited',
    view: 'Members'
  }, 
  {
    path: '/unlimited-plans/dedicated-desk',
    name: 'Dedicated Desk',
    view: 'Members'
  },
  {
    path: '/group-plans/100-hours-unsettled',
    name: '100 Hours Unsettled',
    view: 'Members'
  },                
  {
    path: '/member-detail',
    name: 'Member Detail',
    view: 'MemberDetail'
  },    
  {
    path: '/user-profile',
    name: 'User Profile',
    view: 'UserProfile'
  },
  {
    path: '/table-list',
    name: 'Table List',
    view: 'TableList'
  },
  {
    path: '/typography',
    view: 'Typography'
  },
  {
    path: '/icons',
    view: 'Icons'
  },
  {
    path: '/maps',
    view: 'Maps'
  },
  {
    path: '/notifications',
    view: 'Notifications'
  },
  {
    path: '/upgrade',
    name: 'Upgrade to PRO',
    view: 'Upgrade'
  }
]
