<template>
    <div class="c-app-auth">
        <div class="c-app-auth-blur-background"></div>

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
                        <svg class="modal__close" viewBox="0 0 40 40"><path fill="none" stroke="#FFF" d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
                    </div>
                </div>

                <div class="c-auth-login-container" v-if="ShowPage === 'Login' && SIGNUP_STEP === null">
                    <div class="c-auth-login-container__body">

                        <div class="c-auth-provider">
                            <button class="c-auth-provider__button c-auth-provider__button--facebook">
                                <img src="../../assets/default/img/page/auth/facebook.svg" alt="Facebook Logo"
                                     class="fb-logo">
                            </button>
                            <button class="c-auth-provider__button c-auth-provider__button--google">
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
                                    <input class="form-control" name="email" v-validate="'required|email|max:50'"
                                           :class="{'input': true, 'input-danger': errors.has('email') }"
                                           type="email" v-model="Email" :placeholder="$t('setting.mail')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('email')"
                                      class="text-danger">{{errors.first('email')}}</span>
                            </div>

                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" type="password" name="password"
                                           v-validate="'required|min:6|max:100'"
                                           :class="{'input': true, 'input-danger': errors.has('password') }"
                                           v-model="Password" :placeholder="$t('setting.password')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('password')"
                                      class="text-danger">{{errors.first('password')}}</span>
                            </div>

                            <div class="form-group">
                                <div class="text-danger">{{ErrorMessage}}</div>
                            </div>

                            <div class="c-auth-form__forget-password">
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
                            <button class="c-auth-provider__button c-auth-provider__button--facebook">
                                <img src="../../assets/default/img/page/auth/facebook.svg" alt="Facebook Logo"
                                     class="fb-logo">
                            </button>
                            <button class="c-auth-provider__button c-auth-provider__button--google">
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
                                    <input class="form-control" name="email" v-validate="'required|email|max:50'"
                                           :class="{'input': true, 'input-danger': errors.has('email') }"
                                           type="email" v-model="Email" :placeholder="$t('setting.mail')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('email')"
                                      class="text-danger">{{errors.first('email')}}</span>
                            </div>

                            <div class="form-group">
                                <div class="input-group">
                                    <input class="form-control" type="password" name="password"
                                           v-validate="'required|min:6|max:100'"
                                           :class="{'input': true, 'input-danger': errors.has('password') }"
                                           v-model="Password" :placeholder="$t('setting.password')"
                                           autocomplete="off">
                                </div>
                                <span v-show="errors.has('password')"
                                      class="text-danger">{{errors.first('password')}}</span>
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

                <div class="c-auth-login-container"  v-if="SIGNUP_STEP === 'STEP2'">
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
                                        <option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option><option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option><option value="7">Jul</option><option value="8">Aug</option><option value="9">Sept</option><option value="10">Oct</option><option value="11" selected="1">Nov</option><option value="12">Dec</option>
                                    </select>
                                    <select class="form-control ml-4" v-model="YearDate">
                                        <option v-for="(item, index) in YearList" :key="index" >{{item}}</option>
                                    </select>
                            </div>

                            <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="Gender" id="male" value="m" v-model="Gender">
                                    <label class="form-check-labe p-0" for="male">{{$t('register.im_male')}}</label>
                            </div>

                            <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="Gender" id="female" value="f" v-model="Gender">
                                    <label class="form-check-labe p-0" for="female">{{$t('register.im_female')}}</label>
                            </div>

                            <div class="form-group">
                                <div class="text-danger">{{ErrorMessage}}</div>
                            </div>

                            <div class="form-group">
                                <div class="text-center">
                                    <button class="btn btn-dark btn-block" @click="SIGNUP_STEP_2()" v-if="!ButtonLoading">
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
            ErrorMessage: state => state.register.ErrorMessage,
            ButtonLoading: state => state.register.ButtonLoading
        }),

        created() {
            for (let y = 1900; y < 2004; y++) {
                this.YearList.push(y);
            }

            for (let m = 1; m < 31; m++) {
                this.MonthList.push(m);
            }
        },

        watch: {
            SIGNUP_STEP(val) {
                alert(val)
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
            }

        }
    }
</script>

