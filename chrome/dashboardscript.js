
$("#watched_repos").ready (function () {

    chrome.extension.sendRequest({greeting: "get_gitmarks"}, function(response) {

        var dashboard = "<div class='repos gitmarked' id='gitmarked_repos'>               \
            <div class='top-bar'>                                                         \
               <h2>Gitmarked Repositories <em>" + response.gitmarks.length + "</em></h2>   \
            </div>                                                                        \
            <ul class='repo_list' id='gitmarked_repo_listing'>";

        response.gitmarks.forEach (function (gitmark) {
	    var pieces = gitmark.split ('/');
            var owner = pieces [pieces.length - 2];
	    var repo = pieces [pieces.length - 1];
            dashboard += "<li class='public source'>\n";
            dashboard += "<a href='" + gitmark + "'>\n";
	    dashboard += "<span class='owner'>" + owner + "</span>/<span class='repo'>" + repo + "</span>\n";
	    dashboard += "</a></li>\n";
        });

        dashboard += "<div class='bottom-bar'> </div>";

        $('#watched_repos').after (dashboard);
   });
});