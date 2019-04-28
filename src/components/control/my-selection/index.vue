<template>
    <div class="c-app-my-selection">
        <div class="c-app-my-selection__content" v-if="! MY_SELECTION_LOADING_PAGE">
            <div class="c-app-my-selection__slider">
                <ul class="c-my-selection-list" ref="c_app_my_selection_slider">
                    <li class="c-my-selection-item" v-for="(item, index) in LIST_MY_SELECTION.ListMySelection['movies']">
                        <div class="c-my-selection-item__content">
                            <div class="c-my-selection-item__header">
                                <a href="">
                                    <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                         v-if="item.cloud === 'local'"
                                         alt="" width="100%">
                                    <img :src="lg_backdrop + item.backdrop"
                                         v-if="item.cloud === 'aws'"
                                         alt="" width="100%">


                                    <div class="c-add-my-selection__selected"
                                         @click.prevent="ADD_TO_COLLECTION(item.id, LIST_MY_SELECTION.ChannelName, 'movie', index, 0)">
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
                                </a>
                            </div>

                            <div class="c-my-selection-item__playlist">
                                <div class="playlist">
                                    <ul class="playlist__list">
                                        <li class="playlist__item">
                                            <router-link :to="{name: 'Movie-Player', params:{id: item.id}}">
                                                <div class="playlist__thumb">
                                                    <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                                         v-if="item.cloud === 'local'"
                                                         alt="" width="100%">
                                                    <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                                         v-if="item.cloud === 'aws'"
                                                         alt="" width="100%">
                                                    <div class="playlist-overlay">
                                                        <svg viewBox="0 0 100 100" width="40" height="40" class="tile-catchup__picto tile-catchup__picto--xs"><path d="M41,29 L68,50 L41,70" fill="white"></path><circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="5"></circle></svg>
                                                    </div>
                                                </div>
                                                <p class="playlist__title">{{item.name}}</p>
                                                <p class="playlist__description">{{item.overview}}</p>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li class="c-my-selection-item" v-for="(item, index) in LIST_MY_SELECTION.ListMySelection['series']">
                        <div class="c-my-selection-item__content">
                            <div class="c-my-selection-item__header">
                                <a href="">
                                    <img :src="site_link + '/storage/backdrops/original_' + item.series.backdrop"
                                         v-if="item.series.cloud === 'local'"
                                         alt="" width="100%">
                                    <img :src="lg_backdrop + item.series.backdrop"
                                         v-if="item.series.cloud === 'aws'"
                                         alt="" width="100%">


                                    <div v-if="LIST_MY_SELECTION.Preview">

                                    <div class="preview-overlay">
                                        <p>Discover {{item.series.name}}</p>
                                    </div>

                                    <div class="c-add-my-selection__add" v-if="!item.series.is_favorite"
                                         @click.prevent="ADD_TO_COLLECTION(item.series.id, LIST_MY_SELECTION.ChannelName, 'series', index, 1)">
                                        <div class="select-icon">
                                            <svg width="20" viewBox="0 0 448 448"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="c-add-my-selection__selected" v-else
                                         @click.prevent="ADD_TO_COLLECTION(item.series.id, LIST_MY_SELECTION.ChannelName, 'series', index, 1)">
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

                                    <div v-else>

                                        <div class="c-add-my-selection__selected"
                                             @click.prevent="ADD_TO_COLLECTION(item.series.id, LIST_MY_SELECTION.ChannelName, 'series', index, 1)">
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

                                </a>
                            </div>

                            <div class="c-my-selection-item__playlist" v-if="item.episodes !== null">
                                <div class="playlist">
                                    <ul class="playlist__list">
                                        <li class="playlist__item"  v-for="(itemEpisode, indexEpisode) in item.episodes"  v-if="item.episodes !== undefined">
                                            <router-link :to="{name: 'TV-Show-Player', params:{series_id: item.series.id, episode_id: itemEpisode.id}}">
                                                <div class="playlist__thumb">
                                                    <img :src="site_link + itemEpisode.backdrop"
                                                         v-if="itemEpisode.cloud === 'Local'"
                                                         alt="" width="100%">
                                                    <img :src="lg_backdrop + itemEpisode.backdrop"
                                                         v-if="itemEpisode.cloud === 'S3'"
                                                         alt="" width="100%">
                                                    <div class="playlist-overlay">
                                                        <svg viewBox="0 0 100 100" width="40" height="40" class="tile-catchup__picto tile-catchup__picto--xs"><path d="M41,29 L68,50 L41,70" fill="white"></path><circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="5"></circle></svg>
                                                    </div>
                                                </div>
                                                <p class="playlist__title">Season {{item.season}} Episode {{itemEpisode.episode_number}}</p>
                                                <p class="playlist__description">{{itemEpisode.overview}}</p>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>


            <div class="c-app-my-selection__slider-arrow">
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
    import loader from "../utils/loader"

    export default {
        components: {
            loader
        },
        data() {
            return {
                HideLeft: 0,
                HideRight: 1
            }
        },


        mounted() {
            this.$store.dispatch('GET_HOME_LIST', this.$route.params.ChannelName);
            this.$store.dispatch("LIST_MY_SELECTION", this.$route.params.ChannelName);
            this.$store.commit('CHANNEL_SLIDER_ANIMATION', false)

        },

        computed: mapState({
            LIST_MY_SELECTION: state => state.my_selection.LIST_MY_SELECTION,
            MY_SELECTION_LOADING_PAGE: state => state.my_selection.MY_SELECTION_LOADING_PAGE
        }),

        watch: {

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
                const content = this.$refs.c_app_my_selection_slider;
                this.scrollTo(content, -window.innerWidth, 500);

                const container = document.querySelector('.c-my-selection-list');
                if (container.scrollLeft === 0 || container.scrollLeft <= window.innerWidth) {
                    this.HideLeft = false;
                    this.$store.commit('HIDE_SIDEBAR', true);
                }
            },

            swipeRight() {
                const content = this.$refs.c_app_my_selection_slider;
                this.scrollTo(content, window.innerWidth, 800);

                const container = document.querySelector('.c-my-selection-list');
                if (container.scrollLeft >= 0) {
                    this.HideLeft = true;
                    this.$store.commit('HIDE_SIDEBAR', false);
                }

            },



            ADD_TO_COLLECTION(ID, ChannelName, Type, Index, ParentIndex) {
                if(Type === 'series') {
                    if(this.LIST_MY_SELECTION.Preview) {

                        if (this.LIST_MY_SELECTION.ListMySelection['series'][0].series.is_favorite === 1)
                            this.LIST_MY_SELECTION.ListMySelection['series'][0].series.is_favorite = 0
                        else
                            this.LIST_MY_SELECTION.ListMySelection['series'][0].series.is_favorite = 1;


                    }else{
                        console.log(this.LIST_MY_SELECTION.ListMySelection['series'][Index])
                        this.LIST_MY_SELECTION.ListMySelection['series'].splice(Index, 1)
                    }
                }else {
                    this.LIST_MY_SELECTION.ListMySelection['movies'].splice(Index, 1)
                }

                this.$store.dispatch('ADD_NEW_TO_COLLECTION', {
                    ID: ID,
                    ChannelName: ChannelName,
                    Type: Type
                });
            },

        }
    }
</script>
