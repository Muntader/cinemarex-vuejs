<template>
        <div class="c-app-sidebar-left d-none d-md-block" :class="{'c-hide-sidebar': !HideSideBar, 'c-show-sidebar': HideSideBar}">
            <div class="c-app-sidebar-left__search">
                <div class="c-search-item">
        <span class="c-search-label">
        Search
      </span>
                    <span class="c-search-icon">
        <img src="../../assets/default/img/page/channel/search.svg" alt="Search Icon" width="20px">
      </span>
                </div>

            </div>

            <div class="c-app-sidebar-left__categories-list">
                <div class="c-category-item">
                    <router-link :to="{name: 'LiveTV-Player', params: {id: 'rti1'}}">
                        Live
                        <i class="c-live-bullet"></i>
                    </router-link>
                </div>

                <div class="c-category-item">
                    <router-link :to="{name: 'discover' }">
                        Home RTI
                    </router-link>
                </div>

                <div class="c-category-item">
                    <router-link :to="{name: 'collection', params: {id: 'rti1'}}">
                        My Selection
                    </router-link>
                </div>


                <div class="c-category-item" v-for="(item, index) in ChannelContent.CategoriesList" :key="index"
                     v-if=" ChannelContent.CategoriesList !== null">
        <span class="c-category-title">
          <router-link :to="{name: 'channel-content', params: {ChannelName: 'rti1', CategoryName: item.name} }">
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
        data() {
            return {};
        },

        computed: mapState({
            ChannelContent: state => state.ghost_home.ChannelContent,
            HideSideBar: state => state.event.HIDE_SIDEBAR
        }),

        created() {
            if (this.ChannelContent.length === 0) {
                if (this.$route.params.ChannelName !== undefined) {
                    if (this.$auth.isAuthenticated()) {
                        this.$store.dispatch("GET_HOME_LIST", this.$route.params.ChannelName);
                    } else {
                        this.$store.dispatch('GET_GHOST_HOME_LIST', this.$route.params.ChannelName);
                    }
                }
            }
        },
        methods: {
            LOGOUT() {
                this.$store.dispatch("LOGOUT_AUTH");
            }
        }
    };
</script>
