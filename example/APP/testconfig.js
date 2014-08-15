/*global window*/

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'APP': 'http://' + window.location.host + '/base/APP/src'        
    },
    disableCaching: true
});