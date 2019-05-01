import Vue from 'vue';
import swal from 'sweetalert';
import router from '../../config/Routes';
const alertify = require('alertify.js');


const module = {
    state: {
        LIST_MY_SELECTION: {
            'movies': null,
            'series': null
        },
        MY_SELECTION_LOADING_PAGE: true,
    },
    actions: {

        /**
         * GET All collection name and id of the user
         *
         * @param {any} {commit}
         */

        LIST_MY_SELECTION({commit}, ChannelName) {
            commit('MY_SELECTION_LOADING_PAGE', true);
            axios.get( 'http://localhost:8001/api/v1/get/my-selection/' + ChannelName).then((response) => {
                if (response.status === 200) {
                    commit('SET_LIST_MY_SELECTION', response.data);
                    commit('MY_SELECTION_LOADING_PAGE', false);
                }
            }, (error) => {
                alertify.logPosition('bottom center');
                alertify.error(error.response.data.message);
                commit('MY_SELECTION_LOADING_PAGE', false);
            });
        },

        /**
         * Add new collection or add movie and series in already collection
         *
         * @param {any} { commit }
         * @param {integer, string, integer, string} { id, new_collection, already_collection, type}
         */

        ADD_NEW_TO_COLLECTION({ commit }, { ID, ChannelName, Type, type}) {
            axios.post( 'http://localhost:8001/api/v1/create/my-selection', {
                ID: ID,
                ChannelName: ChannelName,
                Type: Type

            }).then((response) => {
                if (response.status === 200) {
                    alertify.logPosition('bottom center');
                    alertify.success(response.data.message);
                }
            }, (error) => {
                alertify.logPosition('bottom center');
                alertify.error(error.response.data.message);
            });
        },


    },
    mutations: {

        SET_LIST_MY_SELECTION(state, data){
            state.LIST_MY_SELECTION = data;
        },


        MY_SELECTION_LOADING_PAGE(state, status) {
            state.MY_SELECTION_LOADING_PAGE = status;
        }
    },
    getters: {}
};
export default module;
