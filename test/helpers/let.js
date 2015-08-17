/* global beforeEach : false */
/* jshint node : true */
(function(){
	'use strict';
	beforeEach(function(){
		this.let_ = function let_(propName, initializerFn){
			var _lazy;

			Object.defineProperty(this, propName, {
				get : function(){
					if(!_lazy){
						_lazy = initializerFn.call(this);
					}

					return _lazy;
				},
				set : function(){},
				enumerable : true,
				configurable : true
			});
		};
	});
})();
