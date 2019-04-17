import Vue from 'vue';
import Vuex from 'vuex';
import discover from './modules/home';
import player from './modules/player';
import auth from './modules/auth';
import register from './modules/register';

import casts from './modules/casts';
import search from './modules/search';
import collections from './modules/collections';
import category_content from './modules/category_content';
import series from './modules/series';
import kids from './modules/kids';
import tv from './modules/tv';
import event from './modules/event';

// GHost
import unique_views from './modules/unique_views';



Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    strict: false,
    modules: {
        auth,
        register,
        discover,
        player,
        casts,
        search,
        collections,
        category_content,
        series,
        kids,
        tv,
        unique_views,
        event,
    }
});
