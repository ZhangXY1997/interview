function myFunction() {
    let a = { b: 2 };
    function nestedFunction() {
        console.log('Hello Nested Function!');
    }
    return { a, nestedFunction };
}

let copyOfFunction2 = new Function('return ' + myFunction.toString())();
console.log(copyOfFunction2.toString());



