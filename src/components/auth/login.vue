<template>
    <div class="c-app-auth">

        <div class="c-auth-content">
            <div class="c-auth-container__modal">

                <div class="c-auth-container__modal--header">
                    <div class="c-icon">
                        <img src="../../assets/default/img/channels/logo_rti.png" alt="RTI Logo">
                    </div>

                    <div class="c-label-title">
                        <font v-if="ShowPage === 'Login' ">Login to access RTI</font>
                        <font v-if="ShowPage === 'SignUp'">Sign up to enjoy the RTI experience</font>
                    </div>



                    <div class="c-out-auth-modal" @click="CLOSE_AUTH_MODAL()">
                        <svg class="modal__close" viewBox="0 0 40 40">
                            <path fill="none" stroke="#FFF" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
                        </svg>
                    </div>
                </div>

                <div class="c-auth-login-container" v-if="ShowPage === 'Login' && SIGNUP_STEP === null">
                    <div class="c-auth-login-container__body">

                        <div class="c-auth-provider">
                            <button class="c-auth-provider__button c-auth-provider__button--facebook"
                                    @click="AUTHENTICATE('facebook')">
                                <img src="../../assets/default/img/page/auth/facebook.svg" alt="Facebook Logo"
                                     class="fb-logo">
                            </button>
                            <button class="c-auth-provider__button c-auth-provider__button--google"
                                    @click="AUTHENTICATE('google')">
                                <img src="../../assets/default/img/page/auth/google.svg" alt="Google Logo"
                                     class="google-logo">
                            </button>
                        </div>

                        <div class="c-auth-interstice">
                            <div class="c-auth-interstice__label">
                                    <span style="vertical-align: inherit;">
                                    <span style="vertical-align: inherit;">Or login by email</span>
                                    </span></div>
                        </div>

                        <div class="c-auth-form">

                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" name="login-email" v-validate="'required|email|max:50'"
                                           :class="{'input': true, 'input-danger': errors.has('login-email') }"
                                           type="email" v-model="Email" :placeholder="$t('setting.mail')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('login-email')"
                                      class="text-danger">{{errors.first('login-email')}}</span>
                            </div>

                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" type="password" name="login-password"
                                           v-validate="'required|min:6|max:100'"
                                           :class="{'input': true, 'input-danger': errors.has('login-password') }"
                                           v-model="Password" :placeholder="$t('setting.password')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('login-password')"
                                      class="text-danger">{{errors.first('login-password')}}</span>
                            </div>

                            <div class="form-group">
                                <div class="text-danger">{{ErrorMessage}}</div>
                            </div>

                            <div class="c-auth-form__forget-password"  @click="ShowPage = 'RestorePassword'">
                                <div class="form-group text-center dark-text">
                                    <router-link :to="{name: 'forget_password'}">{{$t('register.forget_password')}}
                                    </router-link>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="text-center">
                                    <button class="btn btn-dark btn-block" @click="LOGIN()" v-if="!ButtonLoading">
                                        {{$t('register.login')}}
                                    </button>
                                    <button class="btn btn-dark btn-block" v-if="ButtonLoading">
                                        <i id="btn-progress btn-progress-light"></i>

                                        {{$t('register.loading')}}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="c-auth-login-container__footer">
                        <p>Do not have a profile yet?</p>
                        <button class="btn-signup" @click="ShowPage = 'SignUp'">Sign up</button>
                    </div>
                </div>

                <div class="c-auth-login-container" v-if="ShowPage === 'SignUp' && SIGNUP_STEP === null">
                    <div class="c-auth-login-container__body">

                        <div class="c-auth-provider">
                            <button class="c-auth-provider__button c-auth-provider__button--facebook"
                                    @click="AUTHENTICATE('facebook')">
                                <img src="../../assets/default/img/page/auth/facebook.svg" alt="Facebook Logo"
                                     class="fb-logo">
                            </button>
                            <button class="c-auth-provider__button c-auth-provider__button--google"
                                    @click="AUTHENTICATE('google')">
                                <img src="../../assets/default/img/page/auth/google.svg" alt="Google Logo"
                                     class="google-logo">
                            </button>
                        </div>

                        <div class="c-auth-interstice">
                            <div class="c-auth-interstice__label">
                                    <span style="vertical-align: inherit;">
                                    <span style="vertical-align: inherit;">Or registration by email</span>
                                    </span></div>
                        </div>

                        <div class="c-auth-form">

                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" name="signup-email" v-validate="'required|email|max:50'"
                                           :class="{'input': true, 'input-danger': errors.has('signup-email') }"
                                           type="email" v-model="Email" :placeholder="$t('setting.mail')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('signup-email')"
                                      class="text-danger">{{errors.first('signup-email')}}</span>
                            </div>

                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" type="password" name="signup-password"
                                           v-validate="'required|min:6|max:100'"
                                           :class="{'input': true, 'input-danger': errors.has('signup-password') }"
                                           v-model="Password" :placeholder="$t('setting.password')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('signup-password')"
                                      class="text-danger">{{errors.first('signup-password')}}</span>
                            </div>

                            <div class="form-group">
                                <div class="text-danger">{{ErrorMessage}}</div>
                            </div>

                            <div class="form-group">
                                <div class="text-center">
                                    <button class="btn btn-dark btn-block" @click="SIGNUP()" v-if="!ButtonLoading">
                                        {{$t('register.signup')}}
                                    </button>
                                    <button class="btn btn-dark btn-block" v-if="ButtonLoading">
                                        <i id="btn-progress btn-progress-light"></i>

                                        {{$t('register.loading')}}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="c-auth-login-container__footer">
                        <p>Already registered ?
                            <button class="btn-signup" @click="ShowPage = 'Login' ">Login</button>
                        </p>

                        <div class="c-footer-content mt-3">
                            <div class="auth-footer__connect-partner"><label class="checkbox"><input type="checkbox"
                                                                                                     name="partnersOptin">
                                <small class="text-muted">I wish to receive the good deals selected by M6 from its
                                    partners
                                </small>
                            </label>

                                <p class="c-app-regiter-rules">
                                    By clicking on the "sign up" button, you agree to our Terms of Service and Privacy
                                    Area .
                                    Your personal data is used to manage your personal space, make audience measurements
                                    and define your interests for editorial and advertising personalization purposes.
                                    You may object to profiling your data in the settings of your user account. Data
                                    entered by users under the age of 15 are not used for purposes of profiling and
                                    sending commercial surveys. By subscribing to our service and in accordance with
                                    art. L34-5 of the CPCE, we will be able to send you newsletters of an editorial
                                    nature. You can opt-out by going to your account settings immediately after
                                    registering. The data is intended for M6 Web and its possible subcontractors, as
                                    well as to any partner company provided that you have expressly consented to it.
                                    Responses to such a form are optional except for data marked with an asterisk that
                                    is mandatory. You may request access, rectification, or deletion of information
                                    about yourself, as well as specific instructions regarding their fate after your
                                    death, or oppose receiving offers from M6 Web in accordance with ourConfidentiality
                                    area .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="c-auth-login-container" v-if="ShowPage === 'RestorePassword' && SIGNUP_STEP === null">
                    <div class="c-auth-login-container__body">

                        <div class="c-auth-interstice">
                            <div class="c-auth-interstice__label">
                                    <span style="vertical-align: inherit;">
                                    <span style="vertical-align: inherit;">Mot de passe oublié</span>
                                    </span></div>
                        </div>

                        <div class="c-auth-form">
                            <small v-if="!SUCCESS_SENT_RESTORE_PASSWORD" class="text-muted mb-3">Enter the email address with which you registered. We will send you a message to reset your password.</small>
                            <p class="text-center" v-if="SUCCESS_SENT_RESTORE_PASSWORD">Un email a été envoyé à l'adresse : </p>

                            <p class="mt-5 text-center text-danger " v-if="SUCCESS_SENT_RESTORE_PASSWORD">{{Email}}</p>

                            <p class="mt-5 text-center text-danger " v-if="SUCCESS_SENT_RESTORE_PASSWORD">S'il n'apparaît pas dans votre messagerie dans les minutes qui viennent, vérifiez votre courrier indésirable.</p>


                            <div class="form-group mt-4" v-if="!SUCCESS_SENT_RESTORE_PASSWORD">
                                <div class="input-group">
                                    <input class="form-control" name="E-mail" v-validate="'required|email|max:50'"
                                           :class="{'input': true, 'input-danger': errors.has('E-mail') }"
                                           type="email" v-model="Email" :placeholder="$t('setting.mail')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('E-mail')"
                                      class="text-danger">{{errors.first('E-mail')}}</span>
                            </div>

                            <div class="form-group" v-if="!SUCCESS_SENT_RESTORE_PASSWORD">
                                <div class="text-danger">{{ErrorMessage}}</div>
                            </div>

                            <div class="form-group" >
                                <div class="text-center">
                                    <button class="btn btn-dark btn-block" @click="RESTORE_PASSWORD()" v-if="!ButtonLoading && !SUCCESS_SENT_RESTORE_PASSWORD">
                                        Envoyer
                                    </button>
                                    <button class="btn btn-dark btn-block" @click="ShowPage = 'Login'" v-if="!ButtonLoading">
                                        Annuler
                                    </button>
                                    <button class="btn btn-dark btn-block" v-if="ButtonLoading">
                                        <i id="btn-progress btn-progress-light"></i>

                                        {{$t('register.loading')}}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <div class="c-auth-login-container" v-if="SIGNUP_STEP === 'STEP2'">
                    <div class="c-auth-login-container__body">
                        <div class="c-auth-form">

                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" name="username" v-validate="'required|max:70'"
                                           :class="{'input': true, 'input-danger': errors.has('username') }"
                                           type="text" v-model="Username" :placeholder="$t('setting.name')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('username')"
                                      class="text-danger">{{errors.first('username')}}</span>
                            </div>


                            <div class="form-group form-inline birthday mb-4 mt-4">
                                <select class="form-control" v-model="DayDate">
                                    <option v-for="(item, index) in MonthList" :key="index">{{item}}</option>
                                </select>
                                <select class="form-control ml-4" v-model="MonthDate">
                                    <option value="1">Jan</option>
                                    <option value="2">Feb</option>
                                    <option value="3">Mar</option>
                                    <option value="4">Apr</option>
                                    <option value="5">May</option>
                                    <option value="6">Jun</option>
                                    <option value="7">Jul</option>
                                    <option value="8">Aug</option>
                                    <option value="9">Sept</option>
                                    <option value="10">Oct</option>
                                    <option value="11" selected="1">Nov</option>
                                    <option value="12">Dec</option>
                                </select>
                                <select class="form-control ml-4" v-model="YearDate">
                                    <option v-for="(item, index) in YearList" :key="index">{{item}}</option>
                                </select>
                            </div>

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="Gender" id="male" value="m"
                                       v-model="Gender">
                                <label class="form-check-labe p-0" for="male">{{$t('register.im_male')}}</label>
                            </div>

                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="Gender" id="female" value="f"
                                       v-model="Gender">
                                <label class="form-check-labe p-0" for="female">{{$t('register.im_female')}}</label>
                            </div>

                            <div class="form-group">
                                <div class="text-danger">{{ErrorMessage}}</div>
                            </div>

                            <div class="form-group">
                                <div class="text-center">
                                    <button class="btn btn-dark btn-block" @click="SIGNUP_STEP_2()"
                                            v-if="!ButtonLoading">
                                        {{$t('register.continue')}}
                                    </button>
                                    <button class="btn btn-dark btn-block" v-if="ButtonLoading">
                                        <i id="btn-progress btn-progress-light"></i>
                                        {{$t('register.loading')}}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="c-auth-subscribe-container" v-if="SIGNUP_STEP === 'STEP3'">

            <div class="c-auth-subscribe-container__header">
                <div class="c-out-auth-modal" @click="CLOSE_AUTH_MODAL()">
                    <svg class="modal__close" viewBox="0 0 40 40">
                        <path fill="none" stroke="#FFF" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
                    </svg>
                </div>
            </div>


            <div class="c-auth-subscribe-container__body">
                <div class="c-auth-form">
                    <h6>select your favorite programs, personalities and themes here.</h6>

                    <div class="row">
                        <div class="col-md-4 col-xl-3 mt-5" v-for="(item, index) in LIST_SERIES_FOR_SUBSCRIBE"
                             :class="{'c-item-subscribe-active': item.is_favorite, 'c-item-subscribe': !item.is_favorite}"
                             @click="ADD_TO_COLLECTION(item.id, item.channel_name, item.type, index)">
                            <div class="backdrop" v-if="item.is_favorite === 0">
                                <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                     v-if="item.cloud === 'local'"
                                     :alt="item.name" width="100%">
                                <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                     v-if="item.cloud === 'aws'"
                                     :alt="item.name" width="100%">
                                <div class="overlay">
                                    <div class="select-icon">
                                        <svg width="20" viewBox="0 0 448 448" xmlns="http://www.w3.org/2000/svg">
                                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class="backdrop" v-else>
                                <img :src="site_link + '/storage/backdrops/original_' + item.backdrop"
                                     v-if="item.cloud === 'local'"
                                     :alt="item.name" width="100%">
                                <img :src="lg_backdrop + '/storage/backdrops/original_' + item.backdrop"
                                     v-if="item.cloud === 'aws'"
                                     :alt="item.name" width="100%">`
                                <div class="overlay">
                                    <div class="in-select-icon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                                 width="19" viewBox="0 0 348.333 348.334" style="enable-background:new 0 0 348.333 348.334;"
                                                 xml:space="preserve">
                                            <g>
                                                <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
                                                    c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
                                                    c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
                                                    l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
                                                    L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
                                            </g>
                                        </svg>

                                    </div>

                                    <div class="selected-icon">
                                        <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                             width="19"viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;"
                                             xml:space="preserve">
                                        <g>
                                            <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
                                                c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
                                                c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
                                                c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
                                                C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
                                                c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z"/>
                                        </g>
                                        </svg>

                                    </div>

                                </div>
                            </div>

                            <div class="title">
                                {{item.name}}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex';
    import facebookLogin from 'facebook-login-vuejs';

    export default {
        data() {
            return {
                ShowPage: 'Login',
                Email: '',
                Password: '',
                BirthDate: '2000/1/1',
                YearList: [],
                MonthList: [],
                MonthDate: 1,
                YearDate: 2000,
                DayDate: 12,
                Gender: null,
                Username: ''
            };

        },

        computed: mapState({
            SIGNUP_STEP: state => state.register.SIGNUP_STEP,
            LIST_SERIES_FOR_SUBSCRIBE: state => state.register.LIST_SERIES_FOR_SUBSCRIBE,
            ErrorMessage: state => state.register.ErrorMessage,
            SUCCESS_SENT_RESTORE_PASSWORD: state => state.register.SUCCESS_SENT_RESTORE_PASSWORD,
            ButtonLoading: state => state.register.ButtonLoading
        }),

        created() {
            for (let y = 1900; y < 2004; y++) {
                this.YearList.push(y);
            }

            for (let m = 1; m < 31; m++) {
                this.MonthList.push(m);
            }

            setTimeout(() => {
                this.$store.dispatch('LIST_SERIES_FOR_SUBSCRIBE')
            }, 200)
        },

        watch: {
            ShowPage() {
                this.Email = '';
                this.Password = '';
            },

            ButtonLoading(val) {

            }
        },

        methods: {
            LOGIN() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store.dispatch('LOGIN', {
                            email: this.Email,
                            password: this.Password
                        });
                    }
                })
            },

            SIGNUP() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store.dispatch('SIGNUP', {
                            email: this.Email,
                            password: this.Password
                        });
                    }
                })
            },

            SIGNUP_STEP_2() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store.dispatch('SIGNUP_STEP_2', {
                            Birthday: this.YearDate + '-' + this.MonthDate + '-' + this.DayDate,
                            Gender: this.Gender,
                            Username: this.Username
                        });
                    }
                })
            },

            CLOSE_AUTH_MODAL() {
                this.$store.commit('SHOW_LOGIN_MODAL', false)
            },

            ADD_TO_COLLECTION(ID, ChannelName, Type, Index) {
                if (this.LIST_SERIES_FOR_SUBSCRIBE[Index].is_favorite === 1)
                    this.LIST_SERIES_FOR_SUBSCRIBE[Index].is_favorite = 0
                else
                    this.LIST_SERIES_FOR_SUBSCRIBE[Index].is_favorite = 1;

                this.$store.dispatch('ADD_NEW_TO_COLLECTION', {
                    ID: ID,
                    ChannelName: ChannelName,
                    Type: Type
                });
            },

            AUTHENTICATE(provider) {
                if (provider === 'facebook') {
                    this.$store.commit('BUTTON_LOAD')
                    this.$auth.authenticate(provider).then(response => {
                        axios.get('https://graph.facebook.com/me?access_token=' + response.access_token).then(FBme => {
                            axios.get('https://graph.facebook.com/' + FBme.data.id + '?fields=name,email,birthday,picture.type(large)&access_token=' + response.access_token).then(FBResposne => {

                                this.$store.dispatch('LOGIN_WITH_FACEBOOK', {
                                    Email: FBResposne.data.email,
                                    Name: FBResposne.data.name,
                                    Image: FBResposne.data.picture.data.url,
                                    AccessToken: response.access_token,
                                    FBID: FBme.data.id,
                                });

                            })
                        })
                    })
                }
                if (provider === 'google') {
                    this.$store.commit('BUTTON_LOAD')
                    this.$auth.authenticate(provider).then(response => {
                        axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + response.access_token).then(GoogleInfo => {
                            this.$store.dispatch('LOGIN_WITH_GOOGLE', {
                                Email: GoogleInfo.data.email,
                                Name: GoogleInfo.data.given_name + ' ' + GoogleInfo.data.family_name,
                                Image: GoogleInfo.data.picture,
                                AccessToken: response.access_token,
                                FBID: GoogleInfo.data.id,
                            });
                        })
                    })
                }

            },

            RESTORE_PASSWORD() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$store.dispatch('CHECK_EMAIL', this.Email)
                    }
                })
            },
        }
    }
</script>

