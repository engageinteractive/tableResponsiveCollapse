var viewport = require('./viewport');

var defaults = { breakpoint: 768 },
	count = 0;

$.fn.tableResponsiveCollapse = function(settings) {

	var instanceOptions = $.extend({}, defaults, settings);

	this.each(function() {

		var $trc = $(this),
			trc,
			options = $.extend({}, instanceOptions, $trc.data());

		$trc = {
			root: $trc,
			headers: $trc.find('thead th'),
			rows: $trc.find('tbody tr')
		};

		trc = {
			updateView: function(){

				$trc.root.toggleClass(
					'table-responsive-collapse--collapsed',
					viewport.width() < options.breakpoint
				);

			}
		};

		$trc.headers.each(function() {

			var $this = $(this);

			$trc.rows
				.find('td:eq(' + $this.index() + ')')
				.prepend('<span class="faux-th">' + $this.text() + '</span>');

		});

		viewport.addListener('tableResponsiveCollapse-' + count, function(x, y) {

			if( !x ) return false;

			trc.updateView();

		});

		trc.updateView();

		count++;

	});

	return this;

};

$('.table-responsive-collapse').tableResponsiveCollapse();
