import Vue from 'vue'
import router from '../../config/Routes'
import Auth from '../../config/Auth'

import swal from 'sweetalert'

const alertify = require('alertify.js');

const module = {
    state: {
        items: {},
        SIGNUP_STEP: null,
        LIST_SERIES_FOR_SUBSCRIBE: [],
        UserInfo: null,
        ErrorMessage: null,
        ButtonLoading: false,
    },
    actions: {

        /**
         *  Send request to oauth to check if the email and password is correct or return 401 error
         *
         * @param {*} commit
         * @param {*} array Email And Password
         */
        LOGIN({commit}, {email, password}) {
            commit('BUTTON_LOAD')
            var data = {
                grant_type: 'password',
                client_id: 2,
                client_secret: Vue.helper.client_secret(),
                username: email,
                password: password,
                scope: ''
            };
            axios.post('http://localhost:8000/oauth/token', data)
                .then(response => {
                    axios
                        .get('http://localhost:8000/api/v1/get/check/user', {
                            headers: {
                                Authorization: 'Bearer ' + response.data.access_token
                            }
                        })
                        .then(check => {
                            commit('SET_USER_INFO', {
                                Username: check.data.name,
                                Email: check.data.email,
                                Language: check.data.language,
                                Image: check.data.image,
                                AccessToken: response.data.access_token,
                                ExpiresIn: response.data.expires_in,
                                Status: 'active'
                            });

                            commit('SET_TOKEN', {
                                Username: check.data.name,
                                Email: check.data.email,
                                Language: check.data.language,
                                AccessToken: response.data.access_token,
                                ExpiresIn: response.data.expires_in,
                                Status: 'active'
                            });

                            axios.interceptors.request.use(
                                config => {  config.headers['Authorization'] = 'Bearer ' + response.data.access_token;  return config}
                            );

                            commit('IS_AUTHENTICATED');
                            commit('SHOW_LOGIN_MODAL', false);

                            router.push({name: 'discover'});

                        }, (error) => {
                            if (error.response.status === 401) {
                                alertify.logPosition('top right');
                                alertify.error(error.response.data.message);
                                commit('BUTTON_CLEAR')
                            }
                        })

                }, (error) => {
                    if (error.response.status === 401) {
                        commit('SET_ERROR_MESSAGE', error.response.data.message);
                        commit('BUTTON_CLEAR')
                    }
                })
        },


        /**
         *  Login with facebook
         *
         * @param {*} commit
         * @param {*} array Email And Password
         */
        LOGIN_WITH_FACEBOOK({commit}, {Email, Name, Image, AccessToken}) {
            commit('BUTTON_LOAD')
            axios.post('http://localhost:8000/api/v1/auth/facebook', {
                Email:Email,
                Name:Name,
                Image:Image,
                AccessToken:AccessToken
            }).then(response => {
                axios
                    .get('http://localhost:8000/api/v1/get/check/user', {
                        headers: {
                            Authorization: 'Bearer ' + response.data.access_token
                        }
                    })
                    .then(check => {
                        commit('SET_USER_INFO', {
                            Username: check.data.name,
                            Email: check.data.email,
                            Language: check.data.language,
                            Image: check.data.image,
                            AccessToken: response.data.access_token,
                            ExpiresIn: response.data.expires_in,
                            Status: 'active'
                        });

                        commit('SET_TOKEN', {
                            Username: check.data.name,
                            Email: check.data.email,
                            Language: check.data.language,
                            AccessToken: response.data.access_token,
                            ExpiresIn: response.data.expires_in,
                            Status: 'active'
                        });

                        axios.interceptors.request.use(
                            config => {  config.headers['Authorization'] = 'Bearer ' + response.data.access_token;  return config}
                        );

                        commit('IS_AUTHENTICATED');
                        commit('SHOW_LOGIN_MODAL', false);

                        router.push({name: 'discover'});

                    }, (error) => {
                        if (error.response.status === 401) {
                            alertify.logPosition('top right');
                            alertify.error(error.response.data.message);
                            commit('BUTTON_CLEAR')
                        }
                    })


                }, (error) => {
                    if (error.response.status === 401) {
                        commit('SET_ERROR_MESSAGE', error.response.data.message);
                        commit('BUTTON_CLEAR')
                    }
                })
        },


        LOGIN_WITH_GOOGLE({commit}, {Email, Name, Image, AccessToken}) {
            commit('BUTTON_LOAD')
            axios.post('http://localhost:8000/api/v1/auth/google', {
                Email:Email,
                Name:Name,
                Image:Image,
                AccessToken:AccessToken
            }).then(response => {
                axios
                    .get('http://localhost:8000/api/v1/get/check/user', {
                        headers: {
                            Authorization: 'Bearer ' + response.data.access_token
                        }
                    })
                    .then(check => {
                        commit('SET_USER_INFO', {
                            Username: check.data.name,
                            Email: check.data.email,
                            Language: check.data.language,
                            Image: check.data.image,
                            AccessToken: response.data.access_token,
                            ExpiresIn: response.data.expires_in,
                            Status: 'active'
                        });

                        commit('SET_TOKEN', {
                            Username: check.data.name,
                            Email: check.data.email,
                            Language: check.data.language,
                            AccessToken: response.data.access_token,
                            ExpiresIn: response.data.expires_in,
                            Status: 'active'
                        });

                        axios.interceptors.request.use(
                            config => {  config.headers['Authorization'] = 'Bearer ' + response.data.access_token;  return config}
                        );

                        commit('IS_AUTHENTICATED');
                        commit('SHOW_LOGIN_MODAL', false);

                        router.push({name: 'discover'});

                    }, (error) => {
                        if (error.response.status === 401) {
                            alertify.logPosition('top right');
                            alertify.error(error.response.data.message);
                            commit('BUTTON_CLEAR')
                        }
                    })


            }, (error) => {
                if (error.response.status === 401) {
                    commit('SET_ERROR_MESSAGE', error.response.data.message);
                    commit('BUTTON_CLEAR')
                }
            })
        },


        /**
         * Check hash
         *
         * @param {any} {commit}
         * @param {hash} {code}
         */

        SIGNUP({commit}, {email, password}) {
            commit('BUTTON_LOAD');
                axios.post('http://localhost:8000/api/v1/create/register', {
                    Email: email,
                    Password: password
                }).then((response) => {
                    if (response.status === 200) {
                        // Login
                        var data = {
                            grant_type: 'password',
                            client_id: 2,
                            client_secret: Vue.helper.client_secret(),
                            username: email,
                            password: password,
                            scope: ''
                        };
                        axios.post('http://localhost:8000/oauth/token', data).then(AccessInfo => {
                            commit('SET_USER_INFO', {
                                Username: null,
                                Email: response.data.email,
                                Language: 'en',
                                Image: null,
                                AccessToken: AccessInfo.data.access_token,
                                ExpiresIn: AccessInfo.data.expires_in,
                                Status: 'active'
                            });

                            commit('SET_TOKEN', {
                                Username: null,
                                Email: response.data.email,
                                Language: 'en',
                                Image: null,
                                AccessToken: AccessInfo.data.access_token,
                                ExpiresIn: AccessInfo.data.expires_in,
                                Status: 'Confirm'
                            });

                            axios.interceptors.request.use(
                                config => {  config.headers['Authorization'] = 'Bearer ' + AccessInfo.data.access_token;  return config}
                            );
                            commit('IS_AUTHENTICATED');
                            commit('TRUN_TO_STEP', 'STEP2');
                            commit('BUTTON_CLEAR');

                        });
                    }
                }, error => {
                    commit('SET_ERROR_MESSAGE', error.response.data.message);
                    commit('BUTTON_CLEAR')
                })

        },


        SIGNUP_STEP_2({commit}, {Birthday, Gender, Username}) {
            commit('BUTTON_LOAD');
            axios.post('http://localhost:8000/api/v1/create/register/profile', {
                Birthday: Birthday,
                Gender: Gender,
                Username: Username
            }).then((response) => {
                if (response.status === 200) {
                    commit('TRUN_TO_STEP', 'STEP3');
                    commit('UPDATE_USER_INFO', {
                        Username: Username,
                        Email: 0,
                        Image: 0,
                        Language: 0
                    });

                }
            }, error => {
                commit('SET_ERROR_MESSAGE', error.response.data.message);
                commit('BUTTON_CLEAR')
            })
        },


        CHECK_FORGET_CODE({commit}, code) {

            axios.post('http://localhost:8000/api/v1/register/forget/checkhash', {
                code: code
            }).then(response => {
                if (response.status === 200) {
                    // Message
                    // Not necessarily
                }
            }, error => {
                router.push({
                    name: 'login'
                })
            })

        },

        /**
         *  Change password
         *
         * @param {*} { commit }
         * @param {*} { email, hash, password, password }
         */

        CHANGE_FORGET_PASSWORD({commit}, {code, password, password_confirmation}) {
            commit('BUTTON_LOAD')
            axios.post('http://localhost:8000/api/v1/update/register/password', {
                code: code,
                password: password,
                password_confirmation: password_confirmation
            })
                .then(response => {
                    if (response.status === 200) {
                        router.push({
                            name: 'login'
                        })
                        alertify.logPosition('top right')
                        alertify.success(response.data.message)
                        commit('BUTTON_CLEAR')
                    }
                }, error => {
                    alertify.logPosition('top right')
                    alertify.error(error.response.data.message)
                    commit('BUTTON_CLEAR')
                })
        },

        /**
         *  Send message to email to reset password
         *
         *  @param {email} email
         */

        CHECK_EMAIL({commit}, email) {
            commit('BUTTON_LOAD')
            axios.post('http://localhost:8000/api/v1/check/register/email', {
                email: email
            })
                .then(response => {
                    if (response.status === 200) {
                        alertify.logPosition('top right')
                        alertify.success(response.data.message)
                        commit('BUTTON_CLEAR')
                        router.push({
                            name: 'login'
                        })
                    }
                }, error => {
                    alertify.logPosition('top right')
                    alertify.error(error.response.data.message)
                    commit('BUTTON_CLEAR')
                })
        },

        /**
         * Change password of already user
         *
         * @param {*} commit
         * @param {*} password
         */
        UPDATE_PASSWORD(commit, {current_password, password, password_confirmation}) {
            swal({
                title: 'Are you sure to change password ?',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axios.post('http://localhost:8000/api/v1/update/profile/password', {
                        current_password: current_password,
                        password: password,
                        password_confirmation: password_confirmation
                    }).then(response => {
                        if (response.status === 200) {
                            alertify.logPosition('top right')
                            alertify.success(response.data.message)
                            Vue.auth.destroyToken()
                            router.push({
                                name: 'login'
                            })
                        }
                    }, error => {
                        alertify.logPosition('top right')
                        alertify.error(error.response.data.message)
                    })
                }
            })
        },



        /**
         * Get viewing history
         *
         * @param {any} {commit }
         */

        GET_VIEWING_HISTORY({commit}) {
            commit('SPINER_LOAD')
            axios.get('http://localhost:8000/api/v1/get/profile/viewing_history').then(response => {
                if (response.data.status === 'success') {
                    commit('SET_VIEWING_HISTORY', {
                        data: response.data.data,
                    })
                    commit('SPINER_CLEAN')
                }
            })
        },

        /**
         *
         * Logout
         *
         * @param {*} param0
         */
        LOGOUT_AUTH({commit}) {
            commit('SPINER_LOAD')
            axios.get('http://localhost:8000/api/v1/get/logout').then(response => {
                if (response.status === 200) {
                    commit('SET_LOGOUT_ATUH')
                    commit('SPINER_CLEAN')
                }
            }, error => {

                if (error.response.status === 401) {
                    localStorage.removeItem('_user')
                    location.href = '/'
                }

            })
        },


        LIST_SERIES_FOR_SUBSCRIBE({commit}) {
            axios.get('http://localhost:8000/api/v1/get/profile/programs/list').then(response => {
                if (response.status === 200) {
                    commit('SET_LIST_SERIES_FOR_SUBSCRIBE', response.data.ListPrograms);
                }
            })
        }

    },

    mutations: {

        SET_USER_INFO(state, data) {
            state.UserInfo = data;
        },

        UPDATE_USER_INFO(state, {Username, Email, Image, Language}) {
            if(Username !== 0)
            state.UserInfo.Username = Username;
            if(Email !== 0)
                state.UserInfo.Email = Email;
            if(Image !== 0)
                state.UserInfo.Image = Image;
            if(Language !== 0)
                state.UserInfo.Language = Language;
        },

        TRUN_TO_STEP(state, status) {
            state.SIGNUP_STEP = status
        },

        SET_ERROR_MESSAGE(state, message) {
            state.ErrorMessage = message
        },

        SET_LIST_SERIES_FOR_SUBSCRIBE(state, data) {
            state.LIST_SERIES_FOR_SUBSCRIBE = data;
        },

        SET_LOGOUT_ATUH() {
            localStorage.removeItem('_user')
            router.go('/')
        },


        // BUTTON load
        BUTTON_LOAD(state) {
            state.ButtonLoading = true
        },

        BUTTON_CLEAR(state) {
            state.ButtonLoading = false
        },
    },

}
export default module
