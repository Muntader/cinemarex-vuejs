<template>
    <div class="c-app-settings__profile">

        <div class="form-group">
            <label>{{$t('setting.name')}}</label>
            <input class="form-control" type="name" name="name"
                   v-validate="'required|min:6|max:24'"
                   :class="{'input': true, 'input-danger': errors.has('name') }"
                   v-model="name" :placeholder="$t('setting.name')">
            <span v-show="errors.has('name')" class="help text-danger">{{errors.first('name')}}
                                    </span>
        </div>

        <div class="form-group">
            <label>{{$t('setting.mail')}}</label>
            <input class="form-control" type="email" name="email" v-model="email"
                   v-validate="'required|max:50'"
                   :class="{'input': true, 'input-danger': errors.has('email') }"
                   :placeholder="$t('setting.mail')">
            <span v-show="errors.has('email')" class="help text-danger">{{errors.first('email')}}
                                    </span>
        </div>

        <div class="form-group">
            <label>{{$t('setting.birthday')}}</label>
            <input class="form-control" type="text" name="birthday" v-model="birthday"
                   v-validate="'date_format:YYYY-MM-DD'"
                   :class="{'input': true, 'input-danger': errors.has('birthday') }"
                   :placeholder="$t('setting.birthday')">
            <span v-show="errors.has('birthday')" class="help text-danger">{{errors.first('birthday')}} </span>
        </div>


        <div class="form-group" v-if="success !== null">
            <span class="text-success">{{success}}</span>
        </div>

        <div class="form-group" v-if="error !== null">
            <span class="text-danger">{{error}}</span>
        </div>
        <div class="form-group">
            <button class="btn btn-dark" @click="UPDATE_DETAILS">{{$t('setting.update')}}
            </button>
        </div>
    </div>

</template>

<script>
    import {
        mapState
    } from "vuex";
    export default {
        data() {
            return {
                name: null,
                email: null,
                birthday: null,
                success: null,
                error: null,
            };
        },

        computed: mapState({
            USER_INFO: state => state.register.UserInfo,
            IS_AUTHENTICATED: state => state.auth.IS_AUTHENTICATED
        }),

        mounted() {
            this.name = this.USER_INFO.Username;
            this.email = this.USER_INFO.Email;
            this.birthday = this.USER_INFO.Birthday;

        },

        methods: {
            UPDATE_DETAILS() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        axios.post("http://localhost:8000/api/v1/update/profile/details", {
                            name: this.name,
                            email: this.email,
                            birthday: this.birthday
                        }).then(response => {
                            if (response.status === 200) {
                                this.success = response.data.message;
                                this.error = null;
                            }
                        }, error => {
                            this.error = error.response.data.message;
                            this.success = null;
                        });
                    }
                });
            },
        }
    };
</script>
