/*global Ext, describe, it*/

Ext.require('APP.mixin.Badge');

describe('APP.mixin.Badge', function () {
    var badge;

    beforeEach(function () {
        badge = Ext.create('APP.mixin.Badge');
        badge.on = function () { };        
    });

    it('registers after render event', function () {
        spyOn(badge, 'on');

        badge.init();

        expect(badge.on).toHaveBeenCalledWith('afterrender', badge.renderBadge, badge);
    });

    it('renders', function(){        
        badge.renderBadge();

        expect(badge.rendered).toBeTruthy();
    })
});