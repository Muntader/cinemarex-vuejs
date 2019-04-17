import store from "../store";

const module = {
    state: {
        IS_AUTHENTICATED: false,
        ButtonLoading: false,
    },

    actions: {


    },

    mutations: {

        SET_TOKEN(state, {
            Username,
            Email,
            Language,
            AccessToken,
            ExpiresIn,
            Status}) {
            localStorage.setItem('_user',
                JSON.stringify({
                    'username': Username,
                    'email': Email,
                    'language': Language,
                    'token': AccessToken,
                    'expiration': ExpiresIn,
                    'status': Status
                }));
        },


        SET_UPDATE_TOKEN(state, {Username, Email, Language}) {
            const data = JSON.parse(localStorage.getItem('_user'));
            if (Username !== null) {
                data.username = Username;
            }
            if (Email !== null) {
                data.email = Email;
            }
            if (Language !== null) {
                data.language = Language;
            }

            localStorage.setItem("_user", JSON.stringify(data)); //put the object back
        },


        IS_AUTHENTICATED(state) {
            let data = JSON.parse(localStorage.getItem('_user'))
            if (data !== null) {
                if (!data.token || !data.expiration) {
                    state.IS_AUTHENTICATED = false;
                }

                if (Date.now() < data.expiration) {
                    localStorage.removeItem('_user');
                    state.IS_AUTHENTICATED = false;
                }

                state.IS_AUTHENTICATED = true;
            }
        },

        DESTROY_TOKEN() {
            localStorage.removeItem('_user');
        },

    },

    getters: {
        IS_AUTHENTICATED(state) {
            return state.IS_AUTHENTICATED;
        },

        GET_TOKEN: () => {
            const Data = JSON.parse(localStorage.getItem('_user'));
            if(Data !== null) {
                return Data.token;
            }
        }
    }

}
export default module
