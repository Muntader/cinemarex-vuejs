<template>
<div class="wolf-player">
    <div class="loader" v-if="spinner_load">
        <loader></loader>
    </div>

    <div class="col-12 col-md-8 offset-md-2 mt-5" v-if="!spinner_load">

        <div class="episode-details d-inline mt-3">
            <div class="jw-player">
                <div class="jwplayer-loader" style="text-align: center;height: 70vh; background: #1d1d1d; position:relative;" v-if="loadPlayer">
                    <loader style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    "></loader>
                </div>
                <div id="jwplayer"></div>
            </div>
            <div class="episode-name mt-1">
                <p>{{data.current_news.title}}</p>
            </div>

            <div class="overview">
                <small class="text-muted"> {{data.current_news.description}}</small>
            </div>

        </div>

        <div class="suggestions mt-5" v-if="data.suggestion !== null">
            <h5>
                <strong>{{$t('home.what_is_new')}}</strong>
            </h5>

            <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true" :paginationEnabled="false" :autoplay="true" :autoplayTimeout="5000" easing="ease-in-out" :perPageCustom="[[220,2], [420,3],[768, 4], [1024, 5], [1360, 7]]">
                <slide class="col-6 col-md-4 col-lg-4 col-xl-1-5 m-2" v-for="(item,index) in data.suggestion" :key="index">

                    <div class="news" @click="CHANGE_NEWS(item.id)" style="cursor: pointer;">
                        <!-- <progressive-img :src="md_posters + item.poster" :alt="item.name" width="100%" :blur="1" v-if="item.cloud === 'aws' " /> -->
                        <progressive-img :src="item.image" :alt="item.title" width="100%" :blur="1" v-if="item.cloud === 'local' " />
                        <progressive-img :src="item.image" :alt="item.title" width="100%" :blur="1" v-if="item.cloud === 'aws' " />

                        <div class="title mt-1">
                            <h6><strong> {{item.title}} </strong></h6>
                            <small class="text-muted"> {{item.description}}</small>
                        </div>
                    </div>

                </slide>
            </carousel>

        </div>

    </div>

</div>
</template>

<script>
const alertify = require("alertify.js");
import {
    mapState
} from "vuex";
import loader from "../utils/loader"
import {
    Carousel,
    Slide
} from "vue-carousel";
export default {

    name: "news-player",
    components: {
        Carousel,
        Slide,
        loader
    },
    data() {
        return {
            loadPlayer: true
        }
    },
    computed: mapState({
        data: state => state.player.news_data,
        spinner_load: state => state.player.player_spinner,
    }),

    mounted() {
        if (this.$auth.isAuthenticated()) {
            this.$store.dispatch("LOAD_NEWS_VIDEO", this.$route.params.id);
        } else {
            this.$store.dispatch("LOAD_GHOST_NEWS_VIDEO", this.$route.params.id);
        }

    },
    watch: {
        data(val) {
            this.loadPlayer = true;
            setTimeout(() => {
                let player = null;
                if (this.data.current_news.chromecast) {
                    player = jwplayer("jwplayer").setup({
                        "playlist": val.playlist,
                        "cast": {},
                        "autostart": true,
                        "advertising": {
                            "client": "vast",
                        },
                        "sharing": {
                            "sites": ["reddit", "facebook", "twitter"]
                        }
                    });
                } else {
                    player = jwplayer("jwplayer").setup({
                        "playlist": val.playlist,
                        "autostart": true,
                        "advertising": {
                            "client": "vast",
                        },
                        "sharing": {
                            "sites": ["reddit", "facebook", "twitter"]
                        }
                    });
                }

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
        CHANGE_NEWS(id) {

            if (this.$auth.isAuthenticated()) {
                this.$store.dispatch("LOAD_NEWS_VIDEO", id);
            } else {
                this.$store.dispatch("LOAD_GHOST_NEWS_VIDEO", id);
            }

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
        }
    }
};
</script>

