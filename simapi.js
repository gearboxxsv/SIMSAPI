var searchRequest = null;
$(function () {
    var minlength = 3;

    $(".searchBarTxt").keyup(function () {
        var that = this,
            value = $(this).val();

        if (value.length >= minlength) {
            if (searchRequest != null)
                searchRequest.abort();
            $('.searchResults').html('Searching...');
            searchRequest = $.ajax({
                type: "POST",
                url: "#SEARCH",
                data: {
                    'SEARCHTERM': value
                },
                dataType: "text",
                success: function (data) {

                    $('.searchResults').html('');
                    //we need to check if the value is the same
                    console.log(data);

                    JSON.parse(data).forEach(function (item) {
                        if (item.typeObject === "scrapedSite") {

                            $('.searchResults').append('<div>!!<img src=' + item.websiteData.image + ' width=400><br><img src=' + item.websiteData.favicon + ' ><br>' + item.websiteData.title + ' <br> ' + item.websiteData.text + ' <br> <a href=' + item.url + ' target="_new">View Original</a><br><hr> </div>');


                        } else {
                            $('.searchResults').append('<div><h3>Incident Report</h3>' + item.description + ' <br> <hr> </div>');

                            if (typeof item.urls === "object") {
                                item.urls.forEach(function (aurl) {
                                    console.log(data);

                                    $('.searchResults').append('<div><li><a href=' + aurl + ' target=_NEW>  ' + aurl + ' </a> </li> </div>');

                                });
                            }

                        }

                    });

                }
            });
        } else {
            $('.toolbarCanvas').html('');
        }
    });
});


