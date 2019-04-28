<template>
    <div class="c-app-channel-content">
        <transition name="slide">
            <div class="c-app-channel-content__loader-page" v-show="HomeLoading && CHANNEL_SLIDER_ANIMATION">

                <div class="c-app-channel-content__loader-page--rti1 fix-loader-size"
                     v-if="$route.params.ChannelName === undefined || $route.params.ChannelName === 'rti1' ">
                    <img src="../../assets/default/img/channels/RT1_withBackground_v4.jpg" alt="RTI1"
                         class="rti1-loader-image">
                </div>

                <div class="c-app-channel-content__loader-page--rti2 fix-loader-size"
                     v-if="$route.params.ChannelName === 'rti2' ">
                    <img src="../../assets/default/img/channels/RT2_withBackground_v2.jpg" alt="RTI2"
                         class="rti2-loader-image">
                </div>

                <div class="c-app-channel-content__loader-page--rti3 fix-loader-size"
                     v-if="$route.params.ChannelName === 'rti3' ">
                    <img src="../../assets/default/img/channels/RTI3_WithBackground_720p.jpg" alt="RTI3"
                         class="rti3-loader-image">
                </div>

                <div class="c-app-channel-content__loader-page--radio-ci fix-loader-size"
                     v-if="$route.params.ChannelName === 'radio-ci' ">
                    <img src="../../assets/default/img/channels/RADIO-CI.png" alt="Radio-ci"
                         class="radio-ci-loader-image">
                </div>

                <div class="c-app-channel-content__loader-page--frequence fix-loader-size"
                     v-if="$route.params.ChannelName === 'frequence' ">
                    <img src="../../assets/default/img/channels/FREQUENCE2_withBackground_v3.jpg" alt="FREQUENCE2"
                         class="frequence-loader-image">
                </div>

                <div class="c-app-channel-content__loader-page--radio-flimee fix-loader-size"
                     v-if="$route.params.ChannelName === 'radio-flimee' ">
                    <img src="../../assets/default/img/channels/Radio_filmee_withBackground_v4.jpg" alt="Radio Flimee"
                         class="radio-flimee-loader-image">
                </div>
            </div>
        </transition>


        <div class="c-app-channel" v-if="!HomeLoading">

            <div class="c-app-channel-content__logo_channel">
                <span v-if="$route.params.ChannelName === 'rti1' || $route.name === 'discover'">
                    <img src="../../assets/default/img/channels/RTI1.png" alt="RTI1 Logo"
                                       class="c-channel-logo">
                </span>

                <span v-if="$route.params.ChannelName === 'rti2'">
                    <img src="../../assets/default/img/channels/RTI2.png" alt="RTI2 Logo"
                                       class="c-channel-logo">
                </span>

                <span v-if="$route.params.ChannelName === 'rti3'">
                    <img src="../../assets/default/img/channels/RTI3.png" alt="RTI3 Logo"
                                       class="c-channel-logo">
                </span>

                <span v-if="$route.params.ChannelName === 'radio-ci'">
                    <img src="../../assets/default/img/channels/RADIO-CI.png" alt="RADIO CI Logo"
                                       class="c-channel-logo">
                </span>

                <span v-if="$route.params.ChannelName === 'frequence'">
                    <img src="../../assets/default/img/channels/FREQUENCE-2.png" alt="FREQUENCE Logo"
                                       class="c-channel-logo">
                </span>
                <span v-if="$route.params.ChannelName === 'radio-flimee'">
                    <img src="../../assets/default/img/channels/Radio_Filmee.png" alt="Radio Filmee Logo"
                                       class="c-channel-logo">
                </span>

            </div>


            <div class="c-app-channel-content__top-carousel">
                <carousel :navigationEnabled="false" :paginationEnabled="true" :autoplay="true" :autoplayTimeout="6000"
                          :loop="true" easing="slideup" :perPage="1" :mouseDrag="false">
                    <slide class="c-carousel-item" v-for="(item, index) in ChannelContent.TopList" :key="index"
                           v-if="ChannelContent.TopList !== null">

                        <router-link :to="{name: 'show-movie', params: {id: item.id}}" v-if="item.type === 'movie'">

                            <div class="c-backdrop-item"
                                 :style="{
                                         backgroundImage: 'url(' + site_link + '/storage/backdrops/original_' + item.backdrop + ')',
                                         backgroundSize: 'cover',
                                         backgroundRepeat: 'no-repeat',
                                         backgroundPosition: 'center 0%',
                                         backgroundAttachment: 'scroll',
                                         height: '100vh'
                                         }" v-if="item.cloud === 'local' ">

                            </div>

                            <div class="c-backdrop-item"
                                 :style="{
                                         backgroundImage: 'url(' + lg_backdrop + item.backdrop + ')',
                                         backgroundSize: 'cover',
                                         backgroundRepeat: 'no-repeat',
                                         backgroundPosition: 'center 0%',
                                         backgroundAttachment: 'scroll',
                                         height: '100vh'
                                         }" v-if="item.cloud === 'aws' ">

                            </div>

                            <div class="c-item-details">
                                <div class="c-item-title">
                                    {{item.name}}
                                </div>
                                <div class="c-play-item">
                                    <img src="../../assets/default/img/page/channel/play.svg" alt="Play Icon"
                                         width="20">
                                    See The Video
                                </div>
                            </div>

                        </router-link>

                        <router-link :to="{name: 'show-series', params: {id: item.id}}" v-if="item.type === 'series'">

                            <div class="c-backdrop-item"
                                 :style="{
                                         backgroundImage: 'url(' + site_link + '/storage/backdrops/original_' + item.backdrop + ')',
                                         backgroundSize: 'cover',
                                         backgroundRepeat: 'no-repeat',
                                         backgroundPosition: 'center 0%',
                                         backgroundAttachment: 'scroll',
                                         height: '100vh'
                                         }" v-if="item.cloud === 'local' ">

                            </div>

                            <div class="c-backdrop-item"
                                 :style="{
                                         backgroundImage: 'url(' + lg_backdrop + item.backdrop + ')',
                                         backgroundSize: 'cover',
                                         backgroundRepeat: 'no-repeat',
                                         backgroundPosition: 'center 0%',
                                         backgroundAttachment: 'scroll',
                                         height: '100vh'
                                         }" v-if="item.cloud === 'aws' ">

                            </div>

                            <div class="c-item-details">
                                <div class="c-item-title">
                                    {{item.name}}
                                </div>
                                <div class="c-play-item">
                                    <img src="../../assets/default/img/page/channel/play.svg" alt="Play Icon"
                                         width="20">
                                    See The Video
                                </div>
                            </div>

                        </router-link>
                    </slide>
                </Carousel>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";
    import {
        Carousel,
        Slide
    } from "vue-carousel";
    import loader from "./utils/loader"

    export default {
        name: "home",
        components: {
            Carousel,
            Slide,
            loader
        },
        data() {
            return {};
        },

        computed: mapState({
            ChannelContent: state => state.discover.ChannelContent,
            HomeLoading: state => state.discover.HomeLoading,
            CHANNEL_SLIDER_ANIMATION: state => state.event.CHANNEL_SLIDER_ANIMATION
        }),

        watch: {
            '$route.params.ChannelName': function (val) {

                let GetChannel
                if (this.$route.name === 'discover') {
                    GetChannel = 'rti1'
                } else {
                    GetChannel = this.$route.params.ChannelName;
                }

                this.$store.dispatch('GET_HOME_LIST', GetChannel);
                this.$store.commit('HIDE_SIDEBAR', true);


            }
        },

        mounted() {
            console.log(this.$route.params.ChannelName)

            let GetChannel
            if (this.$route.name === 'discover') {
                GetChannel = 'rti1'
            } else {
                GetChannel = this.$route.params.ChannelName;
            }
            this.$store.dispatch('GET_HOME_LIST', GetChannel);

            // Hide Transition Animation
            if (!this.HomeLoading) {
                this.$store.commit('CHANNEL_SLIDER_ANIMATION', false)
            }
        },

        methods: {},

        filters: {
            // Cut word
            truncate(string, value) {
                return string.substring(0, value) + "...";
            }
        }
    };
</script>
