
function update_gitmarked_button () {
    chrome.extension.sendRequest({greeting: "is_page_gitmarked"}, function(response) {
	if (response.page_is_gitmarked)
	    $('#gitmarked_text').html ('Ungitmark');
	else
	    $('#gitmarked_text').html ("Gitmark");
    }); 
}

$('.actions').ready (function () {
    var actions = $('.actions');
    if (!actions || !actions.children)
	return;
    if ($(actions.children ("li") [0]).hasClass ('for-owner'))
	return;
    $(actions.children ("li") [2]).before ("<li class='for-owner'><a href='#' class='minibutton' id='gitmark'><span class='icon' id='gitmarked_text'>Gitmark</span></a></li>");
    update_gitmarked_button ();
});

$(document).ready( function() {
	$('#gitmark').click (function () {
		chrome.extension.sendRequest({greeting: "toggle_gitmark"}, function(response) {
			update_gitmarked_button ();
		}); 
		
		console.log ('sent gitmark request.');
	});
});