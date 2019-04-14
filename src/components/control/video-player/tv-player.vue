<template>
<div class="wolf-player">

    <div class="loader" v-if="spinner_load">
        <loader></loader>
    </div>

    <div class="col-12 col-md-8 offset-md-2 mt-5" v-if="!spinner_load">
        <div class="jw-player" v-if="! get_block_error">
            <div class="jwplayer-loader" style="text-align: center;height: 70vh; background: #1d1d1d; position:relative;" v-if="loadPlayer">
                <loader style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    "></loader>
            </div>
            <div id="tvshow-player"></div>
        </div>
        <div class="geo-block-error" v-show="get_block_error">
            <img src="/player/error-effect.gif" alt="error" width="100%">
            <h3><strong>This content is not available in your country</strong></h3>
        </div>

        <div class="episode-details d-inline mt-3" v-if="! spinner_load">
            <div class="episode-name mt-1">
                <p>{{data.current_channel.name}}</p>
            </div>

            <div class="list-info mt-4">
                <div class="overview">
                    <p> {{data.current_channel.description}}</p>
                </div>
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

    name: "live-tv-player",
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
            loadPlayer: true
        };
    },

    computed: mapState({
        data: state => state.player.tv_data,
        show_report: state => state.player.show_report,
        spinner_load: state => state.player.player_spinner,
        season_playlist_active: state => state.player.season_playlist_active
    }),

    mounted() {
        this.$store.dispatch("LOAD_LIVE_TV", this.$route.params.id);
    },

    watch: {

        data() {

            if (!this.data.geo_status) {
                this.get_block_error = true;
                return;
            }

            this.loadPlayer = true;
            var advs = null;
            if (this.data.ads !== null) {
                advs = {
                    "client": this.data.ads.client,
                    "tag": this.data.ads.tags,
                }
            }

            setTimeout(() => {
                const player = jwplayer("tvshow-player").setup({
                    "file": this.data.current_channel.streaming_url,
                    "autostart": true,
                    "cast": {},
                    "advertising": advs,
                    "sharing": {
                        "sites": ["reddit", "facebook", "twitter"]
                    }
                });
                this.loadPlayer = false;

                // Load custom video file on error
                player.on('error', () => {

                    player.load({
                        file: "//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
                        image: "//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
                    });
                    player.play();

                });

            }, 500);
        }

    },
    methods: {
        CHANGE_MOVIE(id) {
            this.$store.dispatch("LOAD_MOVIE_PLAYER", id);
        },

        SEND_REPORT() {
            this.$validator.validateAll().then(result => {
                if (result) {
                    this.report_button = true;
                    axios
                        .post("/apiv1/create/report/series", {
                            type: this.report_problem_type,
                            details: this.report_details,
                            episode_id: this.data.id,
                            series_id: this.data.series_id
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

        CHANGE_CHANNEL(item) {
            this.data.current_channel = item;
        },

        FOMRAT_DATE(date) {
            date = new Date(date);
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
        }
    }
};
</script>

