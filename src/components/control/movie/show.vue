<template>
    <div class="c-app-movies-show">

        <div class="c-app-movies-show-content" v-if="MOVIE_CONTENT.movie != null ">

            <!-- Exit Button -->

            <div class="c-app-movies-show-content__header">

                <div class="header-image">
                    <div class="full-background" v-if="MOVIE_CONTENT.movie.cloud  === 'local'"
                         :style="{
                            backgroundImage: 'url(' + site_link + '/storage/backdrops/original_' + MOVIE_CONTENT.movie.backdrop +')',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center 0%',
                            backgroundAttachment: 'scroll',
                            height: '75vh'
                            }">

                    </div>

                    <div class="full-background" v-if="MOVIE_CONTENT.movie.cloud === 'aws'"
                         :style="{
                            backgroundImage: 'url(' + lg_backdrop + MOVIE_CONTENT.movie.backdrop + ')',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center 0%',
                            backgroundAttachment: 'scroll',
                            height: '75vh'
                            }">

                    </div>

                    <div class="header-image__gradient"></div>


                </div>

                <div class="header-content">
                    <div class="header-banner">
                        <div class="header-banner__content">
                            <div class="header-banner__content--control">
                                <a href="#description" class="overview-info">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-255 347 100 100">
                                        <path class="st0"
                                              d="M-202.6 369.7c1-1.2 2.4-1.9 3.9-1.9 1.2 0 2.4.4 3.1 1.3.8.8 1.2 2 1.2 3.2 0 1.6-.5 3.1-1.7 4.3-1.2 1.2-2.5 1.9-3.9 1.9-1.2 0-2.2-.4-3.1-1.3-.8-.8-1.2-2-1.2-3.4.1-1.5.7-3 1.7-4.1M-194.6 416.5c-4.1 3.9-6.9 6.3-8.8 7.4-2 1.2-3.7 1.8-5.1 1.8s-2.5-.5-3.4-1.3c-.8-.9-1.2-2.2-1.2-3.6 0-3.8 2.1-12.7 6.4-27.2.1-.3.1-.5.1-.7-.1.1-.4.1-.5.3-.4.3-1.4 1.1-4.6 4.3-.5.5-1.2.5-1.8.1l-1.8-1.5c-.3-.3-.5-.5-.5-.9s.1-.8.4-1.1c2.9-3.4 5.6-5.7 8.1-7.1 2.6-1.5 4.7-2.2 6.7-2.2 1.2 0 2.2.3 2.9.9.8.7 1.2 1.6 1.2 2.7 0 .7-.4 2.6-2.7 11.2-3.5 12.3-4.3 16.7-4.4 18.2.7-.4 2.2-1.6 5.6-4.8.5-.5 1.3-.5 1.8 0l1.7 1.6c.3.3.4.7.4.9 0 .5-.3.9-.5 1z"/>
                                    </svg>
                                </a>

                                <div class="c-add-my-selection" v-if="IS_AUTHENTICATED">

                                    <div class="c-add-my-selection__add" v-if="!MOVIE_CONTENT.movie.is_favorite"
                                         @click.prevent="ADD_TO_COLLECTION(MOVIE_CONTENT.movie.id, MOVIE_CONTENT.movie.channel_name, 'movie')">
                                        <div class="select-icon">
                                            <svg width="20" viewBox="0 0 448 448"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="c-add-my-selection__selected" v-if="MOVIE_CONTENT.movie.is_favorite"
                                         @click.prevent="ADD_TO_COLLECTION(MOVIE_CONTENT.movie.id, MOVIE_CONTENT.movie.channel_name, 'movie')">
                                        <div class="in-select-icon">
                                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                 width="19" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334;"
                                                 xml:space="preserve">
                                                 <g>
                                                     <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
                                                                                    c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
                                                                                    c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
                                                                                    l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
                                                                                    L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
                                                 </g>
                                            </svg>

                                        </div>

                                        <div class="selected-icon">
                                            <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                 width="19"viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;"
                                                 xml:space="preserve">
                                                    <g>
                                                        <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
                                                                        c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
                                                                        c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
                                                                        c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
                                                                        C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
                                                                        c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"/>
                                                    </g>
                                            </svg>

                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div class="header-banner__content--title">
                                {{MOVIE_CONTENT.movie.name}}
                            </div>
                        </div>

                    </div>
                </div>

                <div class="body-content">
                    <div class="tv-show-content">
                        <div class="tv-show-content__category-title">
                            <h3>{{MOVIE_CONTENT.movie.category_name}}</h3>
                        </div>

                        <div class="tv-show-content__video-content">
                            <div class="tv-show-content__video-content--video-item">
                                <router-link :to="{name: 'show-movie', params:{id: MOVIE_CONTENT.movie.id}}">

                                    <div class="c-thumb-image">
                                        <img :src="site_link + '/storage/backdrops/original_' + MOVIE_CONTENT.movie.backdrop"
                                             v-if="MOVIE_CONTENT.movie.cloud === 'local'"
                                             alt="" width="100%">
                                        <img :src="lg_backdrop + MOVIE_CONTENT.movie.backdrop"
                                             v-if="MOVIE_CONTENT.movie.cloud === 'aws'"
                                             alt="" width="100%">
                                    </div>
                                    <div class="c-info">
                                        <div class="title">
                                            {{MOVIE_CONTENT.movie.name}}
                                        </div>
                                        <div class="description">
                                            1 {{MOVIE_CONTENT.movie.category_name}}
                                        </div>
                                    </div>
                                    <div class="c-overlay"></div>
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="tv-show-description" id="description">
                        <div class="tv-show-description__title">
                            <h3>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-255 347 100 100">
                                    <path class="st0"
                                          d="M-202.6 369.7c1-1.2 2.4-1.9 3.9-1.9 1.2 0 2.4.4 3.1 1.3.8.8 1.2 2 1.2 3.2 0 1.6-.5 3.1-1.7 4.3-1.2 1.2-2.5 1.9-3.9 1.9-1.2 0-2.2-.4-3.1-1.3-.8-.8-1.2-2-1.2-3.4.1-1.5.7-3 1.7-4.1M-194.6 416.5c-4.1 3.9-6.9 6.3-8.8 7.4-2 1.2-3.7 1.8-5.1 1.8s-2.5-.5-3.4-1.3c-.8-.9-1.2-2.2-1.2-3.6 0-3.8 2.1-12.7 6.4-27.2.1-.3.1-.5.1-.7-.1.1-.4.1-.5.3-.4.3-1.4 1.1-4.6 4.3-.5.5-1.2.5-1.8.1l-1.8-1.5c-.3-.3-.5-.5-.5-.9s.1-.8.4-1.1c2.9-3.4 5.6-5.7 8.1-7.1 2.6-1.5 4.7-2.2 6.7-2.2 1.2 0 2.2.3 2.9.9.8.7 1.2 1.6 1.2 2.7 0 .7-.4 2.6-2.7 11.2-3.5 12.3-4.3 16.7-4.4 18.2.7-.4 2.2-1.6 5.6-4.8.5-.5 1.3-.5 1.8 0l1.7 1.6c.3.3.4.7.4.9 0 .5-.3.9-.5 1z"/>
                                </svg>
                                {{MOVIE_CONTENT.movie.name}}
                            </h3>
                        </div>
                        <div class="tv-show-description__main">
                            <div class="tv-show-description__body">
                                <div class="content">
                                    {{MOVIE_CONTENT.movie.overview}}
                                </div>
                            </div>

                            <div class="tv-show-description__aside">

                            </div>
                        </div>
                    </div>

                    <div class="tv-show-similar" v-if="MOVIE_CONTENT.similar != null">
                            <div class="tv-show-similar__title">
                                <h3>{{$t('show.recommendation_movie')}}</h3>
                            </div>

                            <div class="tv-show-similar__slider">

                            <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true" :paginationEnabled="false" :autoplay="false" easing="linear" :scrollPerPage="true" :perPageCustom="[[220,1], [520,3],[768, 4], [1024, 6], [1920, 7]]">

                                <slide class="tv-show-similar__item" v-for="(item, index) in MOVIE_CONTENT.similar" :key="index">
                                        <router-link :to="{name: 'show-movie', params:{id: item.id}}">

                                            <div class="c-thumb-image">
                                                <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                                     v-if="item.cloud === 'local'"
                                                     alt="" width="100%">
                                                <img :src="lg_backdrop + item.backdrop"
                                                     v-if="item.cloud === 'aws'"
                                                     alt="" width="100%">
                                            </div>
                                            <div class="c-info">
                                                <div class="title">
                                                    {{item.name}}
                                                </div>
                                                <div class="description">
                                                    1 {{item.category_name}}
                                                </div>
                                            </div>
                                            <div class="c-overlay"></div>
                                        </router-link>
                                </slide>

                            </carousel>

                            </div>

                    </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";
    import exitButton from "../utils/exit-button.vue";
    import {
        Carousel,
        Slide
    } from "vue-carousel";

    export default {
        name: "movie-show",

        data() {
            return {
                animation: false,
                castShow: null,
                showplyrmodal: false,
                collection: {
                    id: null,
                    poster: null,
                    name: null,
                    type: null,
                    index: null
                }
            };
        },

        components: {
            "exit-button": exitButton,
            Carousel,
            Slide,
        },

        computed: mapState({
            MOVIE_CONTENT: state => state.movies.MOVIE_CONTENT,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED
        }),

        beforeDestroy() {
            this.$store.commit("CLEAR_MOVIE_SHOW_DATA");
        },

        mounted() {
            if (this.IS_AUTHENTICATED) {
                this.$store.dispatch("GET_MOVIE_SUMMARY", this.$route.params.id);
            }
        },

        watch: {
            MOVIE_CONTENT() {
                document.title = this.MOVIE_CONTENT.movie.name;
            },
            '$route.params.id': function () {
                if (this.IS_AUTHENTICATED) {
                    this.$store.dispatch("GET_MOVIE_SUMMARY", this.$route.params.id);
                }
            },

        },

        methods: {
            SIMILAR_SHOW(id) {
                this.$store.dispatch("GET_MOVIE_DETAILS", id);
            },


            ADD_TO_COLLECTION(ID, ChannelName, Type, Index, ParentIndex) {
                if (this.MOVIE_CONTENT.movie.is_favorite === 1)
                    this.MOVIE_CONTENT.movie.is_favorite = 0
                else
                    this.MOVIE_CONTENT.movie.is_favorite = 1;

                this.$store.dispatch('ADD_NEW_TO_COLLECTION', {
                    ID: ID,
                    ChannelName: ChannelName,
                    Type: Type
                });
            },
        }
    };
</script>
