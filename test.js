function foo(...args) {
    console.log(args)
    return function (b) {
        return function (c) {
            return b + c
        }
    }
}

console.log(foo(1)(2)(3)(4)(5)(6)(7))
