<template>

    <div class="c-app-channel-grid-content"
         :class="{
         'rti1-overlay-color': $route.params.ChannelName === 'rti1',
         'rti2-overlay-color': $route.params.ChannelName === 'rti2',
         'rti3-overlay-color': $route.params.ChannelName === 'rti3',
         'radio-ci-overlay-color': $route.params.ChannelName === 'radio-ci',
         'frequence-overlay-color': $route.params.ChannelName === 'frequence',
         'radio-flimee-overlay-color': $route.params.ChannelName === 'radio-flimee',
         }"
         ref="c_category_carousel">

        <div class="c-app-channel-no-content" v-if="ListCategoryContent.length === 0">
            <h3>No Content</h3>
        </div>

        <div class="c-app-channel-content" v-else>

            <div class="c-app-channel-grid-content__background">
                <div class="full-background" v-if="ListCategoryContent[0][0].cloud === 'local'"
                     :style="{
                            backgroundImage: 'url(' + site_link + '/storage/backdrops/original_' + ListCategoryContent[0][0].backdrop + ')',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center 0%',
                            backgroundAttachment: 'scroll',
                            height: '100vh'
                            }">

                </div>

                <div class="full-background" v-if="ListCategoryContent[0][0].cloud === 'aws'"
                     :style="{
                            backgroundImage: 'url(' + lg_backdrop + ListCategoryContent[0][0].backdrop + ')',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center 0%',
                            backgroundAttachment: 'scroll',
                            height: '100vh'
                            }">

                </div>
            </div>

            <div class="c-app-channel-grid-content__category-carousel">
                <div class="c-carousel-items">

                    <div class="c-first-grid">
                        <div class="c-carousel-grid-item" v-for="(item, index) in ListCategoryContent[0]"
                             :key="index"
                             v-if="ListCategoryContent[0].length > 0">
                            <div class="c-carousel-grid-item__large">
                                <router-link :to="{name: 'show-movie', params:{id: item.id}}"
                                             v-if="ListCategoryContentFilter.CategoryKind === 'movies'">
                                    <div class="c-thumb-image">
                                        <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                             v-if="item.cloud === 'local'"
                                             alt="" width="100%">
                                        <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                             v-if="item.cloud === 'aws'"
                                             alt="" width="100%">
                                    </div>
                                    <div class="c-info">
                                        <div class="title">
                                            {{item.name}}
                                        </div>
                                        <div class="description">
                                            1 {{ListCategoryContentFilter.CategoryName}}
                                        </div>
                                    </div>
                                    <div class="c-overlay"></div>
                                </router-link>
                            </div>
                        </div>

                        <div class="c-carousel-grid-item">
                            <div class="c-carousel-grid-item__small" v-for="(item, index) in ListCategoryContent[1]"
                                 v-if="ListCategoryContent[1].length > 0">
                                <router-link :to="{name: 'show-movie', params:{id: item.id}}"
                                             v-if="ListCategoryContentFilter.CategoryKind === 'movies'">
                                    <div class="c-thumb-image">
                                        <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                             v-if="item.cloud === 'local'"
                                             alt="" width="100%">
                                        <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                             v-if="item.cloud === 'aws'"
                                             alt="" width="100%">
                                    </div>
                                    <div class="c-info">
                                        <div class="title">
                                            {{item.name}}
                                        </div>
                                        <div class="description">
                                            1 {{ListCategoryContentFilter.CategoryName}}
                                        </div>
                                    </div>
                                    <div class="c-overlay"></div>
                                </router-link>
                            </div>
                        </div>

                    </div>

                    <div class="c-other-grid" v-for="(itemParent, indexParent) in ListCategoryContent"
                         :key="indexParent">
                        <div class="c-carousel-grid-item" v-if="indexParent >= 2">
                            <div class="c-carousel-grid-item__small"
                                 v-for="(item, index) in ListCategoryContent[indexParent]" :key="index">
                                <router-link :to="{name: 'show-movie', params:{id: item.id}}"
                                             v-if="ListCategoryContentFilter.CategoryKind === 'movies'">
                                    <div class="c-thumb-image">
                                        <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                             v-if="item.cloud === 'local'"
                                             alt="" width="100%">
                                        <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                             v-if="item.cloud === 'aws'"
                                             alt="" width="100%">
                                    </div>
                                    <div class="c-info">
                                        <div class="title">
                                            {{item.name}}
                                        </div>
                                        <div class="description">
                                            1 {{ListCategoryContentFilter.CategoryName}}
                                        </div>
                                    </div>
                                    <div class="c-overlay"></div>
                                </router-link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div class="c-app-channel-grid-content__slider-arrow">
                <button role="button" class="slider-arrow-right" v-show="HideRight" @click="swipeRight">
                    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="square" stroke="#fff" stroke-width="8"
                              d="M40 16l43 44m0 0l-43 44"></path>
                    </svg>
                </button>
                <button role="button" class="slider-arrow-left" v-show="HideLeft" @click="swipeLeft">
                    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="square" stroke="#fff" stroke-width="8" d="M40 16l43 44m0 0l-43 44"
                              transform="translate(120, 0) scale(-1, 1)"></path>
                    </svg>
                </button>
            </div>

        </div>

    </div>

</template>

<script>
    import {
        mapState
    } from "vuex";

    export default {

        data() {
            return {
                HideLeft: 0,
                HideRight: 1
            }
        },

        computed: mapState({
            ListCategoryContentFilter: state => state.category_content.ListCategoryContentFilter,
            ListCategoryContent: state => state.category_content.ListCategoryContent,
            ListCategoryContentLoading: state => state.category_content.ListCategoryContentLoading
        }),

        mounted() {
            this.LIST_CATEGORY_CONTENT()
        },

        watch: {


            '$route.params.CategoryName': function () {
                this.LIST_CATEGORY_CONTENT()
            }
        },

        methods: {

            scrollTo(element, scrollPixels, duration) {
                const scrollPos = element.scrollLeft;
                // Condition to check if scrolling is required
                if (!((scrollPos === 0 || scrollPixels > 0) && (element.clientWidth + scrollPos === element.scrollWidth || scrollPixels < 0))) {
                    // Get the start timestamp
                    const startTime =
                        "now" in window.performance
                            ? performance.now()
                            : new Date().getTime();

                    function scroll(timestamp) {
                        //Calculate the timeelapsed
                        const timeElapsed = timestamp - startTime;
                        //Calculate progress
                        const progress = Math.min(timeElapsed / duration, 1);
                        //Set the scrolleft
                        element.scrollLeft = scrollPos + scrollPixels * progress;
                        //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
                        if (timeElapsed < duration) {
                            //Request for animation
                            window.requestAnimationFrame(scroll);
                        } else {
                            return;
                        }
                    }

                    //Call requestAnimationFrame on scroll function first time
                    window.requestAnimationFrame(scroll);
                }
            },

            swipeLeft() {
                const content = this.$refs.c_category_carousel;
                this.scrollTo(content, -window.innerWidth, 500);

                const container = document.querySelector('.c-app-channel-grid-content')
                console.log(container.scrollLeft + '-' + window.innerWidth)
                if (container.scrollLeft === 0 || container.scrollLeft <= window.innerWidth) {
                    this.HideLeft = false;
                    this.$store.commit('HIDE_SIDEBAR', true);
                }
            },

            swipeRight() {
                const content = this.$refs.c_category_carousel;
                this.scrollTo(content, window.innerWidth, 800);

                const container = document.querySelector('.c-app-channel-grid-content')
                if (container.scrollLeft >= 0) {
                    this.HideLeft = true;
                    this.$store.commit('HIDE_SIDEBAR', false);
                }

            },

            LIST_CATEGORY_CONTENT() {
                if (this.$auth.isAuthenticated()) {
                    this.$store.dispatch("LIST_CATEGORY_CONTENT", {
                        ChannelName: this.$route.params.ChannelName,
                        CategoryName: this.$route.params.CategoryName
                    });
                } else {
                    this.$store.dispatch("LIST_GHOST_CATEGORY_CONTENT", {
                        ChannelName: this.$route.params.ChannelName,
                        CategoryName: this.$route.params.CategoryName
                    });
                }
            }
        }
    }
</script>
