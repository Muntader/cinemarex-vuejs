<template>
<div>

    <div class="spinner-load" v-if="loading">
        <div class="hidden-md-up phone">
            <div id="main">

                <span class="spinner"></span>

            </div>
        </div>

        <div class="hidden-sm-down other">
            <div id="main">

                <span class="spinner"></span>

            </div>
        </div>
    </div>

    <div class="show_item" v-if="data.movie != null ">

        <collection-modal @hideModalCollectionCancel="HIDE_COLLECTION_MODAL_CANCEL" @hideModalCollectionSave="HIDE_COLLECTION_MODAL_SAVE" :id="collection.id" :poster="collection.poster" :name="collection.name" :type="collection.type" :index="collection.index"></collection-modal>

        <!-- END Collection component -->

        <div class="exit-icon" @click="$Helper.back()">
            <exit-button></exit-button>
        </div>

        <!-- Exit Button -->

        <div class="show_item__body p-md-5">

            <div class="show_item__header p-4 p-md-5 p-lg-5 p-xl-5 ">

                <div class="row">

                    <!-- END Back -->

                    <!-- END My Collection -->

                    <div class="header__like ml-4">

                        <div class="add" v-if="! data.movie.is_like" @click.prevent="ADD_NEW_LIKE(data.movie.id, 'movie', 'add')">

                            <img src="../../../assets/default/img/dislike.svg" alt="dislike" width="100%">

                            <p>{{$t('show.like')}}</p>
                        </div>

                        <div class="remove" v-if="data.movie.is_like" @click.prevent="ADD_NEW_LIKE(data.movie.id, 'movie', 'delete')">
                            <img src="../../../assets/default/img/like.svg" alt="like" width="100%">

                            <p>{{$t('show.like')}}</p>

                        </div>

                    </div>

                </div>

            </div>

            <!-- END Control Panel -->

            <div class="hidden-sm-down body__background-sm-up">
                <img :src="site_link + '/storage/backdrops/original_' + data.movie.backdrop" :alt="data.movie.name" class="backdrop" width="100%" v-if="data.movie.cloud === 'local'">
                <img :src="lg_backdrop + data.movie.backdrop" :alt="data.movie.name" class="backdrop" width="100%" v-if="data.movie.cloud === 'aws'">

                </div>

                <div class="hidden-md-up body__background-sm-down">
                    <img :src="site_link + '/storage/backdrops/original_' + data.movie.backdrop" :alt="data.movie.name" class="backdrop" width="100%" v-if="data.movie.cloud === 'local'">
                    <img :src="lg_backdrop + data.movie.backdrop" :alt="data.movie.name" class="backdrop" width="100%" v-if="data.movie.cloud === 'aws'">

                    <router-link :to="{name: 'movie-player', params: {id: data.movie.id}}" v-if="data.movie.player == 'local' || data.movie.player == 'link' ">
                        <div class="play hidden-md-up">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                    viewBox="0 0 294.843 294.843" style="enable-background:new 0 0 294.843 294.843;" xml:space="preserve"
                                    width="75px" class="play-big-svg">
                                    <g>
                                        <g>
                                            <path d="M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392   c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421   S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421   s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z"
                                                data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"
                                            />
                                            <path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883   l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333   c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029   C113.877,77.926,111.575,77.902,109.699,78.969z"
                                                data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"
                                            />
                                        </g>
                                    </g>
                                </svg>
                        </div>
                    </router-link>

                </div>

                <!-- END Background image -->

                <div class="col-12 show_item__overview">
                    <div class="row">

                        <div class="col-5 col-md-3 col-xl-2 poster-sm-down hidden-md-up">
                            <div class="poster">
                                <progressive-img :src="site_link + '/storage/posters/600_' + data.movie.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="data.movie.name" width="70%" :aspect-ratio="1.5" :blur="0" v-if="data.movie.cloud === 'local'" />
                                <progressive-img :src="md_poster + data.movie.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="data.movie.name" width="70%" :aspect-ratio="1.5" :blur="0" v-if="data.movie.cloud === 'aws'" />
                            </div>
                        </div>

                        <div class="col-12 col-md-9 col-xl-8 mt-3 content-sm-down">

                            <div class="__title">
                                <div class="col-12 p-0">
                                    <h5>
                                        <strong>{{data.movie.name}}</strong>
                                        <strong class="age-rating">{{data.movie.age}}</strong>
                                    </h5>
                                    <div class="p-0 mr-0 mt-3 mb-3 hidden-sm-down __btn-control">
                                        <router-link :to="{name: 'movie-player', params: {id: data.movie.id}}" class="btn btn-md-up btn-waring btn-play" role="button">

                                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 191.255 191.255"
                                                        style="enable-background:new 0 0 191.255 191.255;" xml:space="preserve"
                                                        width="100%" class="show-play-svg">
                                                        <g>
                                                            <path d="M162.929,66.612c-2.814-1.754-6.514-0.896-8.267,1.917s-0.895,6.513,1.917,8.266c6.544,4.081,10.45,11.121,10.45,18.833  s-3.906,14.752-10.45,18.833l-98.417,61.365c-6.943,4.329-15.359,4.542-22.512,0.573c-7.154-3.97-11.425-11.225-11.425-19.406  V34.262c0-8.181,4.271-15.436,11.425-19.406c7.153-3.969,15.569-3.756,22.512,0.573l57.292,35.723  c2.813,1.752,6.513,0.895,8.267-1.917c1.753-2.812,0.895-6.513-1.917-8.266L64.512,5.247c-10.696-6.669-23.661-7-34.685-0.883  C18.806,10.48,12.226,21.657,12.226,34.262v122.73c0,12.605,6.58,23.782,17.602,29.898c5.25,2.913,10.939,4.364,16.616,4.364  c6.241,0,12.467-1.754,18.068-5.247l98.417-61.365c10.082-6.287,16.101-17.133,16.101-29.015S173.011,72.899,162.929,66.612z"
                                                                data-original="#000000" class="active-path" data-old_color="#ffffff"
                                                                fill="#000" />
                                                        </g>
                                                    </svg>
                                            Watch Now
                                        </router-link>
                                        <button class="btn btn-md-up btn-warning btn-trailer ml-2"
                                            @click="showplyrmodal = true" v-if="data.movie.trailer !== null">

                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 191.255 191.255"
                                                        style="enable-background:new 0 0 191.255 191.255;" xml:space="preserve"
                                                        width="100%" class="show-play-svg">
                                                        <g>
                                                            <path d="M162.929,66.612c-2.814-1.754-6.514-0.896-8.267,1.917s-0.895,6.513,1.917,8.266c6.544,4.081,10.45,11.121,10.45,18.833  s-3.906,14.752-10.45,18.833l-98.417,61.365c-6.943,4.329-15.359,4.542-22.512,0.573c-7.154-3.97-11.425-11.225-11.425-19.406  V34.262c0-8.181,4.271-15.436,11.425-19.406c7.153-3.969,15.569-3.756,22.512,0.573l57.292,35.723  c2.813,1.752,6.513,0.895,8.267-1.917c1.753-2.812,0.895-6.513-1.917-8.266L64.512,5.247c-10.696-6.669-23.661-7-34.685-0.883  C18.806,10.48,12.226,21.657,12.226,34.262v122.73c0,12.605,6.58,23.782,17.602,29.898c5.25,2.913,10.939,4.364,16.616,4.364  c6.241,0,12.467-1.754,18.068-5.247l98.417-61.365c10.082-6.287,16.101-17.133,16.101-29.015S173.011,72.899,162.929,66.612z"
                                                                data-original="#000000" class="active-path" data-old_color="#ffffff"
                                                                fill="#000" />
                                                        </g>
                                                    </svg>
                                             Watch Trailer
                                             
                                    </button>

                                        <div class="d-inline add ml-2" v-if="! data.movie.is_favorite && data.movie.cloud == 'local'" @click.prevent="SHOW_COLLECTION_MODAL(data.movie.id, site_link + '/storage/backdrops/600_' + data.movie.backdrop, data.movie.name, 'movie')">

                                            <img src="../../../assets/default/img/infavor.svg" alt="favor" width="40px">
                                             </div>

                                            <div class="d-inline add ml-2" v-if="! data.movie.is_favorite && data.movie.cloud == 'aws'" @click.prevent="SHOW_COLLECTION_MODAL(data.movie.id, md_backdrop + data.movie.backdrop, data.movie.name, 'movie')">

                                                <img src="../../../assets/default/img/infavor.svg" alt="favor" width="40px">
                                              </div>

                                                <div class="d-inline remove" v-if="data.movie.is_favorite" @click.prevent="DELETE_FROM_COLLECTION(data.movie.id, 'movie')">

                                                    <img src="../../../assets/default/img/favor.svg" alt="favor" width="40px" @click.prevent="DELETE_FROM_COLLECTION(item.id, 'movie', index)" >

                                                    </div>

                                                </div>
                                                <div class="year-genre mb-2">

                                                    <p class="genre">{{data.movie.genre}}</p>
                                                    <span class="dot">|</span>
                                                    <p class="year">{{data.movie.year}}</p>
                                                    <span class="dot">|</span>
                                                    <p class="time">{{data.movie.runtime}}</p>
                                                </div>

                                                <!-- END Name -->
                                                <p>{{data.movie.overview}}</p>
                                                <!-- END Overview -->
                                            </div>
                                        </div>

                                        <div class="col-12 p-0 mt-5 hidden-md-up __btn-control">
                                            <div class="btn-group">
                                                <router-link :to="{name: 'movie-player', params: {id: data.movie.id}}" class="btn btn-md-up btn-warning btn-play" role="button">
                                                    Watch Now
                                                </router-link>

                                                <button class="btn btn-warning btn-trailer ml-4" @click="showplyrmodal = true" v-if="data.movie.trailer !== null">
                                                    Watch Trailer
                                                </button>

                                            </div>
                                        </div>

                                        <div class="col-12 p-0 mt-5">
                                            <div class="row">

                                                <div class="col-12 col-md-8 p-1" v-if="data.casts !== null">
                                                    <div class="__cast">
                                                        <h3>
                                                            <strong>{{$t('show.cast')}}</strong>
                                                        </h3>
                                                        <div class="block ml-sm-2 m-1" v-for="(item, index) in data.casts" :key="index">
                                                            <router-link :to="{name: 'cast', params: {id: item.id}}">
                                                                <button class="btn btn-md btn-outline-secondary">{{item.name}}</button>
                                                            </router-link>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-5 col-md-3 col-xl-2 offset-xl-2 mt-3 poster-sm-down hidden-sm-down">
                                        <div class="poster">
                                            <progressive-img :src="site_link + '/storage/posters/600_' + data.movie.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="data.movie.name" width="100%" :aspect-ratio="1.5" :blur="0" v-if="data.movie.cloud === 'local'" />
                                            <progressive-img :src="md_poster + data.movie.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="data.movie.name" width="100%" :aspect-ratio="1.5" :blur="0" v-if="data.movie.cloud === 'aws'" />
                                        </div>
                                    </div>

                                    <div class="col-12 hidden-sm-down mt-5" v-if="data.similar != null">
                                        <div class="similar">
                                            <h3>
                                                <strong>{{$t('show.recommendation_movie')}}</strong>
                                            </h3>

                                            <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true" :paginationEnabled="false" :autoplay="false" easing="linear" :scrollPerPage="true" :perPageCustom="[[220,1], [520,3],[768, 4], [1024, 6], [1920, 9]]">

                                                <slide class="col-6 col-md-3 col-lg-2 col-xl-2 col-xxl-1-2 m-2 animation" v-for="(item, index) in data.similar" :key="index">
                                                    <div class="poster" @click="SIMILAR_SHOW(item.id)">

                                                        <div class="poster__backdrop-image">

                                                            <progressive-img :src="site_link + '/storage/posters/600_' + item.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :aspect-ratio="1.5" :blur="0" v-if="item.cloud === 'local' " />

                                                            <progressive-img :src=" md_poster + item.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :aspect-ratio="1.5" :blur="0" v-if="item.cloud === 'aws' " />

                                                        </div>

                                                        <div class="__title mt-2">
                                                            <b> {{item.name}} </b> <br>
                                                                    </div>

                                                        </div>
                                                </slide>

                                            </carousel>

                                        </div>
                                    </div>

                                </div>
                            </div>

                            <!-- END Overview -->

                            <div class="col-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3 trailer" :class="{ show: showplyrmodal}">
                                <div class="exit">
                                    <img data-v-b12df990="" src="../../../assets/default/img/exit-icon.svg" alt="exit icon" width="100%" @click="showplyrmodal = false">
                               </div>
                                    <div id="embed-trailer"></div>
                                </div>

                                <!-- END Trailer Modal -->

                            </div>

                        </div>

                    </div>
</template>

<script>
import {
    mapState
} from "vuex";
import collection from "../collection/new.vue";
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
        "collection-modal": collection,
        "exit-button": exitButton,
        Carousel,
        Slide,
    },

    computed: mapState({
        data: state => state.movies.show,
        loading: state => state.movies.loading,
        showSearchPageEvent: state => state.event.show_search_page
    }),

    beforeDestroy() {
        this.$store.commit("CLEAR_MOVIE_SHOW_DATA");
    },

    mounted() {
        if (this.$auth.isAuthenticated()) {
            this.$store.dispatch("GET_MOVIE_DETAILS", this.$route.params.id);
        } else {
            this.$store.dispatch("GET_GHOST_MOVIE_DETAILS", this.$route.params.id);
        }
    },

    watch: {
        data() {

            // Runtime format
            if (this.data.movie.runtime <= 60) {
                this.data.movie.runtime = this.data.movie.runtime + "m";
            } else if (this.data.movie.runtime >= 60) {
                const minutes = this.data.movie.runtime % 60;
                const hours = Math.floor(this.data.movie.runtime / 60);
                this.data.movie.runtime = hours + "h " + minutes + "m";
            }

            // Replice special characters
            this.data.movie.genre = this.data.movie.genre.replace(/-/g, ", ");

            // Set title
            document.title = this.data.movie.name;

        },
        showplyrmodal() {
            // Run plyr to show trailer
            setTimeout(() => {
                var playerInstance = jwplayer("embed-trailer");
                playerInstance.setup({
                    file: this.data.movie.trailer
                });
            }, 100);
        },
        showSearchPageEvent() {
            if (!this.showSearchPageEvent) {
                this.$store.commit("SHOW_SEARCH_PAGE");
            }
        }
    },

    methods: {
        SIMILAR_SHOW(id) {
            if (this.$auth.isAuthenticated()) {
                this.$store.dispatch("GET_MOVIE_DETAILS", id);
            } else {
                this.$store.dispatch("GET_GHOST_MOVIE_DETAILS", id);
            }

        },

        // Show modal of collection
        SHOW_COLLECTION_MODAL(id, poster, name, type) {
            if (this.$auth.isAuthenticated()) {
                this.collection.id = id;
                this.collection.poster = poster;
                this.collection.name = name;
                this.collection.type = type;
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        },

        // Hide modal of collection
        HIDE_COLLECTION_MODAL_CANCEL() {
            if (this.$auth.isAuthenticated()) {
                this.collection.id = null;
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        },

        // Hide modal and update array
        HIDE_COLLECTION_MODAL_SAVE() {
            if (this.$auth.isAuthenticated()) {
                this.collection.id = null;
                this.data.movie.is_favorite = true;
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        },

        // Delete mvoie or series from data array
        DELETE_FROM_COLLECTION(id, type, index) {
            if (this.$auth.isAuthenticated()) {
                this.data.movie.is_favorite = false;

                this.$store.dispatch("DELETE_FROM_COLLECTION", {
                    id,
                    type
                });
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        },

        // Add new like or delete it
        // Params type1 detected if add or delete
        ADD_NEW_LIKE(id, type, type1) {
            if (this.$auth.isAuthenticated()) {
                if (type1 === "add") {
                    // Add true to data array
                    this.data.movie.is_like = true;
                    this.$store.dispatch("ADD_LIKE", {
                        id,
                        type
                    });
                } else {
                    // Add false to data array
                    this.data.movie.is_like = false;

                    this.$store.dispatch("ADD_LIKE", {
                        id,
                        type
                    });
                }
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        }
    }
};
</script>
