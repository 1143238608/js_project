function test(a){
	return function(){
		return a + 1000;
	}();
}