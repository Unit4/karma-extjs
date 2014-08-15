/*global Ext*/

/**
* A badge mixin 
*/
Ext.define('APP.mixin.Badge', {
    /**
    *    
    */
    init: function () {
        var me = this;

        me.on('afterrender', me.renderBadge, me);
    },    

    /**
    * @private    
    **/
    renderBadge: function () {
        var me = this;        
        me.rendered = true;
    }
});
