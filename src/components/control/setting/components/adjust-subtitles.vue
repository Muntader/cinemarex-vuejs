<style scoped>
    .vc-chrome {
        position: absolute;
        z-index: 1;
    }
</style>

<template>
    <div class="c-app-settings__adjust-subtitle">

        <div class="form-group">
            <div class="btn-group">

                    <div class="dropdown">
                        <button class="btn btn-dark" id="dropdownFontSize" data-toggle="dropdown" aria-haspopup="true"  @click="ShowDropdownFontSize = !ShowDropdownFontSize"
                                aria-expanded="false">{{$t('setting.font_size')}}
                        </button>

                        <div class="dropdown-menu dropdown-menu-right" v-if="ShowDropdownFontSize">
                            <li class="dropdown-item" @click="caption_style.fontSize = '15px'">25%</li>
                            <li class="dropdown-item" @click="caption_style.fontSize = '20px'">50%</li>
                            <li class="dropdown-item" @click="caption_style.fontSize = '25px'">75%</li>
                            <li class="dropdown-item" @click="caption_style.fontSize = '30px'">100%</li>
                        </div>
                    </div>


                <div class="ml-3">

                    <div class="dropdown">
                        <button class="btn btn-dark" id="dropdownFontWeight" data-toggle="dropdown" aria-haspopup="true" @click="ShowDropdownFontWeight = !ShowDropdownFontWeight"
                                aria-expanded="false">{{$t('setting.font_weight')}}
                        </button>

                        <div class="dropdown-menu dropdown-menu-right" v-if="ShowDropdownFontWeight">
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 0">0</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 10">10</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 20">20</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 30">30</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 40">40</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 50">50</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 60">60</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 70">70</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 80">80</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 90">90</li>
                            <li class="dropdown-item" @click="caption_style.backgroundOpacity = 100">100</li>
                        </div>
                    </div>
                </div>
                <div class="ml-3">
                    <button class="btn btn-dark" @click="SHOW_FONT_PICKER">{{$t('setting.font_color')}}</button>
                    <chrome-picker v-if="show_font_picker" v-model="colors_font"/>
                </div>
                <div class="ml-3">
                    <button class="btn btn-dark" @click="SHOW_BACKGROUND_PICKER">{{$t('setting.font_backgrond')}}
                    </button>
                    <chrome-picker v-if="show_background_picker" v-model="colors_background"/>
                </div>
            </div>
        </div>
        <div class="form-group" style="position: relative;">
            <div style="text-align: center;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: normal;font-stretch: normal;line-height: normal;font-family: sans-serif;white-space: pre-line;position: relative; direction: ltr;writing-mode: horizontal-tb;    left: 0px;
    bottom: 0;
    top: 0;
    right: 0px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.71);">
                <p :style="caption_style">Do not go gentle into that good night. Rage, rage against the dying of the
                    light</p>
            </div>
        </div>
        <div class="form-group">
            <button class="btn btn-dark" @click="CHANGE">{{$t('setting.update')}}</button>
        </div>
    </div>

</template>

<script>
    import {Chrome} from 'vue-color';
    import exitButton from '../../utils/exit-button.vue';
    const alertify = require('alertify.js');

    export default {
        data() {
            return {
                colors_font: {
                    hex: '#ffffff',
                    hsl: {
                        h: 150,
                        s: 0.5,
                        l: 0.2,
                        a: 1
                    },
                    hsv: {
                        h: 150,
                        s: 0.66,
                        v: 0.30,
                        a: 1
                    },
                    rgba: {
                        r: 25,
                        g: 77,
                        b: 51,
                        a: 1
                    },
                    a: 1
                },
                colors_background: {
                    hex: '#194d33',
                    hsl: {
                        h: 150,
                        s: 0.5,
                        l: 0.2,
                        a: 1
                    },
                    hsv: {
                        h: 150,
                        s: 0.66,
                        v: 0.30,
                        a: 1
                    },
                    rgba: {
                        r: 25,
                        g: 77,
                        b: 51,
                        a: 1
                    },
                    a: 1
                },
                show_font_picker: false,
                show_background_picker: false,
                ShowDropdownFontSize: false,
                ShowDropdownFontWeight: false,
                caption_style: {
                    position: 'relative',
                    left: '0',
                    bottom: '0',
                    fontSize: '15px',
                    color: '#fff',
                    width: '90%',
                    top: '40px',
                    display: 'inline',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    backgroundOpacity: '0',
                    fontWeight: '500',
                }
            }
        },

        components: {
            'exit-button': exitButton,
            'chrome-picker': Chrome,
        },

        watch: {
            colors_font() {
                this.caption_style.color = this.colors_font.hex;
            },
            colors_background() {
                this.caption_style.backgroundColor = 'rgba(' + this.colors_background.rgba.r + ',' + this.colors_background
                    .rgba.g + ',' + this.colors_background.rgba.b + ',' + this.colors_background.rgba.a + ')';
            },
        },

        methods: {
            CHANGE() {
                const caption = {
                    'fontSize': this.caption_style.fontSize,
                    'backgroundColor': this.caption_style.backgroundColor,
                    'color': this.caption_style.color,
                    'backgroundOpacity': this.caption_style.backgroundOpacity
                };
                localStorage.setItem('caption', JSON.stringify(caption))

                alertify.logPosition('top right');
                alertify.success('Successful change caption');
            },

            SHOW_FONT_PICKER() {
                this.show_font_picker = !this.show_font_picker;
            },
            SHOW_BACKGROUND_PICKER() {
                this.show_background_picker = !this.show_background_picker;
            }
        }
    };
</script>
