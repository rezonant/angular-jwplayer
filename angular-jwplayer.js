'use strict';
angular.module('angular-jwplayer', []).directive('jwplayer', [ '$timeout', function ($timeout) {

	var defaultProps = {
		id : 'angular-jwplayer-' + Math.floor((Math.random()*999999999)+1)
	};

	return {
		restrict: 'EC',
		scope: {
			id: '@id',
			setupVars: '=setup'

		},

		template: '<div class="root"></div>',

		link: function(scope, element, attrs) {
			var el = element.find('.root');
			el.attr('id', el.id = defaultProps.id);

			var unbind = scope.$watch('setupVars', function() {
				if (!scope.setupVars)
					return; // wait until we're ready

				unbind();
				$(document).ready(function() {
					var player = jwplayer(el.id);
					var setupVars = scope.setupVars ? scope.setupVars : {};
					
					player.setup(setupVars);
					
					if (setupVars.onStart)
						setupVars.onStart(player);
					
				});
			});
		}
	};
}]);
