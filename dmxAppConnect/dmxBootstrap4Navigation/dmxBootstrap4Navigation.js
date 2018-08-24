jQuery(document).ready(function($){
	var url = window.location.href;
	$('a.nav-link').map(function() {
 		$(this).toggleClass('active', this.href == url || this.href == url.split("?")[0].split("#")[0]);
	});
});