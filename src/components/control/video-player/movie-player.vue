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

        name: "movie-player",
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
                stop_player: false
            };
        },

        computed: mapState({
            data: state => state.player.movie_data,
            spinner_load: state => state.player.player_spinner,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED

        }),


        mounted() {
            if (this.IS_AUTHENTICATED) {

                this.$store.dispatch("LOAD_MOVIE_PLAYER", this.$route.params.id);
            } else {
                this.$store.dispatch("LOAD_GHOST_MOVIE_PLAYER", this.$route.params.id);

            }
            // Sent Unique View After 2.5s
            setTimeout(() => {
                this.$store.dispatch('CREATE_MOVIE_UNIQUE_VIEWS', this.$route.params.id)
            }, 2500)

        },

        watch: {

            data() {

                // Runtime format
                if (this.data.current_movie.runtime <= 60) {
                    this.data.current_movie.runtime = this.data.current_movie.runtime + "m";
                } else if (this.data.current_movie.runtime >= 60) {
                    const minutes = this.data.current_movie.runtime % 60;
                    const hours = Math.floor(this.data.current_movie.runtime / 60);
                    this.data.current_movie.runtime = hours + "h " + minutes + "m";
                }


                if (!this.data.geo_status) {
                    this.get_block_error = true;
                    this.stop_player = true;
                    return;
                }
                this.loadPlayer = true;
                setTimeout(() => {
                    let player = null;
                    if (this.data.current_movie.chromecast) {
                        player = jwplayer("tvshow-player").setup({
                            "playlist": this.data.playlist,
                            "cast": {},
                            'autostart': true,
                            "advertising": {
                                "client": "vast",
                            }
                        });
                    } else {
                        player = jwplayer("tvshow-player").setup({
                            "playlist": this.data.playlist,
                            'autostart': true,
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

                    if (this.IS_AUTHENTICATED) {
                        if (this.data.current_movie.current_time != null) {
                            jwplayer().seek(this.data.current_movie.current_time);
                        }

                        player.on('time', () => {
                            if (jwplayer().getPosition().toFixed() == this.timeRequest) {
                                this.timeRequest = this.timeRequest + 150;
                                axios.post('http://localhost:8000/api/v1/create/watch/movie/recently', {
                                    current_time: jwplayer().getPosition().toFixed(),
                                    duration_time: jwplayer().getDuration().toFixed(),
                                    movie_id: this.data.current_movie.id
                                });
                            }
                        });

                        // Check subtitle
                        if (localStorage.getItem('caption') !== "" && localStorage.getItem('caption') != "undefined") {

                            const parsedCaption = JSON.parse(localStorage.getItem('caption'));
                            jwplayer().setCaptions(parsedCaption);

                        }
                    } else {

                        if (this.data.current_movie.show == 2) {
                            player.on('time', () => {
                                if (jwplayer().getPosition().toFixed() >= 5) {
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

                    // Check subtitle
                    player.on('ready', () => {
                        this.loadPlayer = false;
                        if (localStorage.getItem('caption') !== "" && localStorage.getItem('caption') != "undefined") {
                            const parsedCaption = JSON.parse(localStorage.getItem('caption'));
                            jwplayer().setCaptions(parsedCaption);
                        }
                    });
                }, 500);
            }

        },

        methods: {
            CHANGE_MOVIE(id) {
                if (this.$auth.isAuthenticated()) {

                    this.$store.dispatch("LOAD_MOVIE_PLAYER", id);
                } else {
                    this.$store.dispatch("LOAD_GHOST_MOVIE_PLAYER", id);

                }
            },

            SEND_REPORT() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.report_button = true;
                        axios
                            .post("http://localhost:8000/api/v1/create/report/movie", {
                                type: this.report_problem_type,
                                details: this.report_details,
                                id: this.data.current_movie.id,
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

            SHOW_LOGIN_MODAL() {
                this.$store.commit('SHOW_LOGIN_MODAL', true)
            }

        }
    };
</script>
