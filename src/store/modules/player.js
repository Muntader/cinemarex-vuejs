import Vue from 'vue';
import router from '../../config/Routes';

const module = {
  state: {
    tv_data: [],
    series_data: [],
    movie_data: [],
    news_data: [],
    player_spinner: true

    /* TV */

  },
  actions: {

    /**
     * Get movie vidoe,subtitle,suggestion
     *
     * @param {any} param
     * @param {any} id
     */

    LOAD_MOVIE_PLAYER({
      commit
    }, id) {
      commit('SPINER_LOAD')
      axios.post( 'http://localhost:8000/api/v1/get/watch/movie', {
        movie_id: id
      }).then(response => {
        if (response.status === 200) {
          commit('SET_MOVIE', {
            data: response.data.data
          });
          commit('SPINER_CLEAN')

        }
      }, error => {
        // Show Sweetalert if there is problem
        swal({
          icon: 'error',
          title: 'There was a problem playing the video, we will fix it soon',
          dangerMode: true,
          button: 'Back',
        }).then(() => {
          window.history.back();
          videojs.dispose();
        });
      });
    },


    /**
     *
     * @param {*}  commit
     * @param {uuid,string,uuid}  Array
     */
    LOAD_SERIES_PLAYER({
      commit
    }, {
      episode_id,
      series_id
    }) {
      commit('SPINER_LOAD')

      axios.post( 'http://localhost:8000/api/v1/get/watch/series', {
          episode_id: episode_id,
          series_id: series_id,
        })
        .then(response => {
          if (response.data.status === 'success') {
            commit('SET_SERIES', {
              data: response.data.data
            });
            commit('SPINER_CLEAN')

          }
        }, error => {
          swal({
            icon: 'error',
            title: 'There was a problem playing the video, we will fix it soon',
            dangerMode: true,
            button: 'Back',
          }).then(() => {
            window.history.back();
            videojs.dispose();
          });
        });
    },

    /**
     * Get movie vidoe,subtitle,suggestion
     *
     * @param {any} param
     * @param {any} id
     */

    LOAD_GHOST_MOVIE_PLAYER({
      commit
    }, id) {
      commit('SPINER_LOAD')

      axios.post( 'http://localhost:8000/api/v1/ghost/get/watch/movie', {
        movie_id: id
      }).then(response => {
        if (response.status === 200) {
          commit('SET_MOVIE', {
            data: response.data.data
          });
          commit('SPINER_CLEAN')

        }
      }, error => {
        // Show Sweetalert if there is problem
        swal({
          icon: 'error',
          title: 'There was a problem playing the video, we will fix it soon',
          dangerMode: true,
          button: 'Back',
        }).then(() => {
          window.history.back();
        });
      });
    },


    /**
     *
     * @param {*}  commit
     * @param {uuid,string,uuid}  Array
     */
    LOAD_GHOST_SERIES_PLAYER({
      commit
    }, {
      episode_id,
      series_id
    }) {
      commit('SPINER_LOAD')

      axios.post( 'http://localhost:8000/api/v1/ghost/get/watch/series', {
          episode_id: episode_id,
          series_id: series_id,
        })
        .then(response => {
          if (response.data.status === 'success') {
            commit('SET_SERIES', {
              data: response.data.data
            });
            commit('SPINER_CLEAN')

          }
        }, error => {
          swal({
            icon: 'error',
            title: 'There was a problem playing the video, we will fix it soon',
            dangerMode: true,
            button: 'Back',
          }).then(() => {
            window.history.back();
          });
        });
    },


    /**
     *  Live Tv Videos
     *
     * @param commit
     * @param id
     * @constructor
     */
    LOAD_LIVE_TV({
      commit,
      dispatch
    }, id) {
      commit('SPINER_LOAD')

      axios.get( 'http://localhost:8000/api/v1/ghost/get/watch/tv/' + id)
        .then((res) => {
          commit('SET_DATA_PLAYER_TV', res.data.data);
          commit('SPINER_CLEAN')

        }, error => {
          swal({
            icon: 'error',
            title: 'There was a problem playing the video, we will fix it soon',
            dangerMode: true,
            button: 'Back',
          }).then(() => {
            window.history.back();
          });
        });
    },



    /**
     *  News Vidoes
     *
     * @param commit
     * @param id
     * @constructor
     */
    LOAD_NEWS_VIDEO({
      commit,
      dispatch
    }, id) {
      commit('SPINER_LOAD')

      axios.get('http://localhost:8000/api/v1/get/watch/news/' + id)
        .then((res) => {
          commit('SET_DATA_PLAYER_NEWS', res.data.data);
          commit('SPINER_CLEAN')

        }, error => {
          swal({
            icon: 'error',
            title: 'There was a problem playing the video, we will fix it soon',
            dangerMode: true,
            button: 'Back',
          }).then(() => {
            window.history.back();
          });
        });
    },


    /**
     *  News Vidoes
     *
     * @param commit
     * @param id
     * @constructor
     */
    LOAD_GHOST_NEWS_VIDEO({
      commit,
      dispatch
    }, id) {
      commit('SPINER_LOAD')

      axios.get('http://localhost:8000/api/v1/ghost/get/watch/news/' + id)
        .then((res) => {
          commit('SET_DATA_PLAYER_NEWS', res.data.data);
          commit('SPINER_CLEAN')

        }, error => {
          swal({
            icon: 'error',
            title: 'There was a problem playing the video, we will fix it soon',
            dangerMode: true,
            button: 'Back',
          }).then(() => {
            window.history.back();
          });
        });
    },


  },
  mutations: {

    /**
     * This mutations to set all video details (video resolation,subtitle,suggestion) in videojs player
     *
     * @param {*} state
     * @param {*} data
     */

    SET_MOVIE(state, data) {
      state.movie_data = data.data;
    },

    /**
     *
     * @param {*} state
     * @param {*} list
     */
    SET_SERIES(state, data) {
      state.series_data = data.data;
    },

    SET_DATA_PLAYER_TV(state, data) {
      state.tv_data = data;
    },

    SET_DATA_PLAYER_NEWS(state, data) {
      state.news_data = data;
    },

    CLOSE_REPORT(state) {
      state.show_report = false;
    },

            // Spiner load
            SPINER_LOAD(state) {

              state.player_spinner = true;
          },

          SPINER_CLEAN(state) {
              state.player_spinner = false;
          }

  }
};
export default module;

