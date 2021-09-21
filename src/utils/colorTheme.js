import {reactive} from "vue";

let isInited = false;

class ColorTheme {
    themeIsDark = false;

    constructor(val) {
        if (isInited) {
            throw Error();
            return;
        }
        isInited = true;
        if (val !== undefined) {
            this.themeIsDark = val;
            return;
        }
        this.themeIsDark = !!JSON.parse(localStorage.getItem('color-theme'));
        this.updateLSVal();
    }

    updateLSVal() {
        localStorage.setItem('color-theme', JSON.stringify(this.themeIsDark));
        const body = document.body;
        this.themeIsDark ? body.classList.add('dark-theme') : body.classList.remove('dark-theme');
    }

    toggleTheme() {
        this.themeIsDark ? this.disableDarkTheme() : this.enableDarkTheme();
    }

    enableDarkTheme() {
        this.themeIsDark = true;
        this.updateLSVal();
    }

    disableDarkTheme() {
        this.themeIsDark = false;
        this.updateLSVal();
    }
}

export default reactive(new ColorTheme());