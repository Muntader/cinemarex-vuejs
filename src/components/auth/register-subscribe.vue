<template>
<div class="my-subscription">
    <div class="loader" v-if="spinner_load">
        <loader></loader>
    </div>

    <div class="subscribe-settings" v-else>

        <div class="col-12 col-sm-8 col-lg-6 offset-sm-2 offset-lg-3 intro">
            <h3>{{$t('register.sub_title')}}</h3>
            <p>
                {{$t('register.sub_desc')}}
            </p>
        </div>

        <div class="col-12 mt-5">
            <div class="genre">
                <strong @click="selectList = 'movie'" :class="{active : selectList == 'movie'}">{{$t('home.movies')}}</strong>
                <strong @click="selectList = 'series'" :class="{active : selectList == 'series'}">{{$t('home.series')}}</strong>
            </div>
        </div>

        <div class="note">
            <p>{{$t('register.sub_note')}}</p>
        </div>

        <div class="list-of-genres">
            <div class="row">
                <div class="col-6 col-sm-4 col-md-4 mt-3" v-for="(item, index) in data" :key="index" v-if="item.kind == selectList">
                    <div class="item">
                        <div class="backdrop">
                            <progressive-img :src="site_link + item.image" placeholder="../../../assets/default/img/loader-image.png" :alt="item.name" width="100%" />
                            <div class="genre-name">
                                {{item.name}}
                            </div>
                        </div>

                        <div class="follow m-3">
                            <button class="btn btn-secondary" @click="ADD_SUB(item.id)" v-if="! subscription.includes(item.id)">{{$t('register.sub_follow')}}</button>
                            <button class="btn btn-success" @click="REMOVE_SUB(item.id)" v-if="subscription.includes(item.id)">{{$t('register.sub_following')}}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="last-step mt-5">
            <button class="btn btn-lg btn-secondary" v-if="firstSignup && !button_loading" @click="NEXT()">{{$t('register.sub_button')}}</button>
            <button class="btn btn-lg btn-secondary" v-if="!firstSignup && !button_loading" @click="NEXT()">{{$t('setting.update')}}</button>
            <button class="btn btn-lg btn-secondary" v-if="button_loading" disabled>
<i id="btn-progress"></i>
{{$t('register.loading')}}
           </button>
        </div>
    </div>
</div>
</template>

<script>
import loader from "../control/utils/loader";

export default {
    name: 'subscriptions',

    data() {
        return {
            data: [],
            subscription: [],
            selectList: 'movie',
            firstSignup: true,
            spinner_load: true,
            button_loading: false
        };
    },
    components: {
        loader
    },
    created() {
        axios.get('http://localhost:8000/api/v1/get/register/genres')
            .then(response => {
                this.spinner_load = false;
                this.data = response.data.data.categories;
                if (response.data.data.user_subscribe !== null) {
                    this.subscription = JSON.parse(response.data.data.user_subscribe.categories)
                    this.firstSignup = false;
                } else {
                    this.firstSignup = true;
                }
            }, err => {
                console.log('error in request')
            })
    },

    methods: {
        NEXT() {
            this.button_loading = true;
            axios.post('http://localhost:8000/api/v1/create/register/subscribe', {
                    subscription: this.subscription
                })
                .then(response => {
                    this.button_loading = false;
                    window.location.href = '/'
                }, err => {
                    console.log('error in request')
                })
        },

        REMOVE_SUB(id) {
            for (let index = 0; index <= this.subscription.length; index++) {
                if (this.subscription[index] == id) {
                    this.subscription.splice(index, 1);
                }

            }
        },

        ADD_SUB(id) {
            this.subscription.push(id);
        }
    }
}
</script>
