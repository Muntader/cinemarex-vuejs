export default function (Vue) {

    // This is a global mixin, it is applied to every vue instance
    Vue.mixin({
        data: function() {
            return {
                get site_link() {
                    return "http://localhost:8001";
                },
                get sm_poster() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/posters/";
                },
                get md_poster() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/posters/";
                },
                get lg_poster() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/posters/";
                },
                get sm_backdrop() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/backdrops/";
                },
                get md_backdrop() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/backdrops/";
                },
                get lg_backdrop() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/backdrops/";
                },
                get sm_cast() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/casts/";
                },
                get md_cast() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/casts/";
                },
                get lg_cast() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/casts/";
                },
                get category_cdn() {
                    return "http://d33vbryzz6e7jd.cloudfront.net/categories/";
                },
                get cdn_link() {
                    return "http://d33vbryzz6e7jd.cloudfront.net";
                },

            }
        },

    })
}
