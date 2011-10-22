
$("#watched_repos").ready( function() {

    chrome.extension.sendRequest({greeting: "get_gitmarks"}, function(response) {

        var dashboard = "<div class='repos gitmarked' id='gitmarked_repos'>"
                      + "    <div class='top-bar'>"
                      + "        <h2>Gitmarked Repositories <em>("
                      + response.gitmarks.length
                      + "        )</em></h2>"
                      + "</div>"
                      + "<ul class='repo_list' id='gitmarked_repo_listing'>";

        for (var i=0; i<response.gitmarks.length; ++i) {
            var gitmark = response.gitmarks[i];

            var pieces = gitmark.split ('/');
            var owner = pieces [pieces.length - 2];
            var repo = pieces [pieces.length - 1];

            dashboard += "<li class='public source"

            if (i >= 10)
                dashboard += " gitmark-hidden' style=\"display: none;\"";
            else
                dashboard += "'";

            dashboard += ">"
                       + "<a href='" + gitmark + "'>"
                       + "<span class='owner'>" + owner + "</span>/<span class='repo'>" + repo + "</span>"
                       + "</a></li>";
        }

        dashboard += "<div class='bottom-bar'><a href=\"#\" class='show-more' id='inline-gitmarked-repos'>Show "
                  +  (response.gitmarks.length - 10)
                  +  " more repositories...</a></div>";

        $('#watched_repos').after(dashboard);

    });
});

$('#dashboard').ready(function() {
	$('#dashboard').delegate('a#inline-gitmarked-repos', 'click', function(event) {
		event.preventDefault();
		$('.gitmark-hidden').show();
		$('a#inline-gitmarked-repos').hide();
	});
});
