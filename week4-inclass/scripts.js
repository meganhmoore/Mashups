var nyTimesArticles = [];
//var flickrPhotos = [];

//function to make HTML
function makeHTML(newsObj, photoObj){
  $('#loading').empty();

  var thePhoto = photoObj.url_o || news.jpg;

  var htmlString = "<div>";
  htmlString += "<h2>" +newsObj.headline.main + "</h2>";
  htmlString += "<img src ='" + thePhoto +"' />";
  htmlString += "</div>";


  /**for(var i=0; i<nyTimesArticles.length; i++){
    var thePhoto = flickrPhotos[i].url_o || news.jpg;

    var htmlString = "<div>";
    htmlString += "<h2>" +nyTimesArticles[i].headline.main + "</h2>";
    htmlString += "<img src ='" + thePhoto +"' />";
    htmlString += "</div>";**/

    $('#main-container').append(htmlString);
//  }



}


//function to request data from flickr
function getFlickrData(nytObj){

    var keyword = "news";
    if(nytObj.keywords.length > 0){
          keyword = nytObj.keywords[0].value || "news";
    }

    var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=86a50f9515065def7725667df1f10fba&text="
    flickrURL+= keyword+"&format=json&nojsoncallback=1&extras=url_o";

    $.ajax({
      url: flickrURL,
      type: 'GET',
      datatype: 'json',
      error: function(err){
        console.log("Uh oh");
        console.log(err);
      },
      success: function(data){
        console.log("Flickr noice!");
        console.log(data);
        var flickrPhotos = data.photos.photo;
        console.log(flickrPhotos);

        makeHTML(nytObj, flickrPhotos[0]);//the HTML that we want to display in the page
      }
    });
}
//function to request data from new york times
function getNYTimesData(){
  var nyTimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=0&sort=newest&api-key=25af50719e3346e1906eda2d6c745408";

  //when you just use $. you pass in an object
  $.ajax({
    url: nyTimesURL,
    type: 'GET',
    datatype: 'json',
    error: function(err){
      console.log("Uh oh");
      console.log(err);
    },
    success: function(data){
      console.log("noice!");
      console.log(data);
      nyTimesArticles = data.response.docs;//path within the json results to pull out the array of articles
      console.log(nyTimesArticles);

      for(var i=0; i < nyTimesArticles.length; i++){
        getFlickrData(nyTimesArticles[i]);   //this approach helps to get flickr data tailored to the results from NYT
      }
    }
  });


}



//document.ready loads everything before calling document.ready
$(document).ready(function(){//selector for the pre-defined variable called document
  console.log("The document is ready!");
  getNYTimesData();//no specifics need to be defined



}) ;
