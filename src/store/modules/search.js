import Vue from 'vue';
import router from '../../config/Routes';

const module = {
    state: {
        LIST_SEARCH: [],
        loading: false,
    },
    actions: {

        /**
         * Search for movies and series or cast
         *
         * @param {*} commit object
         * @param {string} query
         */
        GET_SEARCH_LIST({commit}, query) {
            commit('SPINER_LOAD');
            axios.post( 'http://localhost:8000/api/v1/get/search', {query: query}).then(response => {
                if (response.status === 200) {
                    commit('SET_SEARCH_LIST', response.data);
                    commit('SPINER_CLEAN');
                }

            }, error => {
                // Any error redirect to home
                router.push({name: 'discover'});
            });
        },


        /**
         * Search for movies and series or cast
         *
         * @param {*} commit object
         * @param {string} query
         */
        GET_GHOST_SEARCH_LIST({commit}, query) {
            commit('SPINER_LOAD');
            axios.post( 'http://localhost:8000/api/v1/ghost/get/search', {query: query}).then(response => {
                if (response.status === 200) {
                    commit('SET_SEARCH_LIST', response.data);
                    commit('SPINER_CLEAN');
                }

            }, error => {
                // Any error redirect to home
                router.push({name: 'discover'});
            });
        },

    },
    mutations: {

        /**
         *
         * @param {*} state
         * @param {*} data
         */
        SET_SEARCH_LIST(state, data) {
            state.LIST_SEARCH = data;
        },


        SPINER_LOAD(state) {
            state.loading = true;
        },

        SPINER_CLEAN(state) {
            state.loading = false;
        }
    },
    getters: {}
};
export default module;
