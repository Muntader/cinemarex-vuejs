<template>
    <div class="c-app-site-information">

        <div class="col-12 p-5">
            <div class="title">
                <h2> {{$t('app_name')}} {{$t('footer.terms')}}</h2>
                <hr>
            </div>
            <div v-if="data !== null">

                <div class="body" v-html="data.terms"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from "vuex";
    import exitButton from '../utils/exit-button';

    export default {
        components: {
            'exit-button': exitButton
        },
        computed: mapState({
            data: state => state.discover.STIE_INFO
        }),
        created() {
            if (this.data.length == 0 || this.data === null) {
                this.$store.dispatch("GET_HOME_FOOTER_DETAILS");
            }
        }
    };
</script>
