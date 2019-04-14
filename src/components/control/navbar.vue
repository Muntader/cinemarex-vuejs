<template>
    <div class="c-app-header c-app-header--container">

        <div class="c-app-header__logo">
            <img src="../../assets/default/img/channels/logo_rti.png" alt="RTI Logo" class="c-rti-logo">
        </div>

        <div class="c-app-header__channels">
            <carousel :perPageCustom="[[300, 4], [750, 7], [1024, 7], [1360, 15], [2000, 40]]" :navigationEnabled="true"
                      :autoplay="true" :paginationEnabled="false" :mouseDrag="false">
                <slide style="width: 100%">
                    <div class="c-channel-icon">
                        <img src="../../assets/default/img/channels/RTI1_transparent.png" alt="RTI1 Logo"
                             class="c-channel-logo c-rti1-icon"
                             @mouseover="HoverIcon = 'rti1'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon !== 'rti1' ">
                        <img src="../../assets/default/img/channels/RTI1.png" alt="RTI1 Logo"
                             class="c-channel-logo c-rti1-icon"
                             @mouseover="HoverIcon = 'rti1'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon === 'rti1' ">
                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <div class="c-channel-icon">
                            <img src="../../assets/default/img/channels/RTI2_transparent.png" alt="RTI2 Logo"
                                 class="c-channel-logo c-rti2-icon"
                                 @mouseover="HoverIcon = 'rti2'"
                                 @mouseleave="HoverIcon = null"
                                 v-show="HoverIcon !== 'rti2' ">
                            <img src="../../assets/default/img/channels/RTI2.png" alt="RTI2 Logo"
                                 class="c-channel-logo c-rti2-icon"
                                 @mouseover="HoverIcon = 'rti2'"
                                 @mouseleave="HoverIcon = null"
                                 v-show="HoverIcon === 'rti2' ">
                        </div>
                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <img src="../../assets/default/img/channels/RTI3_transparent.png" alt="RTI3 Logo"
                             class="c-channel-logo c-rti3-icon"
                             @mouseover="HoverIcon = 'rti3'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon !== 'rti3'">
                        <img src="../../assets/default/img/channels/RTI3.png" alt="RTI3 Logo"
                             class="c-channel-logo c-rti3-icon"
                             @mouseover="HoverIcon = 'rti3'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon === 'rti3'">

                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <img src="../../assets/default/img/channels/RADIO-CI_transparent.png" alt="Radio CI  Logo"
                             class="c-channel-logo c-radio-ci-icon"
                             @mouseover="HoverIcon = 'RADIO-CI'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon !== 'RADIO-CI'">
                        <img src="../../assets/default/img/channels/RADIO-CI.png" alt="Radio CI  Logo"
                             class="c-channel-logo c-radio-ci-icon"
                             @mouseover="HoverIcon = 'RADIO-CI'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon === 'RADIO-CI'">

                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <img src="../../assets/default/img/channels/FREQUENCE_transparent_v2.png" alt="FREQUENCE  Logo"
                             class="c-channel-logo c-frequnce2-icon"
                             @mouseover="HoverIcon = 'FREQUENCE'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon !== 'FREQUENCE'">
                        <img src="../../assets/default/img/channels/FREQUENCE-2.png" alt="FREQUENCE Logo"
                             class="c-channel-logo c-frequnce2-icon"
                             @mouseover="HoverIcon = 'FREQUENCE'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon === 'FREQUENCE'">

                    </div>
                </slide>
                <slide>
                    <div class="c-channel-icon">
                        <img src="../../assets/default/img/channels/Radio_Filmee_transparent.png" alt="Radio Filmee  Logo"
                             class="c-channel-logo c-adio-Filmee"
                             @mouseover="HoverIcon = 'Radio_Filmee'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon !== 'Radio_Filmee'">
                        <img src="../../assets/default/img/channels/Radio_Filmee.png" alt="Radio Filmee Logo"
                             class="c-channel-logo c-adio-Filmee"
                             @mouseover="HoverIcon = 'Radio_Filmee'"
                             @mouseleave="HoverIcon = null"
                             v-show="HoverIcon === 'Radio_Filmee'">
                    </div>
                </slide>
            </carousel>
        </div>

        <div class="c-app-header__menu">
            <div class="c-login-icon-container">
                     <span>
                         <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" viewBox="0 0 171 171">
                            <path fill="#FFF"
                                  d="M85,0 C38.0557963,-2.87450344e-15 5.74900688e-15,38.0557963 0,85 C-5.74900688e-15,131.944204 38.0557963,170 85,170 C131.944204,170 170,131.944204 170,85 C170,62.4565984 161.044669,40.8365158 145.104076,24.8959236 C129.163484,8.95533143 107.543402,1.38038523e-15 85,0 Z M85,33.6046512 C99.0887197,33.6046512 110.509884,45.0258151 110.509884,59.1145349 C110.509884,73.2032546 99.0887197,84.6244186 85,84.6244186 C70.9112803,84.6244186 59.4901163,73.2032546 59.4901163,59.1145349 C59.5064558,45.0325887 70.9180539,33.6209907 85,33.6046512 Z M127.5,114.325 C116.173256,127.915116 101.07093,135.406977 85,135.406977 C68.9290698,135.406977 53.8267442,127.915116 42.5,114.315116 L42.1540698,113.9 L42.2331395,113.366279 C44.4174419,99.094186 51.8796512,87.619186 63.255814,81.0465116 L64.0662791,80.5819767 L64.7087209,81.2540698 C69.9971311,86.822826 77.3400325,89.9760008 85.0197674,89.9760008 C92.6995024,89.9760008 100.042404,86.822826 105.330814,81.2540698 L105.973256,80.5819767 L106.744186,81.0465116 C118.100581,87.5994186 125.523256,99.0744186 127.756977,113.356395 L127.836047,113.890116 L127.5,114.325 Z"
                                  opacity=".4" transform="translate(.444 .716)"/>
                        </svg>
                     </span>
            </div>

            <div class="c-text-username" @click="SHOW_LOGIN">
                <span>LOGIN</span>
            </div>
        </div>

        <login v-if="SHOW_LOGIN_MODAL"></login>

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
                HoverIcon: null
            }
        },

        computed: mapState({
            showSearchPageEvent: state => state.event.show_search_page,
            SHOW_LOGIN_MODAL: state => state.event.SHOW_LOGIN_MODAL

        }),

        components: {
            'login': LoginComponent
        },

        created() {

        },
        methods: {
            LOGOUT() {
                this.$store.dispatch("LOGOUT_AUTH");
            },

            SHOW_SEARCH_PAGE() {
                this.$store.commit("SHOW_SEARCH_PAGE");
            },

            SHOW_LOGIN() {
                this.$store.commit('SHOW_LOGIN_MODAL', true)
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
