if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

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

    var currentUserName = $("div.userbox a.name").text();
    var pieces = window.location.href.split('/');
    var repoOwner = pieces[3];
    if (repoOwner.trim() == currentUserName.trim())
        return;

    var actionsChildren = actions.children("li");
    $(actionsChildren[actionsChildren.length-1]).before ("<li class='for-owner'><a href='#' class='minibutton' id='gitmark'><span class='icon' id='gitmarked_text'>Gitmark</span></a></li>");
    update_gitmarked_button();
});

$('#gitmark').ready( function() {
	$('#gitmark').click( function () {
		chrome.extension.sendRequest({greeting: "toggle_gitmark"}, function(response) {
			update_gitmarked_button ();
		}); 
		
		console.log ('sent gitmark request.');
	});
});
