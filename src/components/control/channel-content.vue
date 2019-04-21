<template>
    <transition
            name="slideInUp">
        <div class="c-app-channel-grid-content" v-show="SHOW_ANIMATION"
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

                                            <div class="c-add-my-selection" v-if="IS_AUTHENTICATED">

                                                <div class="c-add-my-selection__add" v-if="!item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'movie', index, 0)">
                                                    <div class="select-icon">
                                                        <svg width="20" viewBox="0 0 448 448"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="c-add-my-selection__selected" v-if="item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'movie', index, 0)">
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

                                    <router-link :to="{name: 'show-series', params:{id: item.id}}"
                                                 v-if="ListCategoryContentFilter.CategoryKind === 'series'">
                                        <div class="c-thumb-image">
                                            <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                                 v-if="item.cloud === 'local'"
                                                 alt="" width="100%">
                                            <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                                 v-if="item.cloud === 'aws'"
                                                 alt="" width="100%">

                                            <div class="c-add-my-selection" v-if="IS_AUTHENTICATED">

                                                <div class="c-add-my-selection__add" v-if="!item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'series', index, 0)">
                                                    <div class="select-icon">
                                                        <svg width="20" viewBox="0 0 448 448"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="c-add-my-selection__selected" v-else
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'series', index, 0)">
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

                                            <div class="c-add-my-selection" v-if="IS_AUTHENTICATED">

                                                <div class="c-add-my-selection__add" v-if="!item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'movie', index, 1)">
                                                    <div class="select-icon">
                                                        <svg width="20" viewBox="0 0 448 448"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="c-add-my-selection__selected" v-if="item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'movie', index, 1)">
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

                                    <router-link :to="{name: 'show-series', params:{id: item.id}}"
                                                 v-if="ListCategoryContentFilter.CategoryKind === 'series'">
                                        <div class="c-thumb-image">
                                            <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                                 v-if="item.cloud === 'local'"
                                                 alt="" width="100%">
                                            <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                                 v-if="item.cloud === 'aws'"
                                                 alt="" width="100%">

                                            <div class="c-add-my-selection" v-if="IS_AUTHENTICATED">

                                                <div class="c-add-my-selection__add" v-if="!item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'series', index, 1)">
                                                    <div class="select-icon">
                                                        <svg width="20" viewBox="0 0 448 448"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="c-add-my-selection__selected" v-else
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'series', index, 1)">
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

                                            <div class="c-add-my-selection" v-if="IS_AUTHENTICATED">

                                                <div class="c-add-my-selection__add" v-if="!item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'movie', index, indexParent)">
                                                    <div class="select-icon">
                                                        <svg width="20" viewBox="0 0 448 448"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="c-add-my-selection__selected" v-if="item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'movie', index, indexParent)">
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

                                    <router-link :to="{name: 'show-series', params:{id: item.id}}"
                                                 v-if="ListCategoryContentFilter.CategoryKind === 'series'">
                                        <div class="c-thumb-image">
                                            <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                                 v-if="item.cloud === 'local'"
                                                 alt="" width="100%">
                                            <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                                 v-if="item.cloud === 'aws'"
                                                 alt="" width="100%">

                                            <div class="c-add-my-selection" v-if="IS_AUTHENTICATED">

                                                <div class="c-add-my-selection__add" v-if="!item.is_favorite"
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'series', index, 0)">
                                                    <div class="select-icon">
                                                        <svg width="20" viewBox="0 0 448 448"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                                        </svg>
                                                    </div>
                                                </div>

                                                <div class="c-add-my-selection__selected" v-else
                                                     @click.prevent="ADD_TO_COLLECTION(item.id, ListCategoryContentFilter.ChannelName, 'series', index, 0)">
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

    </transition>
</template>

<script>
    import {
        mapState
    } from "vuex";

    export default {

        data() {
            return {
                HideLeft: 0,
                HideRight: 1,
                SHOW_ANIMATION: false
            }
        },

        computed: mapState({
            ListCategoryContentFilter: state => state.category_content.ListCategoryContentFilter,
            ListCategoryContent: state => state.category_content.ListCategoryContent,
            ListCategoryContentLoading: state => state.category_content.ListCategoryContentLoading,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED
        }),

        mounted() {
            this.LIST_CATEGORY_CONTENT();

            let GetChannel;
            if (this.$route.name === 'discover') {
                GetChannel = 'rti1'
            } else {
                GetChannel = this.$route.params.ChannelName;
            }
            this.$store.dispatch('GET_HOME_LIST', GetChannel);

            this.$store.commit('CHANNEL_SLIDER_ANIMATION', false)
        },

        created() {
            setTimeout(() => {
                this.SHOW_ANIMATION = true;
            }, 50)
        },

        watch: {
            '$route.params.CategoryName': function () {
                this.LIST_CATEGORY_CONTENT()
                this.HideLeft = 0;
                this.HideRight = 1;
                this.$store.commit('HIDE_SIDEBAR', true);
            },
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

                const container = document.querySelector('.c-app-channel-grid-content');
                console.log(container.scrollLeft + '-' + window.innerWidth)
                if (container.scrollLeft === 0 || container.scrollLeft <= window.innerWidth) {
                    this.HideLeft = false;
                    this.$store.commit('HIDE_SIDEBAR', true);
                }
            },

            swipeRight() {
                const content = this.$refs.c_category_carousel;
                this.scrollTo(content, window.innerWidth, 800);

                const container = document.querySelector('.c-app-channel-grid-content');
                if (container.scrollLeft >= 0) {
                    this.HideLeft = true;
                    this.$store.commit('HIDE_SIDEBAR', false);
                }

            },


            ADD_TO_COLLECTION(ID, ChannelName, Type, Index, ParentIndex) {
                if (this.ListCategoryContent[ParentIndex][Index].is_favorite === 1)
                    this.ListCategoryContent[ParentIndex][Index].is_favorite = 0
                else
                    this.ListCategoryContent[ParentIndex][Index].is_favorite = 1;

                this.$store.dispatch('ADD_NEW_TO_COLLECTION', {
                    ID: ID,
                    ChannelName: ChannelName,
                    Type: Type
                });
            },

            LIST_CATEGORY_CONTENT() {
                if (this.IS_AUTHENTICATED) {
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
            },

        }
    }
</script>
