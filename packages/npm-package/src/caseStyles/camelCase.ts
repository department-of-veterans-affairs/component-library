export const toUpperCamelCase = (text:string): string =>{

    if (!text) { return '';}
    const words = text.match(/[a-z]+/gi);
    if (!words) { return '';}
    return words
        .map((word)=> word
            .charAt(0)
            .toUpperCase()
            .concat(word.substring(1).toLowerCase()))
            .join('');
};

export const toLowerCamelCase = (text:string): string =>{
    const upperCamelCaseWord = toUpperCamelCase (text);
    if (!upperCamelCaseWord) { return '';}
    return upperCamelCaseWord
        .charAt(0)
        .toLocaleLowerCase()
        .concat(upperCamelCaseWord.substring(1));
};

export const  inni = ()=> console.log("hi, thanksgiving, there!");