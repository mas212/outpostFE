<template>
    <div>
        <v-layout justify-center wrap>
            <v-flex xs12 mt-5 text-xs-center style="max-width: 400px;">
                <material-card color="info" class="text-xs-center title font-weight-light">
                    <v-flex slot="header">
                        <v-icon left>mdi-account</v-icon> LOGIN
                    </v-flex>

                    <template>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

                            <v-text-field type="password" v-model="password" label="Password" required></v-text-field>
                            
                            <!-- <v-flex xs12>
                                <v-combobox
                                v-model="location"
                                :items="['ubud', 'canggu']"
                                label="Location"
                                ></v-combobox>
                            </v-flex>                             -->

                            <v-btn :disabled="!valid" color="success" @click="login">
                                Submit
                            </v-btn> &nbsp;

                            <v-btn color="error" @click="reset">
                                Reset Form
                            </v-btn>
                        </v-form>
                    </template>

                </material-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
                return {
                    loading: false,
                    password: 'asdasdasd',
                    valid: true,
                    email: 'wahyu@outpost-asia.com',
                    emailRules: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+/.test(v) || 'E-mail must be valid'
                    ],
                    location: ''
                }
            },
            methods: {
                login(path, page) {
                    if (this.$refs.form.validate()) {
                        const axithis = this
                        this.loading = true
                        let formData = new FormData()
                        formData.append('location', 'ubud')
                        formData.append('email', this.email)
                        formData.append('password', this.password)                            
                        axios.post('http://localhost:8000/api/authenticate',
                        formData,
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                                // Authorization: 'Token ' + localStorage.getItem('jwtoken')
                            }
                        })
                        .then(function(response) {
                            
                            if(response.data.token != ''){
                                localStorage.setItem('token', response.data.token)
                                window.location = '/active-members/present'
                            }else{
                                alert('invalid')
                            }
                            // console.log(response)
                            axithis.loading = false
                        })
                        .catch(function(err) {
                            console.log(err)
                            axithis.loading = false
                        })
                    }
                },
                reset() {
                    this.$refs.form.reset()
                }
            },
            mounted() {}
    }
</script>

<style>
    nav,
    .v-menu__activator,
    #app-drawer,
    footer {
        display: none!important;
    }
    
    .v-content {
        padding: 0!important;
    }
</style>