var gitmarks;

if(typeof(String.prototype.trim) === "undefined") {
    String.prototype.trim = function() {
        return String(this).replace(/^\s+|\s+$/g, '');
    };
}

function fillGitmarksList(gitmarks, showAll) {
	var html = "";
	
	for (var i=0; i<gitmarks.length; ++i) {
        var gitmark = gitmarks[i];

        var pieces = gitmark.split ('/');
        var owner = pieces [pieces.length - 2];
        var repo = pieces [pieces.length - 1];

        html += "<li class='public source";

        if (i >= 10 && showAll === false) {
            html += " gitmark-hidden' style=\"display: none;\"";
        } else {
            html += "'";
        }

        html += ">"
              + "<a href='" + gitmark + "'>"
              + "<span class='owner'>" + owner + "</span>/<span class='repo'>" + repo + "</span>"
              + "</a></li>";
    }

    $('#gitmarked_repo_listing li').remove()
	$('#gitmarked_repo_listing').html(html);
	
	if (showAll === true || (showAll === false && gitmarks.length <= 10)) {
		$('a#inline-gitmarked-repos').hide();
	} else if (showAll === false && gitmarks.length > 10) {
		$('a#inline-gitmarked-repos').show();
		$('a#inline-gitmarked-repos').html("Show " + (gitmarks.length - 10) + " more repositories…");
	}
}

$("#watched_repos").ready( function() {

    chrome.extension.sendRequest({greeting: "get_gitmarks"}, function(response) {

	    gitmarks = response.gitmarks;
	    gitmarks.reverse();
	
        var dashboard = "<div class='repos gitmarked' id='gitmarked_repos'>"
	                  + "<div class='top-bar'><h2></h2></div>"
	                  + "<div class='filter-bar' style='padding:10px;'>"
	                  + "   <div class='placeholder-field js-placeholder-field'>"
	                  + "     <label class='placeholder' for='your-gitmarks-filter' style='display: block; '>Find a repository…</label>"
	                  + "     <input type='text' id='your-gitmarks-filter' class='filter_input'>"
	                  + "   </div>"
	                  + " </div>"
	                  + "<ul class='repo_list' id='gitmarked_repo_listing'></ul>"
	                  + "<div class='bottom-bar'><a href=\"#\" class='show-more' id='inline-gitmarked-repos'></a></div>";

	    $('#watched_repos').after(dashboard);
	
		$('#gitmarked_repos').ready(function() {
	        $('#gitmarked_repos .top-bar h2').html("Gitmarked Repositories <em>(" + gitmarks.length + ")</em>");
	        fillGitmarksList(gitmarks, false);
		});
    });
});

$('#dashboard').ready(function() {

	$('#dashboard').delegate('a#inline-gitmarked-repos', 'click', function(event) {
		event.preventDefault();
		$('.gitmark-hidden').show();
		$('a#inline-gitmarked-repos').hide();
	});
	
	$('#dashboard').delegate('#your-gitmarks-filter', 'focus', function(event) {
		// workaround; placeholders don't seem to work properly on our dynamically-added <input>
		$('#gitmarked_repos .filter-bar label.placeholder').hide();
	});
	
	$('#dashboard').delegate('#your-gitmarks-filter', 'blur', function(event) {
		// workaround; placeholders don't seem to work properly on our dynamically-added <input>
		if ($('#your-gitmarks-filter').val().trim() === "")
			$('#gitmarked_repos .filter-bar label.placeholder').show();
	});
	
	$('#dashboard').delegate('#your-gitmarks-filter', 'keyup', function(event) {
		// filter repos on keypress
		var filterString = $('#your-gitmarks-filter').val().trim().toLowerCase();
		
		if (filterString === "") {
			fillGitmarksList(gitmarks, true);
		}
		
		var filteredGitmarks = new Array();
		
		gitmarks.forEach (function (gitmark) {
			var pieces = gitmark.split ('/');
	        var owner = pieces [pieces.length - 2];
	        var repo = pieces [pieces.length - 1];
	
	        if (owner.toLowerCase().indexOf(filterString) != -1 || repo.toLowerCase().indexOf(filterString) != -1)
	            filteredGitmarks.push(gitmark);
		});
		
		fillGitmarksList(filteredGitmarks, true);
	});
	
});
