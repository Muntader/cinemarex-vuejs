import Vue from 'vue';
import Vuex from 'vuex';
import home from './modules/home';
import player from './modules/player';
import auth from './modules/auth';
import casts from './modules/casts';
import search from './modules/search';
import collections from './modules/collections';
import category_content from './modules/category_content';
import series from './modules/series';
import kids from './modules/kids';
import tv from './modules/tv';
import event from './modules/event';

// GHost
import ghost_home from './modules/ghost/home';
import ghost_category_content from './modules/ghost/category_content';
import ghost_series from './modules/ghost/series';
import ghost_kids from './modules/ghost/kids';
import ghost_tv from './modules/ghost/tv';
import ghost_cast from './modules/ghost/casts';
import ghost_search from './modules/ghost/search';
import unique_views from './modules/unique_views';



Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    strict: false,
    modules: {
        auth,
        home,
        player,
        casts,
        search,
        collections,
        category_content,
        series,
        kids,
        tv,
        ghost_home,
        ghost_category_content,
        ghost_series,
        ghost_kids,
        ghost_tv,
        ghost_cast,
        ghost_search,
        unique_views,
        event,
    }
});
