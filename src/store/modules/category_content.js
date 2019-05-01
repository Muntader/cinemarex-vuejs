import Vue from 'vue';
import router from '../../config/Routes';

const module = {
    state: {
        ListCategoryContent: [],
        ListCategoryContentFilter: [],
        ListCategoryContentLoading: false,
        show: []
    },
    actions: {

        /**
         * Get Category Content
         *
         * @param {any} {commit}
         */
        LIST_CATEGORY_CONTENT({commit}, {ChannelName, CategoryName}) {
            commit('SPINNER_LOAD_MOVIES', true);
            axios.post('http://localhost:8001/api/v1/get/channel/content', {
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
         * Get all last movies
         *
         * @param {any} {commit}
         */
        LIST_GHOST_CATEGORY_CONTENT({commit}, {ChannelName, CategoryName}) {
            commit('SPINNER_LOAD_MOVIES', true);
            axios.post('http://localhost:8001/api/v1/ghost/get/channel/content', {
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
        GET_MOVIE_DETAILS({commit}, id) {
            axios.get('http://localhost:8001/api/v1/get/movie/' + id).then((response) => {
                if (response.status === 200) {
                    const data = response.data.data;
                    commit('SET_MOVIE_DETAILS', data);
                }
            }, error => {
                if (error.response.status === 404) {
                    router.push({name: '404'});
                } else {
                    router.push('/');
                }
            });
        },
    },
    mutations: {
        SET_CATEGORY_CONTENT(state, List) {
            state.ListCategoryContentFilter = [];
            state.ListCategoryContent = [];
            List.CategoryContentList.map((item, index) => {
                if (state.ListCategoryContent.length === 0) {
                    state.ListCategoryContent[0] = [];
                    state.ListCategoryContent[0].push(item)
                }
                else {
                    if (state.ListCategoryContent.length === 1) {
                        if (state.ListCategoryContent[0].length <= 2) {
                            state.ListCategoryContent[0].push(item)
                        }else{
                            state.ListCategoryContent[state.ListCategoryContent.length] = [];
                            state.ListCategoryContent[state.ListCategoryContent.length - 1].push(item)
                        }
                    }
                    else {
                        if (state.ListCategoryContent[state.ListCategoryContent.length - 1].length <= 3 && state.ListCategoryContent.length !== 1) {
                                state.ListCategoryContent[state.ListCategoryContent.length - 1].push(item)
                        } else {
                            state.ListCategoryContent[state.ListCategoryContent.length] = [];
                            state.ListCategoryContent[state.ListCategoryContent.length - 1].push(item)
                        }
                    }
                }
            });

            state.ListCategoryContentFilter = List;
        },

        SET_MOVIE_DETAILS(state, data) {
            state.show = data;
        },

        CLEAR_MOVIE_SHOW_DATA(state) {
            state.show = [];
        },

        SPINNER_LOAD_MOVIES(state, status) {
            state.ListCategoryContentLoading = status;
        },
    },
    getters: {}
};
export default module;
