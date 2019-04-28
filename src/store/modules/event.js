import Vue from 'vue';

const module = {
    state: {
        sort: {},
        show_series_details_page: null,
        show_search_page: false,
        get_path_show_page: null,
        show_overview_page: false,
        SHOW_LOGIN_MODAL: false,
        SHOW_PROFILE_MODAL: false,
        HIDE_SIDEBAR: true,
        CHANNEL_SLIDER_ANIMATION: false,
        SHOW_MOBILE_SIDEBAR: false,
        FROM_ROUTE_FALLBACK: null,
    },

    mutations: {

        SET_SORT_BY(state, {trending, genre}) {
            state.sort = {trending, genre}
        },

        SHOW_SERIES_DETAILS_PAGE(state, show) {
            if(show) {
                state.show_series_details_page = true;
            }else {
                state.show_series_details_page = false;
            }
        },

        SHOW_SEARCH_PAGE(state) {
            if(state.show_search_page) {
                document.getElementById("root").classList.remove("xs221");
                state.show_search_page = false;
            }else{
                document.getElementById("root").className = "xs221";
                state.show_search_page = true;
            }
        },

        SHOW_LOGIN_MODAL(state, status) {
            state.SHOW_LOGIN_MODAL = status;
        },

        SHOW_PROFILE_MODAL(state, status) {
            state.SHOW_PROFILE_MODAL = status;
        },

        HIDE_SIDEBAR(state, status) {
            state.HIDE_SIDEBAR = status;
        },

        SHOW_MOBILE_SIDEBAR(state, status) {
            state.SHOW_MOBILE_SIDEBAR = !state.SHOW_MOBILE_SIDEBAR;
        },

        CHANNEL_SLIDER_ANIMATION(state, status) {
            state.CHANNEL_SLIDER_ANIMATION = status;
        },

        FROM_ROUTE_FALLBACK(state,status) {
            state.FROM_ROUTE_FALLBACK = status;
        }

    },

    getter: {}
};
export default module;
