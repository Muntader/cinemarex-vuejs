<template>
    <div class="c-app-settings__security">

        <div class="form-group">
            <label>{{$t('setting.current')}}</label>
            <input class="form-control" type="password" name="current" v-validate="'min:8|required'"
                   :class="{'input': true, 'input-danger': errors.has('current') }"
                   v-model="current" :placeholder="$t('setting.current')" autocomplete="off">
        </div>

        <div class="form-group">
            <label>{{$t('setting.password')}}</label>
            <input class="form-control" type="password" name="password"
                   ref="passwordRef"
                   v-validate="'min:8|required'"
                   :class="{'input': true, 'input-danger': errors.has('password') }"
                   v-model="password"
                   :placeholder="$t('setting.password')">
        </div>

        <div class="form-group">
            <label>{{$t('setting.password_confirm')}}</label>
            <input class="form-control" type="password" name="password_confirmation"
                   v-validate="'min:8|required|confirmed:passwordRef'"
                   :class="{'input': true, 'input-danger': errors.has('password') }"
                   v-model="confirm"
                   :placeholder="$t('setting.password_confirm')" data-vv-as="password">
            <span v-show="errors.has('password')" class="help text-danger">{{ errors.first('password')}}</span>
        </div>

        <div class="form-group" v-if="success">
            <span class="text-success">{{$t('setting.successful_update')}}</span>
        </div>

        <div class="form-group">
            <button class="btn btn-dark" @click="CHANGE_PASSWORD">{{$t('setting.update')}}
            </button>
        </div>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                current: "",
                password: "",
                confirm: "",
                success: ""
            };
        },

        methods: {
            CHANGE_PASSWORD() {
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.$store.dispatch("UPDATE_PASSWORD", {
                            current_password: this.current,
                            password: this.password,
                            password_confirmation: this.confirm
                        });
                    }
                });
            }
        }
    };
</script>
