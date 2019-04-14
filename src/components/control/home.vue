<template>
<div class="c-app-channel-content">
    <div class="c-app-channel-content__top-carousel">
        <carousel  :navigationEnabled="false" :paginationEnabled="true" :autoplay="false" :autoplayTimeout="5000" :loop="true" easing="slideup" :perPage="1" :mouseDrag="false">
            <slide class="c-carousel-item" v-for="(item, index) in ChannelContent.TopList" :key="index" v-if="ChannelContent.TopList !== null">
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
                        <img src="../../assets/default/img/page/channel/play.svg" alt="Play Icon" width="20">
                        See The Video
                    </div>
                </div>

            </slide>
        </Carousel>
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
import collection from "./collection/new.vue";
import loader from "./utils/loader"

export default {
    name: "home",
    components: {
        Carousel,
        Slide,
        loader
    },
    data() {
        return {
        };
    },

    computed: mapState({
        ChannelContent: state => state.ghost_home.ChannelContent,
        HomeLoading: state => state.ghost_home.HomeLoading,
    }),

    mounted() {
        if (this.$auth.isAuthenticated()) {
            this.$store.dispatch("GET_HOME_LIST", 'rti1');
        } else {
            this.$store.dispatch('GET_GHOST_HOME_LIST', 'rti1');
        }
    },

    methods: {

    },

    filters: {
        // Cut word
        truncate(string, value) {
            return string.substring(0, value) + "...";
        }
    }
};
</script>
