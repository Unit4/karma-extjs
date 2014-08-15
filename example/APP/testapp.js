Ext.Loader.loadScript({	
	onLoad: function () {
		Ext.application({
			inhibitLaunch: true,
			bootDependencies: [	],
			bootDependenciesThen: function () {
				
			}
		});
	}
});