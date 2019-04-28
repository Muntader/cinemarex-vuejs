<template>
    <div class="c-app-mobile-sidebar d-block d-md-none">
        <div class="c-app-mobile-sidebar__out-menu" @click="HIDE_MOBILE_SIDEBAR()">
            <div class="icon">
                <svg class="modal__close" viewBox="0 0 40 40">
                    <path fill="none" stroke="#FFF" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
                </svg>
            </div>
        </div>

        <div class="c-app-mobile-sidebar__categories-list">
            <div class="c-category-item">
                <router-link :class="{'c-bk-color': $route.name !== 'channel-content' && $route.name !== 'my-selection'}"
                             :to="{name: 'LiveTV-Player', params: {id: 'rti1'}}" v-if="$route.name === 'discover'">
                    Live
                    <i class="c-live-bullet"></i>
                </router-link>

                <router-link :class="{'c-bk-color': $route.name !== 'channel-content' && $route.name !== 'my-selection'}"
                             :to="{name: 'LiveTV-Player', params: {id: $route.params.ChannelName}}" v-else>
                    Live
                    <i class="c-live-bullet"></i>
                </router-link>
            </div>

            <div class="c-category-item" @click="HIDE_MOBILE_SIDEBAR()">
                <router-link :to="{name: 'discover' }"
                             v-if="$route.name === 'discover' || $route.params.ChannelName === 'rti1'">
                    Home RTI 1
                </router-link>

                <router-link :to="{name:'discover-channel', params: {ChannelName: 'rti2'} }"
                             v-if="$route.params.ChannelName === 'rti2'">
                    Home RTI 2
                </router-link>

                <router-link :to="{name:'discover-channel', params: {ChannelName: 'rti3'}}"
                             v-if="$route.params.ChannelName === 'rti3' ">
                    Home RTI 3
                </router-link>

                <router-link :to="{name:'discover-channel', params: {ChannelName: 'radio-ci'}}"
                             v-if="$route.params.ChannelName === 'radio-ci' ">
                    Home Radio CI
                </router-link>

                <router-link :to="{name:'discover-channel', params: {ChannelName: 'frequence'}}"
                             v-if="$route.params.ChannelName === 'frequence' ">
                    Home Frequence 2
                </router-link>

                <router-link :to="{name:'discover-channel', params: {ChannelName: 'radio-flimee'}}"
                             v-if="$route.params.ChannelName === 'radio-flimee' ">
                    Home Radio Flimee
                </router-link>

            </div>

            <div class="c-category-item"  v-if="IS_AUTHENTICATED" @click="HIDE_MOBILE_SIDEBAR()">
                <router-link :class="{'c-bk-color': $route.name !== 'channel-content' && $route.name !== 'my-selection'}"
                             class="hv"
                             :to="{name: 'my-selection', params: {ChannelName: 'rti1'} }"
                             v-if="$route.name === 'discover' ">
                    My Selection
                </router-link>
                <router-link :class="{'c-bk-color': $route.name !== 'channel-content' && $route.name !== 'my-selection'}"
                             class="c-my-selection"
                             :to="{name: 'my-selection', params: {ChannelName: $route.params.ChannelName} }"
                             v-else>
                    My Selection
                </router-link>
            </div>

            <div class="c-category-item" v-for="(item, index) in ChannelContent.CategoriesList" :key="index" @click="HIDE_MOBILE_SIDEBAR()"
                 v-if=" ChannelContent.CategoriesList !== null">
                        <span class="c-category-title">
                             <router-link :class="{'c-bk-color': $route.name !== 'channel-content' && $route.name !== 'my-selection'}"
                                          :to="{name: 'channel-content', params: {ChannelName: 'rti1', CategoryName: item.name} }"
                                          v-if="$route.name === 'discover' ">
                                {{item.name}}
                              </router-link>
                              <router-link :class="{'c-bk-color': $route.name !== 'channel-content' && $route.name !== 'my-selection'}"
                                           :to="{name: 'channel-content', params: {ChannelName: $route.params.ChannelName, CategoryName: item.name} }"
                                           v-else>
                                {{item.name}}
                              </router-link>
                              <i class="c-live-bullet"></i>
                        </span>
            </div>

        </div>
    </div>
</template>

<script>
    import {
        mapState
    } from "vuex";

    export default {

        computed: mapState({
            ChannelContent: state => state.discover.ChannelContent,
            SHOW_MOBILE_SIDEBAR: state => state.event.SHOW_MOBILE_SIDEBAR,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED

        }),


        beforeRouteLeave (to, from, next) {
            this.$store.commit('SHOW_MOBILE_SIDEBAR');

            next()
        },


        methods: {
            LOGOUT() {
                this.$store.dispatch("LOGOUT_AUTH");
            },


            HIDE_MOBILE_SIDEBAR() {
                this.$store.commit('SHOW_MOBILE_SIDEBAR');
            }
        }
    };
</script>
