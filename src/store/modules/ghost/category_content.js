import Vue from 'vue';
import router from '../../../config/Routes';

const module = {
    state: {
        ListCategoryContent: [],
        ListCategoryContentLoading: false,
        show: []

    },
    actions: {

       LIST_GHOST_CATEGORY_CONTENT({commit}, {ChannelName, CategoryName}) {
            commit('SPINNER_LOAD_MOVIES', true);
            axios.post( 'http://localhost:8000/api/v1/ghost/get/channel/content', {
                ChannelName: ChannelName,
                CategoryName: CategoryName
            }).then(response => {
                if (response.status === 200) {
                    commit('SET_CATEGORY_CONTENT', response.data);
                    commit('SPINNER_LOAD_MOVIES', false);
                }
            });
        },

        /**
         * Get movie details
         *
         * @param {*} commit
         * @param {*} id movie request
         */
        GET_GHOST_MOVIE_DETAILS({
            commit
        }, id) {
            axios.get( 'http://localhost:8000/api/v1/ghost/get/movie/' + id).then((response) => {
                if (response.status === 200) {
                    const data = response.data.data;
                    commit('SET_MOVIE_DETAILS', data);
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
};
export default module;
