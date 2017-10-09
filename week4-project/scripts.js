function getLyrics(artist, song){
  var songURL = "https://api.lyrics.ovh/v1/";
  var searchURL = songURL+artist+"/"+song;
  console.log(searchURL);

  $('#results').html("");

  $.ajax({
    url: searchURL,
    type: 'GET',
    datatype: 'jsonp',
    error: function(err){
      console.log("Problem");
      console.log(err);
      $("#results").append("There was an error, please try a new artist and song");
    },
    success: function(data){
      console.log("noice");
      console.log(data);
      var theResults = data.lyrics;
      console.log(theResults.lyrics);
      var htmlString = "<div>" + theResults + "</div";
      $("#results").append(htmlString);
    }
  });
}
$(document).ready(function(){
  $("#theButton").click(function(){
    console.log("The Artist Button was pressed");

    var theArtistInput = $('#theArtistInput').val();
    console.log(theArtistInput);

    var theSongInput = $('#theSongInput').val();
    console.log(theSongInput);

    getLyrics(theArtistInput, theSongInput);
  })
})
