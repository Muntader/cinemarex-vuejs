<template>
    <div class="c-app-settings__language">

                        <div class="row">

                            <div class="col-6 col-lg-3 col-xl-2 mt-4 p-md-1 text-center ">

                                <div class="flag" :class="{'active': active === 'en'}" @click="SET_LANGUAGE('en')">
                                    <img src="../../../../assets/default/img/flags/usa.svg" alt="usa flag" class="flag-svg" width="100%">
                                    <strong>English</strong>
                                </div>

                            </div>
                            <div class="col-6 col-lg-3 col-xl-2 mt-4 p-md-1 text-center">
                                <div class="flag" :class="{'active': active === 'fr'}" @click="SET_LANGUAGE('fr')">
                                    <img src="../../../../assets/default/img/flags/france.svg" alt="france flag" class="flag-svg" width="100%">
                                    <strong>French</strong>
                                </div>
                            </div>
                        </div>
                    </div>
</template>

<script>
    import exitButton from '../../utils/exit-button.vue';

    export default {
        data() {
            return {
                active: null,
            }
        },

        components: {
            'exit-button': exitButton,
        },

        mounted() {
            const lang = localStorage.getItem('language');
            if (lang !== null) {
                this.$i18n.locale = lang;
                this.active = lang;
            } else {
                this.active = 'en';
                this.$i18n.locale = 'en';
            }
        },
        methods: {
            SET_LANGUAGE(lang) {
                this.$i18n.locale = lang;
                this.active = lang;
                localStorage.setItem('language', lang);
                this.$store.dispatch("SET_LANGUAGE", lang);
            },
        }
    };
</script>
