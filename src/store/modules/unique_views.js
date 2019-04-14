import Vue from 'vue';

const module = {

    actions: {

        /**
         * Create Episode Unqiue Views
         *
         * @param {*} param0
         */
        CREATE_EPISODE_UNIQUE_VIEWS({commit}, {series_id,episode_id}) {

            axios.post( 'http://localhost:8000/api/v1/create/videos/uniqueview', {series_id: series_id, episode_id: episode_id})
                .then((response) => {
                    if (response.status === 200) {
                      // Empty
                    }
                });

        },

             /**
         * Create Movies Unqiue Views
         *
         * @param {*} param0
         */
        CREATE_MOVIE_UNIQUE_VIEWS({commit}, movie_id) {

            axios.post( 'http://localhost:8000/api/v1/create/videos/uniqueview', {movie_id: movie_id})
                .then((response) => {
                    if (response.status === 200) {
                      // Empty
                    }
                });

        }
    }

};
export default module;
