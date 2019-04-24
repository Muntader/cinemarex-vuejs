<template>
    <div class="wolf-player">

        <div class="loader" v-if="spinner_load">
            <loader></loader>
        </div>
        <div class="jw-player" v-if="!spinner_load">
            <div class="loader" v-if="loadPlayer">
                <loader></loader>
            </div>

            <div id="tvshow-player"></div>

            <div class="geo-block-error" v-if="get_block_error">
                <div class="image">
                    <img src="../../../assets/default/img/no-connection-5.png" alt="error" width="100%">
                </div>
                <div class="title">
                    <h3>This content is not available in your country</h3>
                </div>
            </div>

            <div class="geo-block-error" v-if="only_users">
                <div class="image">
                    <img src="../../../assets/default/img/eastwood-sign-in.png" alt="error" width="100%">
                </div>
                <div class="title">
                    <h3>{{$t('player.login_message')}}</h3>
                    <button @click="SHOW_LOGIN_MODAL()" class="btn btn-md-up btn-waring btn-play" role="button">
                        {{$t('register.login')}}
                    </button>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    const alertify = require("alertify.js");
    import {
        mapState
    } from "vuex";
    import {
        Carousel,
        Slide
    } from "vue-carousel";
    import loader from "../utils/loader"

    export default {

        name: "series-player",
        components: {
            Carousel,
            Slide,
            loader
        },
        data() {
            return {
                episode_title: "",
                series_title: "",
                url_subtitle: "",
                seasonHide: true,
                active: "",
                activeSeason: "",
                report_problem_type: null,
                report_details: null,
                report_button: false,
                get_block_error: false,
                episode_changed: false,
                timeRequest: 150,
                show_report: false,
                loadPlayer: true,
                only_users: false,
                stop_player: false,
                season_number_dropdown: null
            };
        },

        computed: mapState({
            data: state => state.player.series_data,
            spinner_load: state => state.player.player_spinner,
            season_playlist_active: state => state.player.season_playlist_active
        }),

        mounted() {
            if (this.$route.params.episode_id !== undefined && this.$route.params.series_id !== undefined) {
                if (this.$auth.isAuthenticated()) {
                    this.$store.dispatch("LOAD_SERIES_PLAYER", {
                        episode_id: this.$route.params.episode_id,
                        series_id: this.$route.params.series_id
                    });
                } else {
                    this.$store.dispatch("LOAD_GHOST_SERIES_PLAYER", {
                        episode_id: this.$route.params.episode_id,
                        series_id: this.$route.params.series_id
                    });
                }

                // Sent Unique View After 2.5s
                setTimeout(() => {
                    this.$store.dispatch('CREATE_EPISODE_UNIQUE_VIEWS', {
                        episode_id: this.$route.params.episode_id,
                        series_id: this.$route.params.series_id
                    })
                }, 2500)

            } else if (this.$route.params.series_id !== undefined) {
                // Run video
                if (this.$auth.isAuthenticated()) {
                    this.$store.dispatch("LOAD_SERIES_PLAYER", {
                        series_id: this.$route.params.series_id
                    });
                } else {
                    this.$store.dispatch("LOAD_GHOST_SERIES_PLAYER", {
                        series_id: this.$route.params.series_id
                    });
                }

                // Sent Unique View After 2.5s
                setTimeout(() => {
                    this.$store.dispatch('CREATE_EPISODE_UNIQUE_VIEWS', {
                        series_id: this.$route.params.series_id
                    })
                }, 2500)

            } else {
                this.$route.push('404');
            }

        },

        watch: {

            data() {
                this.only_users = false;
                // dropdown season number
                this.season_number_dropdown = this.data.current_episode.season_number;

                if (!this.data.geo_status) {
                    this.get_block_error = true;
                    this.stop_player = true;
                    return;
                }
                this.loadPlayer = true;
                setTimeout(() => {
                    let player = null;
                    if (this.data.current_episode.chromecast) {
                        player = jwplayer("tvshow-player").setup({
                            "playlist": this.data.playlist,
                            "cast": {},
                            "autostart": true,
                            "advertising": {
                                "client": "vast",
                            }
                        });
                    } else {
                        player = jwplayer("tvshow-player").setup({
                            "playlist": this.data.playlist,
                            "autostart": true,
                            "advertising": {
                                "client": "vast",
                            }
                        });
                    }

                    // Load custom video file on error
                    player.on('error', () => {
                        player.load({
                            file: "//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
                            image: "//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
                        });
                        player.play();

                    });

                    player.on('ready', () => {
                        if (this.episode_changed) {
                            jwplayer().playlistItem(0)
                            player.play();
                        } else {
                            player.play();
                        }

                        if (this.$auth.isAuthenticated()) {
                            if (this.data.current_episode.current_time != null) {
                                jwplayer().seek(this.data.current_episode.current_time);
                            }
                        }

                        // Check subtitle
                        if (localStorage.getItem('caption') !== "" && localStorage.getItem('caption') != "undefined") {

                            const parsedCaption = JSON.parse(localStorage.getItem('caption'));
                            jwplayer().setCaptions(parsedCaption);
                        }

                        this.loadPlayer = false;
                    });

                    if (this.$auth.isAuthenticated()) {
                        if (this.data.current_episode.current_time != null) {
                            jwplayer().seek(this.data.current_episode.current_time);
                        }

                        player.on('time', () => {
                            if (jwplayer().getPosition().toFixed() == this.timeRequest) {
                                this.timeRequest = this.timeRequest + 150;
                                axios.post('http://localhost:8000/api/v1/create/watch/series/recently', {
                                    current_time: jwplayer().getPosition().toFixed(),
                                    duration_time: jwplayer().getDuration().toFixed(),
                                    episode_id: this.data.current_episode.id,
                                    series_id: this.data.current_episode.series_id
                                });
                            }
                        });

                    } else {
                        if (this.data.series.show == 2) {
                            player.on('time', () => {
                                if (jwplayer().getPosition().toFixed() >= 45) {
                                    this.only_users = true;
                                    jwplayer().remove()
                                }
                            });
                        }
                    }

                    // OnSeek
                    player.on('seek', () => {
                        this.timeRequest = parseInt(jwplayer().getPosition().toFixed()) + 150;
                    });

                }, 500);

            }

        },

        methods: {

            CHANGE_SERIES(episode_id) {
                if (this.$auth.isAuthenticated()) {
                    this.$store.dispatch("LOAD_SERIES_PLAYER", {
                        episode_id: episode_id,
                    });
                } else {
                    this.$store.dispatch("LOAD_GHOST_SERIES_PLAYER", {
                        episode_id: episode_id,
                    });
                }
            },

            SEND_REPORT() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.report_button = true;
                        axios
                            .post("http://localhost:8000/api/v1/create/report/series", {
                                type: this.report_problem_type,
                                details: this.report_details,
                                episode_id: this.data.current_episode.id,
                                series_id: this.data.current_episode.series_id
                            })
                            .then(
                                res => {
                                    if (res.data.status === "success") {
                                        this.report_button = false;
                                        this.$store.commit("CLOSE_REPORT");
                                        alertify.logPosition("top right");
                                        alertify.success("Successful Send, our team will check it soon");
                                    }
                                },
                                error => {
                                    //
                                }
                            );
                    }
                });
            },

            // When Colse video re-play video
            CLOSE_REPORT() {
                this.$store.commit('CLOSE_REPORT')
            },

            CHANGE_EPISODE(episode_id, series_id) {
                this.episode_changed = true;

                if (this.$auth.isAuthenticated()) {
                    this.$store.dispatch("LOAD_SERIES_PLAYER", {
                        episode_id: episode_id,
                        series_id: series_id
                    });
                } else {
                    this.$store.dispatch("LOAD_GHOST_SERIES_PLAYER", {
                        episode_id: episode_id,
                        series_id: series_id
                    });
                }

            },

            FOMRAT_DATE(date) {
                var date = new Date(date.replace(/-/g, '/'));
                var monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];

                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                return day + ' ' + monthNames[monthIndex] + ' ' + year;
            },

            GET_SEASON(id) {
                axios.get("http://localhost:8000/api/v1/get/series/season/" + id)
                    .then(response => {
                            if (response.status == 200) {
                                this.data.current_season = response.data.data;
                            }
                        },
                        error => {
                            console.log('error in request')
                        })
            }
        }
    };
</script>
