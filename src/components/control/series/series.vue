<template>
<div class="xjkax">
    <div class="col-12 p-0 series-page">

        <div class="loader" v-if="loading">
            <loader></loader>
        </div>

        <!-- END Loader -->

        <collection-modal @hideModalCollectionCancel="HIDE_COLLECTION_MODAL_CANCEL" @hideModalCollectionSave="HIDE_COLLECTION_MODAL_SAVE" :id="collection.id" :poster="collection.poster" :name="collection.name" :type="collection.type" :index="collection.index"></collection-modal>

        <!-- END Collection component -->

        <div class="top-item" v-if="data.top !== null">
            <carousel class="list-carousel" :navigationEnabled="false" :paginationEnabled="true" :autoplay="true" :autoplayTimeout="2000" easing="ease-in-out" :perPageCustom="[[220,1], [420,1],[768, 1], [1024, 1]]">

                <slide v-for="(item,index) in data.top" :key="index">

                    <div class="top-item__film-cover">
                        <div class="gradient"></div>
                        <div class="diagonal-gradient"></div>
                        <img :src="site_link + '/storage/backdrops/original_' + item.backdrop" :alt="item.name" width="100%" v-if="item.cloud == 'local' ">
                        <img :src=" lg_backdrop + item.backdrop" :alt="item.name" width="100%"  v-if="item.cloud == 'aws' ">
                        <router-link :to="{name: 'show-series', params:{id: item.id}}" class="hidden-sm-down">
                            <div class="top-item__film-ovarlay">

                                <div class="top-item__film-details">

                                    <div class="title">
                                        <h2>
                                            <strong>{{item.name}}</strong>
                                        </h2>
                                        <small>{{item.genre}}</small>
                                    </div>
                                    <div class="overview">
                                        <p>{{ item.overview | truncate(110, item.overview )}}</p>
                                    </div>

                                    <div class="control">

                                        <router-link role="button" class="btn-slide-top" :to="{name: 'series-player', params: {series_id: item.id}}">

                                            {{$t('home.watch_now')}}
                                        </router-link>

                                    </div>

                                </div>

                            </div>
                        </router-link>

                        <router-link :to="{name: 'show-series', params:{id: item.id}}" class="hidden-md-up">
                            <div class="top-item__film-ovarlay">

                                <div class="top-item__film-details">
                                    <div class="title text-center">
                                        <h5 style="font-weight: bolder; text-transform: uppercase;letter-spacing: 4px;">
                                            <strong>{{item.name}}</strong>
                                        </h5>
                                        <small>{{item.genre}}</small>
                                    </div>
                                </div>

                            </div>
                        </router-link>

                    </div>

                    <!-- END Top Movie -->

                </slide>
            </carousel>

        </div>

        <!-- END TOP -->

        <div class="col-12" v-if="data.series != null">
            <div class="row" style="margin: -30px; overflow: hidden;">
                <div class="col-12 p-0 p-md-3">

                    <div class="carousel mt-1 m-3 mb-5 mb-5" v-if=" data.recommendation !== null && $auth.isAuthenticated()">
                        <div class="genre ml-2">
                            <h3>
                                <strong>{{$t('home.recommendation_series')}}</strong>
                            </h3>
                        </div>

                        <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true" :paginationEnabled="false" :autoplay="false" easing="linear" :scrollPerPage="true" :perPageCustom="[[220,1], [520,2],[768, 3], [1024, 5], [1300, 7]]">

                            <slide class="col-6 col-md-4 col-lg-2 col-xxl-1-5 m-2 animation" v-for="(item, index) in data.recommendation" :key="index">

                                <div class="poster" @mouseover="ACTIVE_SLELECTED_RECENLTY_SERIES(item.id)">

                                    <router-link :to="{name: 'show-series', params: {id: item.id}}">

                                        <div class="poster__backdrop-image">

                                            <progressive-img :src="site_link + '/storage/posters/600_' + item.poster" placeholder="../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :blur="0" v-if="item.cloud === 'local' " />

                                            <progressive-img :src=" md_poster + item.poster" placeholder="../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :aspect-ratio="1.5" :blur="0" v-if="item.cloud === 'aws' " />

                                            <div class="poster__backdrop_overlay-info" v-if="active_series === item.id">

                                                <div class="body text-center">

                                                    <div class="play">

                                                        <div v-if="item.already_episode !== 0 && item.already_episode !== null">

                                                            <router-link :to="{name: 'series-player', params: {series_id: item.id}}">

                                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                                                                viewBox="0 0 294.843 294.843" style="enable-background:new 0 0 294.843 294.843;"
                                                                                xml:space="preserve" width="100%" class="play-svg">
                                                                                <g>
                                                                                    <g>
                                                                                        <path d="M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392   c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421   S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421   s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z"
                                                                                            data-original="#000000" class="active-path"
                                                                                            data-old_color="#ffffff" fill="#ffffff"
                                                                                        />
                                                                                        <path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883   l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333   c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029   C113.877,77.926,111.575,77.902,109.699,78.969z"
                                                                                            data-original="#000000" class="active-path"
                                                                                            data-old_color="#ffffff" fill="#ffffff"
                                                                                        />
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                            </router-link>

                                                        </div>

                                                        <div v-else>
                                                            <h5>
                                                                <strong>{{$t('show.soon')}}</strong>
                                                            </h5>
                                                        </div>

                                                    </div>
                                                </div>

                                                <!-- END Ovarlay -->

                                            </div>

                                        </div>

                                    </router-link>

                                    <div class="__title mt-2">
                                        <b> {{item.name}} </b> <br>
                                        <small class="text-muted">{{item.genre}}</small>
                                    </div>
                                </div>
                            </slide>
                        </carousel>
                    </div>

                    <div class="carousel mt-1 m-3 mb-5 mb-5" v-if=" data.popular_series !== null && !$auth.isAuthenticated()">
                        <div class="genre ml-2">
                            <h3>
                                <strong>{{$t('home.popular_series')}}</strong>
                            </h3>
                        </div>

                        <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true" :paginationEnabled="false" :autoplay="false" easing="linear" :scrollPerPage="true" :perPageCustom="[[220,1], [520,2],[768, 3], [1024, 5], [1300, 7]]">

                            <slide class="col-6 col-md-4 col-lg-2 col-xxl-1-5 m-2 animation" v-for="(item, index) in data.popular_series" :key="index">

                                <div class="poster" @mouseover="ACTIVE_SLELECTED_RECENLTY_SERIES(item.id)">

                                    <router-link :to="{name: 'show-series', params: {id: item.id}}">

                                        <div class="poster__backdrop-image">

                                            <progressive-img :src="site_link + '/storage/posters/600_' + item.poster" placeholder="../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :blur="0" v-if="item.cloud === 'local' " />

                                            <progressive-img :src=" md_poster + item.poster" placeholder="../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :aspect-ratio="1.5" :blur="0" v-if="item.cloud === 'aws' " />

                                            <div class="poster__backdrop_overlay-info" v-if="active_series === item.id">

                                                <div class="body text-center">

                                                    <div class="play">

                                                        <div v-if="item.already_episode !== 0 && item.already_episode !== null">

                                                            <router-link :to="{name: 'series-player', params: {series_id: item.id}}">

                                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                                                                viewBox="0 0 294.843 294.843" style="enable-background:new 0 0 294.843 294.843;"
                                                                                xml:space="preserve" width="100%" class="play-svg">
                                                                                <g>
                                                                                    <g>
                                                                                        <path d="M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392   c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421   S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421   s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z"
                                                                                            data-original="#000000" class="active-path"
                                                                                            data-old_color="#ffffff" fill="#ffffff"
                                                                                        />
                                                                                        <path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883   l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333   c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029   C113.877,77.926,111.575,77.902,109.699,78.969z"
                                                                                            data-original="#000000" class="active-path"
                                                                                            data-old_color="#ffffff" fill="#ffffff"
                                                                                        />
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                            </router-link>

                                                        </div>

                                                        <div v-else>
                                                            <h5>
                                                                <strong>{{$t('show.soon')}}</strong>
                                                            </h5>
                                                        </div>

                                                    </div>
                                                </div>

                                                <!-- END Ovarlay -->

                                            </div>

                                        </div>

                                    </router-link>

                                    <div class="__title mt-2">
                                        <b> {{item.name}} </b> <br>
                                        <small class="text-muted">{{item.genre}}</small>
                                    </div>
                                </div>
                            </slide>
                        </carousel>
                    </div>

                    <div class="carousel mt-1 m-3 mb-5 mb-5 latest-news" v-if=" data.latest_news !== null">
                        <div class="genre ml-2">
                            <h3>
                                <strong>{{$t('home.what_is_new')}}</strong>
                            </h3>
                        </div>

                        <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true" :paginationEnabled="false" :autoplay="false" easing="linear" :scrollPerPage="true" :perPageCustom="[[220,1], [520,2],[768, 3], [1024, 5], [1300, 7]]">

                            <slide class="col-6 col-md-4 col-lg-3 col-xl-1-5 col-xxl-1-8 p-1" :class="{overall: active_news == item.id}" v-for="(item, index) in data.latest_news" :key="index">
                                <router-link :to="{name: 'news-player', params: {id: item.id}}">
                                    <div class="episode">
                                        <div class="backdrop" @mouseover="active_news = item.id" :class="{active: active_news == item.id}">
                                            <progressive-img :src="site_link + item.image" placeholder="../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :blur="0" v-if="item.cloud === 'local' " />
                                            <progressive-img :src="cdn_link + item.image" placeholder="../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :blur="0" v-if="item.cloud === 'aws' " />
                                            <div class="play label circle-sm" v-show="active_news == item.id">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 58 58" style="enable-background:new 0 0 58 58;" xml:space="preserve" width="30px">
                                                        <circle style="fill: rgba(225, 225, 225, 0.32);" cx="29" cy="29" r="29"/>
                                                        <g>
                                                            <polygon style="fill:#FFFFFF;" points="44,29 22,44 22,29.273 22,14  "/>
                                                            <path style="fill:#FFFFFF;" d="M22,45c-0.16,0-0.321-0.038-0.467-0.116C21.205,44.711,21,44.371,21,44V14   c0-0.371,0.205-0.711,0.533-0.884c0.328-0.174,0.724-0.15,1.031,0.058l22,15C44.836,28.36,45,28.669,45,29s-0.164,0.64-0.437,0.826   l-22,15C22.394,44.941,22.197,45,22,45z M23,15.893v26.215L42.225,29L23,15.893z"/>
                                                        </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="details">
                                            <div class="se">
                                                <b><small class="text-muted">News</small></b> <br>
                                                <small>{{ item.description | truncate(110, item.description )}}</small>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </slide>
                        </carousel>
                    </div>

                    <div class="carousel mt-1 m-3 mb-5 mb-5" v-for="(item, rootindex) in data.series" :key="rootindex" v-if="item.list.length > 0 ">
                        <div class="genre ml-2">

                            <h3>
                                <strong>{{item.genre}}<hr></strong>
                                <small class="text-muted">{{$t('home.series')}}</small>
                            </h3>
                        </div>

                        <carousel class="list-carousel" navigationPrevLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-right-svg"><g><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' navigationNextLabel='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 129 129" enable-background="new 0 0 129 129" width="100%" class="arrow-left-svg"><g transform="matrix(-1 1.22465e-16 -1.22465e-16 -1 129 129)"><g>
                                                            <path d="m88.6,121.3c0.8,0.8 1.8,1.2 2.9,1.2s2.1-0.4 2.9-1.2c1.6-1.6 1.6-4.2 0-5.8l-51-51 51-51c1.6-1.6 1.6-4.2 0-5.8s-4.2-1.6-5.8,0l-54,53.9c-1.6,1.6-1.6,4.2 0,5.8l54,53.9z" data-original="#000000" class="active-path" data-old_color="#ffffff" fill="#ffffff"/>
                                                          </g></g> </svg>' :navigationEnabled="true" :paginationEnabled="false" :autoplay="false" easing="linear" :scrollPerPage="true" :perPageCustom="[[220,1], [520,2],[768, 3], [1024, 5], [1300, 7]]">

                            <slide class="col-6 col-md-4 col-lg-2 col-xxl-1-5 m-2 animation" v-for="(item, index) in data.series[rootindex].list" :key="index">

                                <div class="poster" @mouseover="ACTIVE_SLELECTED_SERIES(item.id, rootindex)">

                                    <router-link :to="{name: 'show-series', params: {id: item.id}}">

                                        <div class="poster__backdrop-image">

                                            <progressive-img :src="site_link + '/storage/posters/600_' + item.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :blur="0" v-if="item.cloud === 'local' " />

                                            <progressive-img :src="md_poster + item.poster" placeholder="../../../assets/default/img/loader-image.png" :alt="item.name" width="100%" :aspect-ratio="1.5" :blur="0" v-if="item.cloud === 'aws' " />

                                            <div class="poster__backdrop_overlay-info" v-if="active_series === item.id && root_index_active === rootindex">

                                                <div class="header pull-right">

                                                    <div class="mt-0">

                                                        <div class="poster__add-collection-icon text-right" v-if="! item.is_favorite">

                                                            <img src="../../../assets/default/img/infavor.svg" alt="favor" width="100%" @click.prevent="SHOW_COLLECTION_MODAL(item.id, site_link + '/storage/backdrops/600_' + item.backdrop, item.name, 'series', rootindex, index)"  v-if="item.cloud == 'local'">
                                                            <img src="../../../assets/default/img/infavor.svg" alt="favor" width="100%" @click.prevent="SHOW_COLLECTION_MODAL(item.id, md_backdrop + item.backdrop, item.name, 'series', rootindex, index)"  v-if="item.cloud == 'aws'">

                                                                </div>

                                                            <div class="poster__remove-collection-icon text-right" v-if="item.is_favorite">
                                                                <img src="../../../assets/default/img/favor.svg" alt="favor" width="100%" @click.prevent="DELETE_FROM_COLLECTION(item.id, 'series', rootindex, index)" >

                                                                </div>

                                                            </div>

                                                            <!-- END My List -->

                                                            <div class="mt-1">

                                                                <div class="poster__add-like-icon text-right" v-if="! item.is_like">
                                                                    <img src="../../../assets/default/img/dislike.svg" alt="dislike" width="100%" @click.prevent="ADD_NEW_LIKE(item.id, 'series', rootindex, index, 'add')">
                                                                </div>

                                                                    <div class="poster__remove-like-icon  text-right" v-if="item.is_like">
                                                                        <img src="../../../assets/default/img/like.svg" alt="like" width="100%" @click.prevent="ADD_NEW_LIKE(item.id, 'series', rootindex, index, 'delete')">
                                                                </div>

                                                                    </div>

                                                                </div>
                                                                <!-- END Header -->

                                                                <div class="body text-center">

                                                                    <div class="play">

                                                                        <div v-if="item.already_episode !== 0 && item.already_episode !== null">

                                                                            <router-link :to="{name: 'series-player', params: {series_id: item.id}}">

                                                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                                                                                viewBox="0 0 294.843 294.843" style="enable-background:new 0 0 294.843 294.843;"
                                                                                xml:space="preserve" width="100%" class="play-svg">
                                                                                <g>
                                                                                    <g>
                                                                                        <path d="M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392   c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421   S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421   s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z"
                                                                                            data-original="#000000" class="active-path"
                                                                                            data-old_color="#ffffff" fill="#ffffff"
                                                                                        />
                                                                                        <path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883   l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333   c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029   C113.877,77.926,111.575,77.902,109.699,78.969z"
                                                                                            data-original="#000000" class="active-path"
                                                                                            data-old_color="#ffffff" fill="#ffffff"
                                                                                        />
                                                                                    </g>
                                                                                </g>
                                                                            </svg>
                                                                            </router-link>

                                                                        </div>

                                                                        <div v-else>
                                                                            <h3>
                                                                                <strong>{{$t('show.soon')}}</strong>
                                                                            </h3>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                                <!-- END Ovarlay -->

                                                            </div>

                                                        </div>

                                    </router-link>

                                    <div class="__title mt-2">
                                        <b> {{item.name}} </b> <br>
                                        <small class="text-muted">{{item.genre}}</small>
                                    </div>

                                    <div class="progress" v-if="item.current_time !== null && $auth.isAuthenticated() === 'active' ">
                                        <div class="progress-bar" role="progressbar" :style="{width: (item.current_time/item.duration_time)*100 +'%'}" :aria-valuenow="(item.current_time/item.duration_time)*100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>

                                </div>
                            </slide>
                        </carousel>
                    </div>

                </div>
            </div>
        </div>

        <div v-if="!loading && data.series == null">
            <div class="mt-5 text-center notfound">

                <h4>
                    <notfound></notfound>

                    <strong>{{$t('home.sorry_no_result')}}</strong>

                </h4>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import collection from '../collection/new.vue';
import {
    Carousel,
    Slide
} from "vue-carousel";
import loader from "../utils/loader"
import notfound from "../utils/notfound"

export default {
    name: "series",
    components: {
        Carousel,
        Slide,
        loader,
        notfound,
        'collection-modal': collection
    },

    data() {
        return {
            active: null,
            active_series: null,
            show_item: null,
            root_index_show: null,
            activeGenre: "all",
            activeTrending: 1,
            trendingList: [{
                    value: 1,
                    translate: "home.trending"
                },
                {
                    value: 2,
                    translate: "home.year"
                },
                {
                    value: 3,
                    translate: "home.rating"
                },
                {
                    value: 4,
                    translate: "home.likes"
                }
            ],
            trendingActiveTranslate: "home.trending",
            genereList: [{
                    value: "all",
                    translate: "home.all"
                },
                {
                    value: "action",
                    translate: "home.action"
                },
                {
                    value: "adventure",
                    translate: "home.adventure"
                },
                {
                    value: "animation",
                    translate: "home.animation"
                },
                {
                    value: "biography",
                    translate: "home.biography"
                },
                {
                    value: "comedy",
                    translate: "home.comedy"
                },
                {
                    value: "documentary",
                    translate: "home.documentary"
                },
                {
                    value: "drama",
                    translate: "home.drama"
                },
                {
                    value: "family",
                    translate: "home.family"
                },
                {
                    value: "fantasy",
                    translate: "home.fantasy"
                },
                {
                    value: "history",
                    translate: "home.history"
                },
                {
                    value: "horror",
                    translate: "home.horror"
                },
                {
                    value: "music",
                    translate: "home.music"
                },
                {
                    value: "mystery",
                    translate: "home.mystery"
                },
                {
                    value: "romance",
                    translate: "home.romance"
                },
                {
                    value: "sci-fi",
                    translate: "home.sci_fi"
                },
                {
                    value: "sport",
                    translate: "home.sport"
                },
                {
                    value: "thriller",
                    translate: "home.thriller"
                },
                {
                    value: "war",
                    translate: "home.war"
                }
            ],
            genreActiveTranslate: "home.genre",
            recenlty_active: null,
            root_index_active: null,
            collection: {
                id: null,
                poster: null,
                name: null,
                type: null,
                rootindex: null,
                index: null
            },
            showSlideUpAnimation: false,
            active_news: null
        };
    },

    computed: mapState({
        data: state => state.series.data,
        sort: state => state.event.sort,
        loading: state => state.series.series_loading
    }),

    watch: {
        sort() {
            this.$store.dispatch("GET_SERIES_SORT_BY_LIST", {
                trending: this.sort.trending,
                genre: this.sort.genre
            })
        },
        activeGenre() {
            if (this.$auth.isAuthenticated()) {

                this.$store.commit("SET_SORT_BY", {
                    trending: this.activeTrending,
                    genre: this.activeGenre
                });
            } else {
                this.$store.commit("SET_GHOST_SORT_BY", {
                    trending: this.activeTrending,
                    genre: this.activeGenre
                });
            }
        },
        activeTrending() {
            if (this.$auth.isAuthenticated()) {

                this.$store.commit("SET_SORT_BY", {
                    trending: this.activeTrending,
                    genre: this.activeGenre
                });
            } else {
                this.$store.commit("SET_GHOST_SORT_BY", {
                    trending: this.activeTrending,
                    genre: this.activeGenre
                });
            }
        },

    },

    mounted() {
        if (this.data.length == 0 || this.data === null) {
            if (this.$auth.isAuthenticated()) {
                this.$store.dispatch("GET_SERIES_LIST");
            } else {
                this.$store.dispatch("GET_GHOST_SERIES_LIST");

            }
        }
        setTimeout(() => {
            this.showSlideUpAnimation = true;
        }, 100);
    },

    methods: {
        // Show modal of collection
        SHOW_COLLECTION_MODAL(id, backdrop, name, type, rootindex, index) {
            if (this.$auth.isAuthenticated()) {
                this.collection.id = id;
                this.collection.poster = backdrop;
                this.collection.name = name;
                this.collection.type = type;
                this.collection.rootindex = rootindex;
                this.collection.index = index;
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
                if (this.collection.rootindex !== null) {
                    // For list
                    this.data.series[this.collection.rootindex].list[
                        this.collection.index
                    ].is_favorite = true;
                } else {
                    // For top
                    this.data.top[this.collection.index].is_favorite = true;
                }
            } else {
                this.$router.push({
                    name: 'login'
                })
            }
        },

        // Delete mvoie or series from data array
        DELETE_FROM_COLLECTION(id, type, rootindex, index) {
            if (this.$auth.isAuthenticated()) {
                if (rootindex !== null) {
                    // For list
                    this.data.series[rootindex].list[index].is_favorite = false;
                } else {
                    // For top
                    this.data.top[index].is_favorite = false;
                }
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
        ADD_NEW_LIKE(id, type, rootindex, index, type1) {
            if (this.$auth.isAuthenticated()) {
                if (type1 === "add") {
                    // Add true to data array
                    this.data.series[rootindex].list[index].is_like = true;
                    this.$store.dispatch("ADD_LIKE", {
                        id,
                        type
                    });
                } else {
                    // Add false to data array
                    this.data.series[rootindex].list[index].is_like = false;

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
        },

        ACTIVE_SLELECTED_SERIES(id, rootindex) {
            this.root_index_active = rootindex;
            this.active_movie = null;
            this.active_series = id;
        },

        ACTIVE_SLELECTED_MOVIE(id, rootindex) {
            this.root_index_active = rootindex;
            this.active_series = null;
            this.active_movie = id;
        },

        ACTIVE_SLELECTED_RECENLTY_SERIES(id) {
            this.active_movie = null;
            this.active_series = id;
        },

    },

    filters: {
        // Cut word
        truncate(string, value) {
            return string.substring(0, value) + "...";
        }
    }
};
</script>
