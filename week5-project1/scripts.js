//X-AYLIEN-TextAPI-20d6e4ea79edfbc779c752ce976c63f9;
//X-AYLIEN-TextAPI-013cfab0

function sentimentAnalysis(songText){
  analysisURL = "https://api.aylien.com/api/v1/sentiment?text=";
  analysisURL += songText;
  analysisURL += "&mode=document";
  console.log(analysisURL);

  $.ajaxSetup({
    //beforeSend: function(xhr){
    //  xhr.setRequestHeader('X-AYLIEN-TextAPI-Application-ID', '013cfab0''X-AYLIEN-TextAPI-Application-Key');//, '20d6e4ea79edfbc779c752ce976c63f9');
    //  xhr.setRequestHeader('X-AYLIEN-TextAPI-Application-Key', '20d6e4ea79edfbc779c752ce976c63f9');
    //}
    headers: { 'X-AYLIEN-TextAPI-Application-ID': '013cfab0',
            'X-AYLIEN-TextAPI-Application-Key': '20d6e4ea79edfbc779c752ce976c63f9'}
  });

  $.ajax({
    //headers: {
      //'X-AYLIEN-TextAPI-Application-ID': '013cfab0',
      //'X-AYLIEN-TextAPI-Application-Key': '20d6e4ea79edfbc779c752ce976c63f9'
    //},
    url: analysisURL,
    type: 'GET',
    datatype:'json',
    error: function(err){
      console.log("Problem");
      console.log(err);
    },
    success: function(data){
      console.log("noice");
      console.log(data);
    }

  })

  //var AYLIENTextAPI = require('aylien_textapi');

  //var textapi = new AYLIENTextAPI({
  //    application_id: "013cfab0",
  //    application_key: "20d6e4ea79edfbc779c752ce976c63f9"
  //});

}

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
      var newData = encodeURIComponent(theResults.trim())
      var htmlString = "<div>" + theResults + "</div";
      $("#results").append(htmlString);
      sentimentAnalysis(newData);
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
