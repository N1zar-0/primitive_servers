"use strict";
// 1.
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map(prod => (prod === null || prod === void 0 ? void 0 : prod.name) || "")) || [];
}
// 4.1
function hey1(a) {
    return "hey! i'm " + a.name();
}
hey1({ name: () => "roma", cuteness: 100 });
hey1({ name: () => "vasya", coolness: 100 });
class Cat {
    constructor(catName, isNeutered) {
        this.catName = catName;
        this.isNeutered = isNeutered;
    }
    name() {
        return this.catName;
    }
}
class Dog {
    constructor(dogName, isNeutered) {
        this.dogName = dogName;
        this.wight = isNeutered;
    }
    name() {
        return this.dogName;
    }
}
function hey2(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
hey2(a);
hey2(b);
function hey3(a) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness));
}
hey3({ name: () => "roma", type: "cat", cuteness: 100 });
hey3({ name: () => "vasya", type: "dog", coolness: 100 });
// 5.
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
