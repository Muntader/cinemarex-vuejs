import router from './Routes';

export default function (Vue) {

    Vue.helper = {
        SiteName() {
            return "http://localhost:8001";
        },
        back() {
            router.go(-1);
        },
        home() {
            router.push({name: 'discover'});
        },
        set_caption(caption) {
            localStorage.setItem('caption', caption);
        },
        client_secret() {
            return 'gf3GUnRPI6VPrgzNvUGL1O59dQ0ipCkZAZuop77t';
        },

        current_theme() {
            const theme = document.body.firstElementChild.className;
            if(theme !== undefined){
                return theme;
            }
        },

    };
    //make auth global
    Object.defineProperties(Vue.prototype, {
        $Helper: {
            get: () => {
                return Vue.helper;
            }
        }
    });
}
