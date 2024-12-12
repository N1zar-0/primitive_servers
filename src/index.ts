// 1.

function getFirstWord(a: string): number {
    return a.split(/ +/)[0].length;
}

// 2.

interface Person {
    name : string;
    surname : string;
}

interface PersonWithInit {
    fullname: string;
    initials: string;
}

function getUserNamings(a: Person): PersonWithInit {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}

// 3.

interface Product {
    name? : string;
}

function getAllProductNames(a: {products? : Product[]}): (string)[] {
    return a?.products?.map(prod => prod?.name || "") || [];
}

// 4.1

function hey1(a : {name: () => string, cuteness? : number, coolness?: number }) : string {
    return "hey! i'm " + a.name();
}

hey1({name: () => "roma", cuteness: 100})
hey1({name: () => "vasya", coolness: 100})


// 4.2

interface AbstractPet {
    name: () => string;
}

class Cat implements AbstractPet {
    catName: string;
    isNeutered : boolean;

    constructor(catName: string, isNeutered: boolean) {
        this.catName = catName;
        this.isNeutered = isNeutered;
    }

    name() : string {
        return this.catName;
    }
}

class Dog implements AbstractPet {
    dogName: string;
    wight : number;

    constructor(dogName: string, isNeutered: number) {
        this.dogName = dogName;
        this.wight = isNeutered;
    }

    name() : string {
        return this.dogName;
    }
}


function hey2(abstractPet :AbstractPet) : string {
    return "hey! i'm " + abstractPet.name();
}

let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
hey2(a)
hey2(b)


// 4.3

interface Cat1 extends AbstractPet {
    type: "cat";
    cuteness: number;
}

interface Dog1 extends AbstractPet {
    type: "dog";
    coolness: number;
}

function hey3(a: Cat1 | Dog1): string {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
hey3({name: () => "roma", type: "cat", cuteness: 100})
hey3({name: () => "vasya", type: "dog", coolness: 100})


// 5.

function stringEntries<T> (a : string[] | Record<string, T>) : string[] {
    return Array.isArray(a) ? a : Object.keys(a)
}