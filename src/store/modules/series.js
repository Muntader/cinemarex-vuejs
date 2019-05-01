import Vue from 'vue';
import router from '../../config/Routes';

const module = {
    state: {
        TV_SHOW_CONTENT: [],
        TV_SHOW_CONTENT_LOADING_PAGE: false,
    },
    actions: {

        GET_TV_SHOW_SUMMARY({commit}, ID) {
            commit('TV_SHOW_CONTENT_LOADING_PAGE', true);

            axios.get('http://localhost:8001/api/v1/get/series/' + ID).then((response) => {
                if (response.status === 200) {
                    commit('SET_TV_SHOW_SUMMARY', response.data.data);
                    commit('TV_SHOW_CONTENT_LOADING_PAGE', false);
                }
            }, error => {
                if(error.response.status === 404){
                    router.push({name: '404'});
                }else{
                    router.push('/');
                }
            });
        },


        GET_GHOST_TV_SHOW_SUMMARY({commit}, ID) {
            commit('TV_SHOW_CONTENT_LOADING_PAGE', true);
            axios.get('http://localhost:8001/api/v1/ghost/get/series/' + ID).then((response) => {
                if (response.status === 200) {
                    commit('SET_TV_SHOW_SUMMARY', response.data.data);
                    commit('TV_SHOW_CONTENT_LOADING_PAGE', false);
                }
            }, error => {
                if(error.response.status === 404){
                    router.push({name: '404'});
                }else{
                    router.push('/');
                }
            });
        },

    },
    mutations: {
        SET_TV_SHOW_SUMMARY(state, data) {
            state.TV_SHOW_CONTENT = data;
        },

        TV_SHOW_CONTENT_LOADING_PAGE(state,status) {
            state.TV_SHOW_CONTENT_LOADING_PAGE = status;
        },

        CLEAR_TV_SHOW_SHOW_DATA(state) {
            state.MOVIE_CONTENT = [];
        },
    },
    getters: {}
};
export default module;
