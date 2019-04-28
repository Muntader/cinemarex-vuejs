import VueRouter from 'vue-router';
import ForgetChange from '@/components/auth/forget-rest';


import Discover from '@/components/control/channel';
import ChannelContent from '@/components/control/channel-content';


import Privacy from '@/components/control/footer/privacy';
import Terms from '@/components/control/footer/terms';
import ContactUs from '@/components/control/footer/contact-us';
import AboutUs from '@/components/control/footer/about-us';
import Faq from '@/components/control/footer/faq';
import NotFound from '@/components/errors/404';
import ShowMovie from '@/components/control/movie/show';
import ShowTvShow from '@/components/control/series/show';
import MySelection from '@/components/control/my-selection/index.vue';
import SeriesPlayerSP from '@/components/control/video-player/series-player';
import MoviePlayer from '@/components/control/video-player/movie-player';
import LiveTvPlayer from '@/components/control/video-player/tv-player';
import NewsPlayer from '@/components/control/video-player/news-player';

import Search from '@/components/control/search/search';
import ViewingHistory from '@/components/control/setting/components/viewing-history.vue';


let routes = [

    {
        name: 'forget_change',
        path: '/forget/rest/:code',
        component: ForgetChange,
        meta: {
            userNotAuth: true,
            title: 'Forget Password'

        }
    },

    {
        name: 'privacy',
        path: '/privacy',
        component: Privacy,
        meta: {
            allAuth: true,
            title: 'Privacy'
        }
    },
    {
        name: 'terms',
        path: '/terms',
        component: Terms,
        meta: {
            allAuth: true,
            title: 'Terms'
        }
    },
    {
        name: 'faq',
        path: '/faq',
        component: Faq,
        meta: {
            allAuth: true,
            title: 'Faq'
        }
    },

    {
        name: 'about-us',
        path: '/about-us',
        component: AboutUs,
        meta: {
            allAuth: true,
            title: 'About Us',
        }
    },

    {
        name: '404',
        path: '/404',
        component: NotFound,
        meta: {
            title: 'Not Found',
        }
    },


    {
        name: 'discover',
        path: '/',
        component: Discover,
        meta: {
            title: 'Home'
        },
    },

    {
        name: 'discover-channel',
        path: '/:ChannelName',
        component: Discover,
        meta: {
            title: 'Home'
        },
    },



    {
        name: 'my-selection',
        path: '/:ChannelName/my-selection',
        component: MySelection,
        meta: {
            userAuth: true,
            title: 'My Selection'
        },
    },

    {
        name: 'channel-content',
        path: '/:ChannelName/:CategoryName',
        component: ChannelContent,
        meta: {
            title: 'Home'
        },
    },


    {
        name: 'show-movie',
        path: '/movies/show/:id',
        component: ShowMovie,
        meta: {
            allAuth: true,
            metaTags: [{
                name: 'description',
                content: 'The about page of our example app.'
            }]
        }
    },


    {
        name: 'show-series',
        path: '/series/show/:id',
        component: ShowTvShow,
        meta: {
            allAuth: true,
            title: 'Show Series',
            metaTags: [{
                name: 'description',
                content: 'The about page of our example app.'
            }]
        },

    },


    {
        name: 'TV-Show-Player',
        path: '/watch/series/:series_id/:episode_id',
        component: SeriesPlayerSP,
        meta: {
            allAuth: true,
            title: 'Series Player'
        }
    },

    {
        name: 'news-player',
        path: '/watch/news/:id/',
        component: NewsPlayer,
        meta: {
            allAuth: true,
            title: 'News Player'
        }
    },


    {
        name: 'Movie-Player',
        path: '/watch/movie/:id',
        component: MoviePlayer,
        meta: {
            allAuth: true,
            title: 'Movie Player'

        }
    },

    {
        name: 'LiveTV-Player',
        path: '/watch/tv/:id',
        component: LiveTvPlayer,
        meta: {
            allAuth: true,
            title: 'Live TV Player'
        }
    },


    {
        name: 'search',
        path: '/app/s/search',
        component: Search,
        meta: {
            allAuth: true,
            title: 'Search'
        },
    },

    {
        name: 'viewing-history',
        path: '/setting/viewing-history',
        component: ViewingHistory,
        meta: {
            userAuth: true,
            title: 'viewing History'
        }
    }


];

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {
                x: 0,
                y: 0
            };
        }
    }
});
