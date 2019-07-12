var API_KEY = 'IbkjNrWjRoavOp7MySYUEsmQULGZYdwF'

function updateDOM() {

    var resultAmount = parseInt($("#number-articles").val());
    console.log(resultAmount)
    var pubYear = $("#pub-year").val();
    console.log(pubYear)
    var searchTerm = $("#search-term").val().trim();
    var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + '&fq=pub_year:' + pubYear + '&api-key=' + API_KEY
    console.log(queryURL)
    console.log(searchTerm)

    $.ajax({
            url: queryURL,
            method: 'GET',
        })
        .then(function (returned) {
            for (var i = 0; i < resultAmount; i++) {


                var docs = returned.response.docs

                var articleURL = docs[i].web_url;
                var articleHeadline = docs[i].headline.main
                var articleAbstract = docs[i].abstract
                var pubDate = docs[i].pub_date.substring(0,4)


                var headline = $('<h5 />', {
                    class: 'card-title'
                }).append(articleHeadline)

                var abstract = $('<div />', {
                    class: 'card-text',
                }).append(articleAbstract)

                var date = $('<div />', {
                    class: 'card-text',
                }).append(pubDate)

                var url = $('<a />', {
                    href: articleURL,
                    style: "display: block",
                    class: "my-3"                   
                })

                $('#js-results-body').prepend(url)
                $(url).append(headline, abstract, date)
          
            }
        })
}

$('#js-btn-search').on('click', function (e) {
    e.preventDefault()
    if ( $("#search-term").val() === '' ){
        $("#search-help").css("display", "block")
        return
    }
    $("#search-help").css("display", "none")
    $('#js-results-body').empty()
    
    updateDOM()
})
$('#js-btn-clear').on('click', function () {
    $('#js-results-body').empty()
    $("#search-term").val("")
    $("#number-articles").val("5")
    $("#pub-year").val("")
})