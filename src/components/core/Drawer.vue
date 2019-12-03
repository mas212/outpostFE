<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
    <v-img
      :src="image"
      height="100%"
    >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile avatar>
          <v-list-tile-avatar
            color="white"
          >
            <v-img
              :src="logo"
              height="34"
              contain
            />
          </v-list-tile-avatar>
          <v-list-tile-title class="title my-5">
            Frontdesk
          </v-list-tile-title>
        </v-list-tile>
        <!-- <v-divider/> -->
        <v-list-tile
          v-if="responsive"
        >
          <v-text-field
            class="purple-input search-input"
            label="Search..."
            color="purple"
          />
        </v-list-tile>

        <v-list-group v-for="(link, i) in links" :key="i">
          <v-list-tile slot="activator">
            <v-list-tile-title><h6>{{ link.text }}</h6></v-list-tile-title>
          </v-list-tile>

            <v-list-tile v-for="(menu, j) in link.submenus" :key="'sub'+ j" :to="menu.to" :active-class="color + '--text'">
              <v-list-tile-action>
                <v-icon small v-text="menu.icon"></v-icon>
              </v-list-tile-action>                
              <v-list-tile-title><h6>{{ menu.text }}</h6></v-list-tile-title>
            </v-list-tile>
        </v-list-group>

        <!-- <p v-for="(link, i) in links" :key="i">
          <v-list-tile>
            <h6 class="heading-6 text-uppercase">{{ link.text }}</h6>
          </v-list-tile>

          <v-list-tile v-for="(menu, j) in link.submenus" :key="'sub'+ j" :to="menu.to" :active-class="color" avatar class="v-list-item">
            <v-list-tile-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="menu.text"/>
          </v-list-tile>       
        </p> -->
      </v-layout>
    </v-img>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    logo: '/vue/favicon.png',
    links: [
      {
        text: 'ACTIVE MEMBERS',
        submenus: [
                    { icon: 'mdi-account-multiple', text: 'Present Members', to: '/active-members/present' },
                    { icon: 'mdi-account-multiple-check', text: 'Current Members', to: '/active-members/current' }
                  ]
      },
      {
        text: 'HOURLY PLANS',
        submenus: [
                    { icon: 'mdi-alarm', text: '25 Hours', to: '/hourly-plans/25-hours' },
                    { icon: 'mdi-alarm', text: '70 Hours', to: '/hourly-plans/70-hours' }
                  ]
      },
      {
        text: 'RESTRICTED PLANS',
        submenus: [
                    { icon: 'mdi-calendar', text: 'Daily', to: '/restricted-plans/daily' },
                    { icon: 'mdi-brightness-3', text: 'Night Owl', to: '/restricted-plans/night-owl' }
                  ]
      },
      {
        text: 'UNLIMITED PLANS',
        submenus: [
                    { icon: 'mdi-calendar-check', text: 'Unlimited Monthly', to: '/unlimited-plans/unlimited-monthly' },
                    { icon: 'mdi-calendar-check', text: 'Three Month Unlimited', to: '/unlimited-plans/three-month-unlimited' },
                    { icon: 'mdi-monitor', text: 'Dedicated Desk', to: '/unlimited-plans/dedicated-desk' }
                  ]
      },
      {
        text: 'GROUP PLANS',
        submenus: [
                    { icon: 'mdi-account-multiple', text: '100 Hours Unsettled', to: '/group-plans/100-hours-unsettled' }
                  ]
      },                  
      {
        text: 'DRAFT',
        submenus: [
                    {
                      to: '/dashboard',
                      icon: 'mdi-view-dashboard',
                      text: 'Dashboard'
                    },
                    {
                      to: '/user-profile',
                      icon: 'mdi-account',
                      text: 'User Profile'
                    },
                    {
                      to: '/table-list',
                      icon: 'mdi-clipboard-outline',
                      text: 'Table List'
                    },
                    {
                      to: '/typography',
                      icon: 'mdi-format-font',
                      text: 'Typography'
                    },
                    {
                      to: '/icons',
                      icon: 'mdi-chart-bubble',
                      text: 'Icons'
                    },
                    {
                      to: '/maps',
                      icon: 'mdi-map-marker',
                      text: 'Maps'
                    },
                    {
                      to: '/notifications',
                      icon: 'mdi-bell',
                      text: 'Notifications'
                    }
                  ]
      }
    ],
    responsive: false
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },
  mounted () {
    this.onResponsiveInverted()
    window.addEventListener('resize', this.onResponsiveInverted)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResponsiveInverted)
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer']),
    onResponsiveInverted () {
      if (window.innerWidth < 991) {
        this.responsive = true
      } else {
        this.responsive = false
      }
    }
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }

    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }

    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }

    .v-list__tile__action{
      min-width: 40px!important;
    }
  }
</style>
