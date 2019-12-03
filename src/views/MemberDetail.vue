<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex xs12 lg4>
        <material-card color="info" class="text-xs-center title font-weight-light">
            <v-flex slot="header">
                <v-icon left>mdi-account</v-icon> {{ data.member.name }}
            </v-flex>

            <v-flex body-1>{{ data.member.email }}</v-flex>

            <template slot="actions">
                <v-icon
                class="mr-2"
                small
                >
                mdi-clock-outline
                </v-icon>
                <span class="caption grey--text font-weight-light">Cobot Profile</span>
            </template>            
        </material-card>
      </v-flex>
      <v-flex xs12 sm6 lg4>
        <material-card color="red" class="text-xs-center title font-weight-light">
            <v-flex slot="header">
                <v-icon left>mdi-calendar-check</v-icon> {{ data.plan.name }}
            </v-flex>

            <!-- <p>Membership Valid Until</p> -->
            <v-flex px-5>
                <v-dialog
                    ref="dialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    lazy
                    full-width
                    width="290px">
                    <v-text-field
                      slot="activator"
                      v-model="date"
                      label="Membership Valid Until"
                      prepend-icon="mdi-calendar"
                      readonly />
                    <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog> 
            </v-flex>           

        </material-card>
      </v-flex>
      <v-flex xs12 sm6 lg4>
        <material-card color="green" class="text-xs-center title font-weight-light">
            <v-flex slot="header">
                <v-icon left>mdi-alarm</v-icon> Time Remaining
            </v-flex>

            <v-layout row wrap px-5 title>
                <v-flex xs6>
                    <v-text-field
                        label="Hours"></v-text-field>                    
                </v-flex>
                <v-flex xs6>
                    <v-text-field
                        label="Minuted"></v-text-field> 
                </v-flex>
            </v-layout>
        </material-card>
      </v-flex>            
            
      <v-flex xs12>
        <material-card class="card-tabs" color="orange">
          <v-flex slot="header">
            <v-tabs
              v-model="tabs"
              color="transparent"
              slider-color="white">
              <v-tab class="mr-3 font-weight-light" href="#satu">
                <v-icon class="mr-2">mdi-account-convert</v-icon>
                Membership History
              </v-tab>
              <v-tab class="mr-3 font-weight-light" href="#dua">
                <v-icon class="mr-2">mdi-heart</v-icon>
                Add/Renew Plan
              </v-tab>
              <v-tab class="font-weight-light" href="#tiga">
                <v-icon class="mr-2">mdi-account-search</v-icon>
                Check In History
              </v-tab>
              <v-tab class="font-weight-light" href="#empat">
                <v-icon class="mr-2">mdi-monitor</v-icon>
                Check By Device
              </v-tab>
              <v-tab class="font-weight-light" href="#lima">
                <v-icon class="mr-2">mdi-book</v-icon>
                0 Notes
              </v-tab>
              <v-tab class="font-weight-light" href="#enam">
                <v-icon class="mr-2">mdi-account</v-icon>
                Profile
              </v-tab>                                          
            </v-tabs>
          </v-flex>

          <v-tabs-items v-model="tabs">
            <v-tab-item value="satu">

                <v-data-table
                  :headers="headers"
                  :items="items"
                  hide-actions
                  >
                  <template
                    slot="headerCell"
                    slot-scope="{ header }"
                  >
                    <span
                      class="subheading font-weight-light text-success text--darken-3"
                      v-text="header.text"
                    />
                  </template>
                  <template
                    slot="items"
                    slot-scope="{ item }">
                    <td>{{ item.member.name }}</td>
                    <td>{{ item.location }}</td>
                    <td>{{ item.status }}</td>
                    <td class="text-xs-right">{{ item.minutes_remaining }}</td>
                    <td>{{ item.plan.name }}</td>
                    <td>{{ item.cancelled_on }}</td>
                    <td>
                        <v-tooltip top content-class="top">
                            <v-icon color="primary" slot="activator" v-on:click="$router.push({path: '/member-detail?member_id='+ item.member.id +'&membership_id='+ item.id})">mdi-pencil</v-icon>
                            <span>view more</span>
                        </v-tooltip>         
                    </td>
                  </template>
                </v-data-table>

            </v-tab-item>

            <v-tab-item value="dua">
              <v-container>
                <v-layout row wrap style="max-width: 400px;">
                  <v-flex xs12>
                    <v-text-field
                      box
                      label="Select Location"
                      required />                  
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      box
                      label="Select Plan"
                      required />                  
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      box
                      label="Plan Start Date"
                      required />        
                  </v-flex>
                  <v-flex xs12 block>
                      <v-btn block large color="secondary" dark>Save</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-tab-item>

            <v-tab-item value="tiga">
              
                <v-data-table
                  :headers="tab3headers"
                  :items="tab3items"
                  hide-actions
                  >
                  <template
                    slot="headerCell"
                    slot-scope="{ header }"
                  >
                    <span
                      class="subheading font-weight-light text-success text--darken-3"
                      v-text="header.text"
                    />
                  </template>
                  <template
                    slot="items"
                    slot-scope="{ item }">
                    <td>{{ item.start }}</td>
                    <td>{{ item.end }}</td>
                      <td>{{ item.duration }}</td>
                  </template>
                </v-data-table>              

            </v-tab-item>

            <v-tab-item value="empat">
              empat
            </v-tab-item>

            <v-tab-item value="lima">
              lima
            </v-tab-item>

            <v-tab-item value="enam">
              enam
            </v-tab-item>                                                
          </v-tabs-items>
        </material-card>
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
      data: {},
      date: new Date().toISOString().substr(0, 10),
      modal: false,
      tabs: 'satu',
      list: {
        0: false,
        1: false,
        2: false
      },

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
      
      tab3headers: [
        {
          sortable: false,
          text: 'Start',
          value: 'start'
        },
        {
          sortable: false,
          text: 'End',
          value: 'end'
        },
        {
          sortable: false,
          text: 'Duration',
          value: 'duration'
        }
      ],
      tab3items: [
        {
          start: 'Dakota Rice',
          end: 'Niger',
          duration: '$35,738'
        },
        {
          start: 'Minerva Hooper',
          end: 'Curaçao',
          duration: '$23,738'
        }
      ]         
    }
  },
  methods: {
    loadData(){
      const axithis = this
      this.loading = true
      // alert('http://192.168.23.45:8000/api/member_history?member_id='+ this.$route.query.member_id +'&membership_id='+ this.$route.query.membership_id)

      axios.get('http://localhost:8000/api/member_history?member_id='+ this.$route.query.member_id +'&membership_id='+ this.$route.query.membership_id)
      // axios.get(this.$store.state.apiPath + '/api/bengkels/all')
      .then(function (response) {
          console.log(response.data.results[0].id)
          axithis.data = response.data.results[0]
          axithis.loading = false
      })
          .catch(function (err) {
            console.log(err)
            alert()
            axithis.loading = false
          }) 
    },
    loadDataSample(){
      const axithis = this
      this.loading = true
      axios.get('http://localhost:8000/api/current_member?location=ubud')
      // axios.get(this.$store.state.apiPath + '/api/bengkels/all')
      .then(function (response) {
        console.log(response.data)
        console.log(response.data.results)
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
    this.loadData()
    this.loadDataSample()
  }
}
</script>
