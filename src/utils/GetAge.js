import moment from "moment";

const langMap = {
    ru: (age) => {
        let lastSymbol = age.toString();
        lastSymbol = lastSymbol[lastSymbol.length - 1];
        switch (true) {
            case ['2', '3', '4'].includes(lastSymbol):
                return `${age} года`;
                break;
            case ['0', '5', '6', '7', '8', '9'].includes(lastSymbol):
                return `${age} лет`;
                break;
            default:
                return `${age} год`;
                break;
        }
    },
    en: (age) => {
        return `${age}`;
    }
}


function getAge(lang) {
    const age = moment().diff(moment('1996-12-18'), 'year');
    return langMap[lang](age);
}

export default getAge;
