(function(){
	var karmaLoadedFunction = window.__karma__.loaded,
		Ext4Ready = false,
		Ext6Ready = false;

	window.__karma__.loaded = function(){};

	if(typeof Ext !== 'undefined'){
		Ext.onReady(function () {
			Ext4Ready = true;
		});
	} else {
		Ext4Ready = true;
	}  

	if(typeof Ext6 !== 'undefined'){
		Ext6.onReady(function () {
			Ext6Ready = true;
		});
	} else {
		Ext6Ready = true;
	}

	function launchTests() {

		if(Ext4Ready && Ext6Ready){
			window.__karma__.loaded = karmaLoadedFunction;
			window.__karma__.loaded();
		} else {
			setTimeout(function () {
				launchTests();
			}, 200);
		}
	}

	launchTests();
}());