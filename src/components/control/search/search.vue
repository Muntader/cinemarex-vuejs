<template>

    <div class="c-app-search">
        <div class="c-app-search__search-input">
            <div class="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 56.966 56.966"
                            style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve" width="100%" class="sm-search-svg">
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                                fill="#ffffff" />
                        </svg>
            </div>
            <input class="form-control mr-sm-2" type="text" :placeholder="$t('home.search')" v-model="search_query">
        </div>

        <div class="c-app-search__search-result" v-for="(itemParent, indexParent) in LIST_SEARCH.ListSearch">
            <div class="c-app-search__search-result--title">
                <h3> {{LIST_SEARCH.ListSearch[indexParent].list.length}} Videos {{itemParent.category}}</h3>
            </div>
            <div class="c-app-search__search-result--slider">

                <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true"
                          :paginationEnabled="false" :autoplay="false" easing="linear" :scrollPerPage="true"
                          :perPageCustom="[[220,1], [520,3],[768, 4], [1024, 6], [1920, 7]]">

                    <slide class="item" v-for="(item, index) in LIST_SEARCH.ListSearch[indexParent].list" :key="index">
                        <router-link :to="{name: 'show-movie', params:{id: item.id}}" v-if="item.type === 'movie'">

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

                        <router-link :to="{name: 'show-series', params:{id: item.id}}" v-if="item.type === 'series'">

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

</template>

<script>
    import {
        mapState
    } from "vuex";
    import {
        Carousel,
        Slide
    } from "vue-carousel";
    import notfound from "../utils/notfound"

    export default {
        name: 'search',
        data() {
            return {
                search_query: ''
            }
        },

        components: {
            Carousel,
            Slide,
        },

        computed: mapState({
            LIST_SEARCH: state => state.search.LIST_SEARCH,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED

        }),

        watch: {
            search_query(val) {
                if (val !== '') {
                    if (this.IS_AUTHENTICATED) {
                        this.$store.dispatch("GET_SEARCH_LIST", val);
                    } else {
                        this.$store.dispatch("GET_GHOST_SEARCH_LIST", val);
                    }
                }
            }
        },

        methods: {},
    };
</script>
