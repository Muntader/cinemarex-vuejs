<template>
    <div class="c-rti-root">
        <div class="c-app" :class="{'c-app-blur-page': LOGIN_MODAL_OPEN, 'c-app-black-overlay-page': PROFILE_MODAL_OPEN}">


            <vue-progress-bar></vue-progress-bar>
            <!-- set progressbar -->

            <div class="c-app-container" v-if="!block_site">

                <div class="c-app-header">
                    <navbar v-if="$route.name !== 'LiveTV-Player' && $route.name !== 'Movie-Player' && $route.name !== 'TV-Show-Player' "></navbar>
                </div>

                <div class="c-app-body">

                    <sidebar v-if="$route.name !== 'show-movie' && $route.name !== 'show-series' && $route.name !== 'LiveTV-Player' && $route.name !== 'Movie-Player' && $route.name !== 'TV-Show-Player' && $route.name !== 'search' "></sidebar>

                    <router-view class="c-app-content"/>

                    <search-page v-if="showSearchPage"></search-page>

                </div>

                <!-- Router view -->

            </div>


            <div class="site-blocked" v-else>
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                    </div>
                    <h2>This site not available in your region</h2>
                </div>
            </div>

        </div>

        <div class="c-app-modal">
            <login v-if="LOGIN_MODAL_OPEN"></login>
            <settings v-if="PROFILE_MODAL_OPEN"></settings>

        </div>
    </div>
</template>

<script>
    import sidebar from "./components/control/sidebar.vue";
    import navbar from "./components/control/navbar.vue";
    import message from "./components/control/notification/message.vue";
    import ads_notifcation from "./components/control/notification/ads.vue";
    import searchPage from './components/control/search/search.vue'
    import LoginComponent from './components/auth/login'
    import SettingsComponent from './components/control/setting/setting'

    import {
        mapState
    } from "vuex";

    export default {
        name: "app",

        components: {
            sidebar,
            navbar,
            message,
            'login': LoginComponent,
            'settings': SettingsComponent,
            'ads-notifcation': ads_notifcation,
            'search-page': searchPage
        },

        data() {
            return {
                active: null,
                genreActiveTranslate: "home.genre",
                index: 0,
                message_alert: {},
                footer_show: false,
                search_show: false,
                scroll_up: false,
                url: null,
                query: null,
                show_menu: false,
                collapse_sidebar: false,
                sortby_active: false,
                show_loading: true,
                block_site: false
            };
        },

        computed: mapState({
            getBlockData: state => state.home.footer,
            showSearchPage: state => state.event.show_search_page,
            getShowPagePath: state => state.event.get_path_show_page,
            LOGIN_MODAL_OPEN: state => state.event.SHOW_LOGIN_MODAL,
            PROFILE_MODAL_OPEN: state => state.event.SHOW_PROFILE_MODAL,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED

        }),

        watch: {
            getBlockData(val) {
                // Language
                // List of language
                var arrLang = ['en', 'fr']

                // Set Language

                if (arrLang.includes(val.language)) {
                    this.$i18n.locale = val.language;
                } else {
                    this.$i18n.locale = 'en'
                }

                // Check Blocking Site By Location
                if (!val.geo_block_status) {
                    this.block_site = true;
                }

            },
        },

        mounted() {
            //  [App.vue specific] When App.vue is finish loading finish the progress bar
            this.$Progress.finish();
        },

        created() {

            // Check Authenticated
            this.$store.commit('IS_AUTHENTICATED');


            // Check user status
            if (this.IS_AUTHENTICATED) {
                axios
                    .get("http://localhost:8000/api/v1/get/check/user")
                    .then(info => {
                        /* Payment Reactive
                         *********************/
                        if (info.data.status === "confirm_step") {
                            /* Email Confirm */

                            this.message_alert = "confirm_email";

                            // Language
                            // List of language
                            var arrLang = ['en', 'fr']

                            // Set Language

                            if (arrLang.includes(info.data.language)) {
                                this.$i18n.locale = info.data.language;
                            } else {
                                this.$i18n.locale = 'en'
                            }

                            // Set Info
                            this.$store.commit('SET_USER_INFO', {
                                Username: info.data.name,
                                Email: info.data.email,
                                Image: info.data.image,
                                Birthday: info.data.birthday,
                                Language: this.$i18n.locale,
                                Status: 'confirm_step'
                            });


                        } else if (info.data.status === "active") {
                            // Language
                            var arrLang = ['en', 'fr']

                            // Set Language

                            if (arrLang.includes(info.data.language)) {
                                this.$i18n.locale = info.data.language;
                            } else {
                                this.$i18n.locale = 'en'
                            }

                            // Set Info
                            this.$store.commit('SET_USER_INFO', {
                                Username: info.data.name,
                                Email: info.data.email,
                                Image: info.data.image,
                                Birthday: info.data.birthday,
                                Language: this.$i18n.locale,
                                Status: 'active'
                            });

                            // set caption
                            this.$Helper.set_caption(info.data.caption);

                        } else {
                            this.$store.dispatch("LOGOUT_AUTH");
                        }
                    })
                    .catch(error => {
                        this.$store.dispatch("LOGOUT_AUTH");
                    });
            }

            //  [App.vue specific] When App.vue is first loaded start the progress bar
            this.$Progress.start();
            //  hook the progress bar to start before we move router-view
            this.$router.beforeEach((to, from, next) => {
                //  does the page we want to go to have a meta.progress object
                if (to.meta.progress !== undefined) {
                    let meta = to.meta.progress;
                    // parse meta tags
                    this.$Progress.parseMeta(meta);
                }
                //  start the progress bar
                this.$Progress.start();
                //  continue to next page
                next();
            });

            //  hook the progress bar to finish after we've finished moving router-view
            this.$router.afterEach((to, from) => {
                //  finish the progress bar
                this.$Progress.finish();
            });


        },

        methods: {
            SEARCH() {
                this.$router.push({
                    name: "search",
                    params: {
                        search: this.query
                    }
                });
            },

        },
    };
</script>

<style scoped>
    .site-blocked {

        position: relative;
        height: 100vh;
        background: #fff;

    }

    .site-blocked .notfound {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
    }

    .site-blocked {
        width: 100%;
        text-align: center;
    }

    .site-blocked .notfound-404 {
        height: 280px;
        position: relative;
        z-index: -1;
    }

    .site-blocked .notfound-404 h1 {
        font-family: 'Montserrat', sans-serif;
        font-size: 230px;
        margin: 0px;
        font-weight: 900;
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        -ms-transform: translateX(-50%);
        transform: translateX(-50%);
        background: url('/assets/default/img/bg.jpg') no-repeat;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-size: cover;
        background-position: center;
    }

    .site-blocked h2 {
        font-family: 'Montserrat', sans-serif;
        color: #000;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 0;
    }

    .site-blocked p {
        font-family: 'Montserrat', sans-serif;
        color: #000;
        font-size: 14px;
        font-weight: 400;
        margin-bottom: 20px;
        margin-top: 0px;
    }

    .site-blocked a {
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        text-decoration: none;
        text-transform: uppercase;
        background: #0046d5;
        display: inline-block;
        padding: 15px 30px;
        border-radius: 40px;
        color: #fff;
        font-weight: 700;
        -webkit-box-shadow: 0px 4px 15px -5px #0046d5;
        box-shadow: 0px 4px 15px -5px #0046d5;
    }

    @media only screen and (max-width: 767px) {
        .site-blocked .notfound-404 {
            height: 142px;
        }

        .site-blocked .notfound-404 h1 {
            font-size: 112px;
        }
    }
</style>
