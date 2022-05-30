function foo() {
	let n = 0
	for (let i = 0; i < 10; i++) {
		n++
		const a = n
		setTimeout(() => console.log(a))
	}
}
foo()
