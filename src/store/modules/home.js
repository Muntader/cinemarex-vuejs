const module = {
    state: {
        STIE_INFO: [],
        ChannelContent: [],
        HomeLoading: false,
    },
    actions: {

        // Get all movies form api /api/v1/movies
        GET_HOME_LIST({commit}, ID) {
            commit('HOME_SPINNER_LOAD', true);
            axios.get('http://localhost:8000/api/v1/get/discover/' + ID).then((response) => {
                if (response.status === 200) {
                    commit('SET_HOME_LIST', response.data);
                    commit('HOME_SPINNER_LOAD', false);
                }
            });
        },

        // Get all movies form api /api/v1/movies
        GET_HOME_FOOTER_DETAILS({
            commit
        }) {
            axios.get('http://localhost:8000/api/v1/get/app/details').then((response) => {
                if (response.status === 200) {
                    commit('SET_HOME_FOOTER_DETAILS',  response.data.data);
                }
            });
        },

        // Get all movies form api /api/v1/movies
        GET_HOME_PLAN({
            commit
        }) {
            axios.get('http://localhost:8000/api/v1/get/app/plan').then((response) => {
                if (response.status === 200) {
                    const data = response.data.data;
                    commit('SET_HOME_PLAN', data);
                }
            });
        },

    },
    mutations: {

        SET_HOME_LIST(state, Data) {
            state.ChannelContent = Data;
        },

        SET_HOME_FOOTER_DETAILS(state, data) {
            state.STIE_INFO = data;
        },


        HOME_SPINNER_LOAD(state, status) {
            state.HomeLoading = status;
        },
    },
    getters: {}
};
export default module;
