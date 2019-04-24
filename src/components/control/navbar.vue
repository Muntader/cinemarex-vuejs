<template>
    <div class="c-app-navbar"
         :class="{
                 'rti1-overlay-color': $route.params.ChannelName === 'rti1' || $route.name === 'discover',
                 'rti2-overlay-color': $route.params.ChannelName === 'rti2',
                 'rti3-overlay-color': $route.params.ChannelName === 'rti3',
                 'radio-ci-overlay-color': $route.params.ChannelName === 'radio-ci',
                 'frequence-overlay-color': $route.params.ChannelName === 'frequence',
                 'radio-flimee-overlay-color': $route.params.ChannelName === 'radio-flimee',
                 'c-app-navbar-show': $route.name === 'show-movie' || $route.name === 'show-series' ||   $route.name === 'search'
                 }">

        <div class="c-app-navbar__back" v-if="$route.name === 'show-movie' || $route.name === 'show-series' ||  $route.name === 'search'">
            <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81.333336 81.333336" height="81.333" width="81.333"><path d="M81.313 40.678c0 22.453-18.204 40.655-40.657 40.655C18.202 81.333 0 63.13 0 40.678 0 18.222 18.2.02 40.657.02c22.452 0 40.656 18.202 40.656 40.658z" fill="#dde1e6"/><path d="M36.17 59.338L21.1 44.408l-.002.002-3.767-3.732 18.84-18.663 3.77 3.732-15.074 14.928 15.076 14.93-3.77 3.734z" fill="#2f323b" fill-rule="evenodd"/><path d="M23.995 43.345v-5.333h39.99v5.333h-39.99z" fill="#2f323b" fill-rule="evenodd"/></svg>
            </a>
        </div>

        <div class="c-app-navbar__logo">
            <img src="../../assets/default/img/channels/logo_rti.png" alt="RTI Logo" class="c-rti-logo">
        </div>

        <div class="c-app-navbar__channels" v-if="$route.name !== 'show-movie' && $route.name !== 'show-series' &&  $route.name !== 'search'">
            <carousel :perPageCustom="[[300, 4], [750, 4], [1024, 7], [1360, 15], [2000, 40]]" :navigationEnabled="true"
                      :autoplay="true" :paginationEnabled="false" :mouseDrag="false"
                      navigationNextLabel='<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="20">
                                                <path stroke-linecap="square" stroke="#fff" stroke-width="8"
                                                      d="M40 16l43 44m0 0l-43 44"></path>
                                           </svg>'
                      navigationPrevLabel='<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" width="20">
                                                <path stroke-linecap="square" stroke="#fff" stroke-width="8" d="M40 16l43 44m0 0l-43 44"
                                                      transform="translate(120, 0) scale(-1, 1)"></path>
                                           </svg>'>
                <slide style="width: 100%">
                    <div class="c-channel-icon">
                        <router-link :to="{name:'discover' }"  @click.native="SET_ANIMATION_SLIDER('rti1')">
                            <img src="../../assets/default/img/channels/RTI1_transparent.png" alt="RTI1 Logo"
                                 class="c-channel-logo c-rti1-icon"
                                 @mouseover="HoverIcon = 'rti1'"
                                 @mouseleave="LEAVE_CHANNEL_HOVER()"
                                 v-show="HoverIcon !== 'rti1' && ActiveIcon !== 'rti1'">
                            <img src="../../assets/default/img/channels/RTI1.png" alt="RTI1 Logo"
                                 class="c-channel-logo c-rti1-icon"
                                 @mouseover="HoverIcon = 'rti1'"
                                 @mouseleave="LEAVE_CHANNEL_HOVER()"
                                 v-show="HoverIcon === 'rti1' || ActiveIcon === 'rti1'">
                        </router-link>
                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <div class="c-channel-icon">
                            <router-link :to="{name:'discover-channel', params: {ChannelName: 'rti2'}}" @click.native="SET_ANIMATION_SLIDER('rti2')">
                            <img src="../../assets/default/img/channels/RTI2_transparent.png" alt="RTI2 Logo"
                                 class="c-channel-logo c-rti2-icon"
                                 @mouseover="HoverIcon = 'rti2'"
                                 @mouseleave="LEAVE_CHANNEL_HOVER()"
                                 v-show="HoverIcon !== 'rti2' && ActiveIcon !== 'rti2'">
                            <img src="../../assets/default/img/channels/RTI2.png" alt="RTI2 Logo"
                                 class="c-channel-logo c-rti2-icon"
                                 @mouseover="HoverIcon = 'rti2'"
                                 @mouseleave="LEAVE_CHANNEL_HOVER()"
                                 v-show="HoverIcon === 'rti2'|| ActiveIcon === 'rti2'">
                            </router-link>
                        </div>
                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <router-link :to="{name:'discover-channel', params: {ChannelName: 'rti3'} }" @click.native="SET_ANIMATION_SLIDER('rti3')">
                        <img src="../../assets/default/img/channels/RTI3_transparent.png" alt="RTI3 Logo"
                             class="c-channel-logo c-rti3-icon"
                             @mouseover="HoverIcon = 'rti3'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon !== 'rti3' && ActiveIcon !== 'rti3'">
                        <img src="../../assets/default/img/channels/RTI3.png" alt="RTI3 Logo"
                             class="c-channel-logo c-rti3-icon"
                             @mouseover="HoverIcon = 'rti3'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon === 'rti3' || ActiveIcon === 'rti3'">
                        </router-link>
                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <router-link :to="{name:'discover-channel', params: {ChannelName: 'radio-ci'} }" @click.native="SET_ANIMATION_SLIDER('radio-ci')">
                        <img src="../../assets/default/img/channels/RADIO-CI_transparent.png" alt="Radio CI  Logo"
                             class="c-channel-logo c-radio-ci-icon"
                             @mouseover="HoverIcon = 'radio-ci'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon !== 'radio-ci' && ActiveIcon !== 'radio-ci'">
                        <img src="../../assets/default/img/channels/RADIO-CI.png" alt="Radio CI  Logo"
                             class="c-channel-logo c-radio-ci-icon"
                             @mouseover="HoverIcon = 'radio-ci'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon === 'radio-ci' || ActiveIcon === 'radio-ci' ">
                        </router-link>

                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <router-link :to="{name:'discover-channel', params: {ChannelName: 'frequence'} }" @click.native="SET_ANIMATION_SLIDER('frequence')">
                        <img src="../../assets/default/img/channels/FREQUENCE_transparent_v2.png" alt="FREQUENCE  Logo"
                             class="c-channel-logo c-frequnce2-icon"
                             @mouseover="HoverIcon = 'frequence'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon !== 'frequence' && ActiveIcon !== 'frequence'">
                        <img src="../../assets/default/img/channels/FREQUENCE-2.png" alt="FREQUENCE Logo"
                             class="c-channel-logo c-frequnce2-icon"
                             @mouseover="HoverIcon = 'frequence'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon === 'frequence' || ActiveIcon === 'frequence' ">
                        </router-link>

                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <router-link :to="{name:'discover-channel', params: {ChannelName: 'radio-flimee'} }" @click.native="SET_ANIMATION_SLIDER('radio-flimee')">
                        <img src="../../assets/default/img/channels/Radio_Filmee_transparent.png" alt="Radio Filmee  Logo"
                             class="c-channel-logo c-adio-Filmee"
                             @mouseover="HoverIcon = 'radio-flimee'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon !== 'radio-flimee' && ActiveIcon !== 'radio-flimee'">
                        <img src="../../assets/default/img/channels/Radio_Filmee.png" alt="Radio Filmee Logo"
                             class="c-channel-logo c-adio-Filmee"
                             @mouseover="HoverIcon = 'radio-flimee'"
                             @mouseleave="LEAVE_CHANNEL_HOVER()"
                             v-show="HoverIcon === 'radio-flimee' || ActiveIcon === 'radio-flimee'">
                        </router-link>
                    </div>
                </slide>
            </carousel>
        </div>

        <div class="c-app-navbar__menu" v-if="IS_AUTHENTICATED" @click="SHOW_USER_DROPDOWN = !SHOW_USER_DROPDOWN">
            <div class="c-login-icon-container">
               <span v-if="USER_INFO.Image !== null">
                   <div class="avatar-preview">
                       <div id="imagePreview"
                            :style="{backgroundImage: 'url('+ site_link + USER_INFO.Image +')'}">
                       </div>
                   </div>

                </span>

                <span v-else>
                   <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 171 171">
                    <path fill="#FFF"
                    d="M85,0 C38.0557963,-2.87450344e-15 5.74900688e-15,38.0557963 0,85 C-5.74900688e-15,131.944204 38.0557963,170 85,170 C131.944204,170 170,131.944204 170,85 C170,62.4565984 161.044669,40.8365158 145.104076,24.8959236 C129.163484,8.95533143 107.543402,1.38038523e-15 85,0 Z M85,33.6046512 C99.0887197,33.6046512 110.509884,45.0258151 110.509884,59.1145349 C110.509884,73.2032546 99.0887197,84.6244186 85,84.6244186 C70.9112803,84.6244186 59.4901163,73.2032546 59.4901163,59.1145349 C59.5064558,45.0325887 70.9180539,33.6209907 85,33.6046512 Z M127.5,114.325 C116.173256,127.915116 101.07093,135.406977 85,135.406977 C68.9290698,135.406977 53.8267442,127.915116 42.5,114.315116 L42.1540698,113.9 L42.2331395,113.366279 C44.4174419,99.094186 51.8796512,87.619186 63.255814,81.0465116 L64.0662791,80.5819767 L64.7087209,81.2540698 C69.9971311,86.822826 77.3400325,89.9760008 85.0197674,89.9760008 C92.6995024,89.9760008 100.042404,86.822826 105.330814,81.2540698 L105.973256,80.5819767 L106.744186,81.0465116 C118.100581,87.5994186 125.523256,99.0744186 127.756977,113.356395 L127.836047,113.890116 L127.5,114.325 Z"
                    opacity=".4" transform="translate(.444 .716)"/>
                    </svg>
                </span>
            </div>
            <div class="c-text-username d-none d-md-block" v-if="USER_INFO.Username !== null">
                {{USER_INFO.Username}}
            </div>
            <div class="c-text-username d-none d-md-block" v-else>
                {{USER_INFO.Email}}
            </div>

            <transition name="fade">

            <div class="c-app-navbar__menu--dropdown"
                 :class="{
                         'rti1-overlay-color': $route.params.ChannelName === 'rti1' || $route.name === 'discover',
                         'rti2-overlay-color': $route.params.ChannelName === 'rti2',
                         'rti3-overlay-color': $route.params.ChannelName === 'rti3',
                         'radio-ci-overlay-color': $route.params.ChannelName === 'radio-ci',
                         'frequence-overlay-color': $route.params.ChannelName === 'frequence' ||  $route.name === 'show-movie',
                         'radio-flimee-overlay-color': $route.params.ChannelName === 'radio-flimee'
                         }"
                 v-show="SHOW_USER_DROPDOWN">
                <ul>
                    <li><a @click="SHOW_PROFILE_MODAL">My Profile</a></li>
                    <li><router-link :to="{name: 'profile'}">Help and contact</router-link></li>
                    <li><router-link :to="{name: 'profile'}">Legal Notice</router-link></li>
                    <li><router-link :to="{name: 'profile'}">Privacy area</router-link></li>
                    <li><span @click="LOGOUT">Sign out</span></li>
                </ul>
            </div>
            </transition>

        </div>

        <div class="c-app-navbar__menu ghost" v-else>
            <div class="c-login-icon-container"  @click="SHOW_LOGIN">
                     <span>
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 171 171">
                            <path fill="#FFF"
                                  d="M85,0 C38.0557963,-2.87450344e-15 5.74900688e-15,38.0557963 0,85 C-5.74900688e-15,131.944204 38.0557963,170 85,170 C131.944204,170 170,131.944204 170,85 C170,62.4565984 161.044669,40.8365158 145.104076,24.8959236 C129.163484,8.95533143 107.543402,1.38038523e-15 85,0 Z M85,33.6046512 C99.0887197,33.6046512 110.509884,45.0258151 110.509884,59.1145349 C110.509884,73.2032546 99.0887197,84.6244186 85,84.6244186 C70.9112803,84.6244186 59.4901163,73.2032546 59.4901163,59.1145349 C59.5064558,45.0325887 70.9180539,33.6209907 85,33.6046512 Z M127.5,114.325 C116.173256,127.915116 101.07093,135.406977 85,135.406977 C68.9290698,135.406977 53.8267442,127.915116 42.5,114.315116 L42.1540698,113.9 L42.2331395,113.366279 C44.4174419,99.094186 51.8796512,87.619186 63.255814,81.0465116 L64.0662791,80.5819767 L64.7087209,81.2540698 C69.9971311,86.822826 77.3400325,89.9760008 85.0197674,89.9760008 C92.6995024,89.9760008 100.042404,86.822826 105.330814,81.2540698 L105.973256,80.5819767 L106.744186,81.0465116 C118.100581,87.5994186 125.523256,99.0744186 127.756977,113.356395 L127.836047,113.890116 L127.5,114.325 Z"
                                  opacity=".4" transform="translate(.444 .716)"/>
                        </svg>
                     </span>
            </div>

            <div class="c-text-username d-none d-md-block" @click="SHOW_LOGIN">
                <span>LOGIN</span>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";

    import LoginComponent from '../auth/login'

    export default {
        data() {
            return {
                ShowLoginPage: false,
                showNavBackground: false,
                SHOW_USER_DROPDOWN: false,
                HoverIcon: 'rti1',
                ActiveIcon: 'rti1'
            }
        },

        computed: mapState({
            USER_INFO: state => state.register.UserInfo,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED
        }),

        components: {
            'login': LoginComponent
        },

        created() {
            if(this.$route.params.ChannelName !== undefined) {
             this.ActiveIcon = this.$route.params.ChannelName;
             this.HoverIcon =  this.$route.params.ChannelName;
            }
        },
        watch: {
            '$route.params.ChannelName': function (val) {
                if(this.$route.name === 'discover') {
                    this.ActiveIcon = 'rti1';
                }else{
                    this.ActiveIcon = val;
                }
            },
        },
        methods: {

            LEAVE_CHANNEL_HOVER() {
                this.HoverIcon = this.$route.params.ChannelName;
            },

            SHOW_SEARCH_PAGE() {
                this.$store.commit("SHOW_SEARCH_PAGE");
            },

            SHOW_LOGIN() {
                this.$store.commit('SHOW_LOGIN_MODAL', true)
            },

            SHOW_PROFILE_MODAL() {
                this.$store.commit('SHOW_PROFILE_MODAL', true)
            },


            LOGOUT() {
                this.$store.dispatch("LOGOUT_AUTH");
            },

            SET_ANIMATION_SLIDER(Channel) {
                this.$store.commit('CHANNEL_SLIDER_ANIMATION', true)
            }

        },

        filters: {
            // Cut word
            truncate(string, value) {
                return string.substring(0, value);
            }
        }
    }
</script>
