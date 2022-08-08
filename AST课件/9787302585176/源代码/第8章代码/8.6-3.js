function test(a, b){
	b = 2000;
	return function(){
		return a + b, a + 1000;
	}();
}