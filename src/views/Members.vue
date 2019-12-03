<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="green"
          :title="$route.name"
          text="Here is a subtitle for this table">
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions>
            <template
              slot="headerCell"
              slot-scope="{ header }">
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.member.name }}</td>
              <td>{{ item.location }}</td>
              <td><v-chip v-if="item.status" small style="font-size:11px!important;height:24px!important;" dark class="font-weight-bold" :color="(item.status=='Present') ? 'green' : 'orange'">
                {{ item.status }}</v-chip></td>
              <td class="text-xs-right">{{ item.minutes_remaining }}</td>
              <td>{{ item.plan.name }}</td>
              <td>{{ item.cancelled_on }}</td>
              <td>
                <v-tooltip
                  top
                  content-class="top">
                    <v-icon color="primary" slot="activator" v-on:click="$router.push({path: '/member-detail?member_id='+ item.member.id +'&membership_id='+ item.id})">mdi-pencil</v-icon>
                  <span>view more</span>
                </v-tooltip>                
              </td>
            </template>
          </v-data-table>
        </material-card>

        <template>
          <div class="text-xs-center">
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="7"
            ></v-pagination>
          </div>
        </template>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      loading: false,
      data:[],
      headers: [
        {
          sortable: false,
          text: 'Name',
          value: 'member'
        },
        {
          sortable: false,
          text: 'Access',
          value: 'location'
        },
        {
          sortable: false,
          text: 'Status',
          value: 'status'
        },
        {
          sortable: false,
          text: 'Time Remaining',
          value: 'minutes_remaining',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Plan',
          value: 'plan'
        },
        {
          sortable: false,
          text: 'Cancellation Date',
          value: 'cancelled_on'
        }
      ],
      items: [],

      pageCount: 0,
      page: 1
    }
  },  

  watch: {
    $route: function (val) {
      this.loadData(val.path, 0)
      this.page = 1
    },
    page: function (val) {
      this.loadData(this.$route.path, val)
    }
  },

  methods: {
    loadData(path, page){
      var apiHost = 'http://localhost:8000/api'
      var urlApi = '/get_checked_in?location=ubud'

      if(path == '/active-members/present'){
        
        urlApi = '/get_checked_in?location=ubud'

      }else if(path == '/active-members/current'){

        urlApi = '/current_member?location=ubud'

      }else if(path == '/hourly-plans/25-hours'){

        urlApi = '/get_members_plan?location=ubud&plan=25 Hours'

      }else if(path == '/hourly-plans/70-hours'){

        urlApi = '/get_members_plan?location=ubud&plan=70 Hours'

      }else if(path == '/restricted-plans/daily'){

        urlApi = '/get_members_plan?location=ubud&plan=daily'

      }else if(path == '/restricted-plans/night-owl'){

        urlApi = '/get_members_plan?location=ubud&plan=night-owl'

      }else if(path == '/unlimited-plans/unlimited-monthly'){

        urlApi = '/get_members_plan?location=ubud&plan=Unlimited Monthly'

      }else if(path == '/unlimited-plans/three-month-unlimited'){

        urlApi = '/get_members_plan?location=ubud&plan=Three Month Unlimited'

      }else if(path == '/unlimited-plans/dedicated-desk'){

        urlApi = '/get_members_plan?location=ubud&plan=Dedicated Desk'

      }else if(path == '/group-plans/100-hours-unsettled'){

        urlApi = '/get_members_plan?location=ubud&plan=100 Hours Unsettled'

      }

      const axithis = this
      this.loading = true
      axios.get(apiHost + urlApi + '&page='+ this.page,
            {
                headers: {
                    Authorization: 'Token ' + localStorage.getItem('token')
                }
            })
      .then(function (response) {
        axithis.pageCount = parseInt(response.data.count / 10)
        if(response.data.count % 10 > 0){
          axithis.pageCount ++
        }
          axithis.items = response.data.results
          axithis.loading = false
      })
          .catch(function (err) {
          console.log(err)
          axithis.loading = false
          })        
    }
  },
  mounted(){
    this.loadData(this.$route.path)
  }
}
</script>