import Vue from 'vue';

const module = {
    state: {
        ChannelContent: [],
        HomeLoading: false,
    },
    actions: {


        // Get all movies form api /api/v1/movies
        GET_GHOST_HOME_LIST({ commit }, ID) {
            commit('HOME_SPINNER_LOAD', true);
            axios.get('http://localhost:8000/api/v1/ghost/get/discover/' + ID).then((response) => {
                if (response.status === 200) {
                    commit('SET_HOME_LIST', response.data);
                    commit('HOME_SPINNER_LOAD', false);
                }
            });
        }

    },
    mutations: {

        SET_HOME_LIST(state, Data) {
            state.ChannelContent = Data;
        },


        // Spiner load
        HOME_SPINNER_LOAD(state, status) {
            state.HomeLoading = status;
        },
    },
    getters: {}
};
export default module;
