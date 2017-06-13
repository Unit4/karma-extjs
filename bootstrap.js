(function(){
	var karmaLoadedFunction = window.__karma__.loaded,
		Ext4Ready = false,
		Ext6Ready = false;

	window.__karma__.loaded = function(){};

	if(Ext){
		Ext.onReady(function () {
			Ext4Ready = true;
		});
	} else {
		Ext4Ready = true;
	}  

	if(Ext6){
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