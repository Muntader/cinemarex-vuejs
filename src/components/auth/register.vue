<template>
<div class="register">
    <div class="col-12 signup">

        <div class="exit-button" @click="EXIT">
            <exit-button></exit-button>
        </div>

        <!-- END back -->

        <div class="col-12 col-md-8 offset-md-2 p-2 p-sm-4 signup-form">

            <div class="title">
                <h3>{{$t('register.stepone')}}</h3>
            </div>

            <div class=" col-lg-10 offset-lg-1 ">
                <div class="form-group">
                    <div class="col-12">
                        <input class="form-control" type="name" name="name"
                                       v-validate="'required|alpha_spaces|min:6|max:24'"
                                       :class="{'input': true, 'input-danger': errors.has('name') }" v-model="name"
                                       :placeholder="$t('setting.name')"
                                       autocomplete="off">
                        <span v-show="errors.has('name')" class="text-danger">{{errors.first('name')}}</span>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-12">
                        <input class="form-control" type="email" name="email" v-validate="'required|email|max:50'"
                                       :class="{'input': true, 'input-danger': errors.has('email') }" v-model="email"
                                       :placeholder="$t('setting.mail')"
                                       autocomplete="off">
                        <span v-show="errors.has('email')" class="text-danger">{{errors.first('email')}}</span>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-12">
                        <input class="form-control" type="password" name="password"
                                ref="passwordRef"
                                       v-validate="'min:8|required'"
                                       :class="{'input': true, 'input-danger': errors.has('password') }" v-model="password"
                                       :placeholder="$t('setting.password')">
                            </div>
                    </div>

                    <div class="form-group">
                        <div class="col-12">
                            <input class="form-control" type="password" name="password_confirmation"
                                       v-validate="'min:8|required|confirmed:passwordRef'"
                                       :class="{'input': true, 'input-danger': errors.has('password') }" v-model="confirm"
                                       :placeholder="$t('setting.password_confirm')" data-vv-as="password">
                            <span v-show="errors.has('password_confirmation')"
                                      class="text-danger">{{ errors.first('password_confirmation') }}</span>
                        </div>
                    </div>

                    <div class="form-group form-inline birthday mb-4 mt-4">
                        <div class="col-12">
                            <select class="form-control" v-model="dayDate">
                                <option v-for="(item, index) in monthList" :key="index">{{item}}</option>
                            </select>
                            <select class="form-control" v-model="monthDate">
                                <option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option><option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option><option value="7">Jul</option><option value="8">Aug</option><option value="9">Sept</option><option value="10">Oct</option><option value="11" selected="1">Nov</option><option value="12">Dec</option>
                            </select>
                            <select class="form-control" v-model="yearDate">
                                <option v-for="(item, index) in yearList" :key="index" >{{item}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-check form-check-inline ml-4">
                        <div class="col-12">
                            <input class="form-check-input" type="radio" name="gender" id="male" value="m" v-model="gender">
                            <label class="form-check-labe p-0" for="male">{{$t('register.im_male')}}</label>
                        </div>
                    </div>
                    <div class="form-check form-check-inline">
                        <div class="col-12">

                            <input class="form-check-input" type="radio" name="gender" id="female" value="f" v-model="gender">
                            <label class="form-check-labe p-0" for="female">{{$t('register.im_female')}}</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-12">
                            <span v-show="msgShow" class="text-danger">{{msg}}</span>
                        </div>
                    </div>
                    <div class="form-group mt-5">
                        <div class="col-12">
                            <p>{{$t('register.agree_role')}}
                                <router-link :to="{name: 'terms'}" style="color:#3498db;">{{$t('footer.terms')}}
                                </router-link>
                                {{$t('register.and')}}
                                <router-link :to="{name: 'privacy'}" style="color:#3498db;">{{$t('footer.privacy')}}
                                </router-link>
                            </p>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-12 col-md-6 offset-md-3">
                            <button v-if="!button_loading" class="btn btn-warning" @click="NEXT">{{$t('register.signup')}}</button>
                            <button v-if="button_loading" class="btn btn-warning" disabled><i id="btn-progress"></i>
                                    {{$t('register.loading')}}
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import exitButton from "../control/utils/exit-button.vue";
import Datepicker from 'vuejs-datepicker';

export default {
    name: 'register',

    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirm: '',
            birthdate: '2000/1/1',
            msgShow: false,
            msg: '',
            button_loading: false,
            yearList: [],
            monthList: [],
            monthDate: 1,
            yearDate: 2000,
            dayDate: 12,
            gender: null
        };
    },

    components: {
        Datepicker,
        'exit-button': exitButton
    },

    created() {
        for (let y = 1900; y < 2004; y++) {
            this.yearList.push(y);
        }

        for (let m = 1; m < 31; m++) {
            this.monthList.push(m);
        }
    },

    methods: {
        NEXT() {

            this.$validator.validateAll().then((result) => {
                if (result) {
                    var d = new Date();

                    var y = d.getFullYear();
                    if ((y - this.yearDate) <= 17) {
                        this.msgShow = true;
                        this.msg = 'wrong birthday, please add your real birthday'
                        return
                    }
                    if (this.gender == null) {
                        this.msgShow = true;
                        this.msg = 'Please select your gender'
                        return
                    }
                    this.button_loading = true;
                    axios.post( 'http://localhost:8000/api/v1/create/register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.confirm,
                        birthday: this.yearDate + '-' + this.monthDate + '-' + this.dayDate,
                        gender: this.gender,
                    }).then((response) => {
                        if (response.status === 200) {
                            // Login
                            var data = {
                                grant_type: 'password',
                                client_id: 2,
                                client_secret: this.$Helper.client_secret(),
                                username: this.email,
                                password: this.password,
                                scope: ''
                            };
                            axios.post( 'http://localhost:8000/oauth/token', data).then(res => {
                                this.$auth.setToken(res.data.access_token, res.data.expires_in, response.data.username, response.data.email, 'en', 'active');
                                this.button_loading = false;
                                window.location.href = '/subscribe'
                            });
                        }
                    }, error => {
                        this.loading = false;
                        this.msgShow = true;
                        this.msg = error.response.data.message;
                        this.button_loading = false;
                    })
                }
            });
        },
        EXIT() {
            this.$router.go(-1);
        }
    }
}
</script>
