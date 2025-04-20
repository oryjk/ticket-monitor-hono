import "./a.ts";
import "./b.ts";

const person = "Mike";
const age = 28;
function myTag(strings: TemplateStringsArray, personExp: any, ageExp: any) {
    const str0 = strings[0];
    const str1 = strings[1];
    const str2 = strings[2];

    return `hahahahha ${str0}${personExp}${str1}${ageExp}${str2}`;
}

console.log(myTag`Hello ${person}! I am ${age}.`);
