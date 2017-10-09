function scoreBreakdown(data){
  if(data>0){
    if(data>0.5){
      return("Very Positive!");
    }
    else{
      return("Slightly Positive");
    }
  }else if(data < 0){
    if(data>-0.5){
      return("Slightly Negative");
    }
    else{
      return("Quite Negative");
    }
  }else{
    return("Neutral");
  }
}
function sentimentAnalysis(data, results){
  var sentimentURL = "https://twinword-sentiment-analysis.p.mashape.com/analyze/";
  console.log(sentimentURL);

  $.ajax({
    url : sentimentURL,
    headers:{
      "X-Mashape-Key": "xcjrU5u0v4mshaF0FbdmAMFfFP4dp1XpKfMjsnrHjozIhly5gT",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    data: {"text": data},
    type: 'POST',
    datatype: 'json',
    error: function(err){
      console.log("Problem with Sentiment Analysis");
      console.log(err);
    },
    success: function(data){
      var theSentiment = data.type;
      var score = data.score;
      var scoreAnalysis = scoreBreakdown(score);
      var htmlString;
      results = results.replace(/(\r\n|\n|\r)/gm, "<br />");
      if(score<0){
        htmlString="<div>This song is "+ scoreAnalysis+" it has a score of: "+score+"</div>";
        $("#answer").append(htmlString);
        htmlString = "<div>"+"\n"+(results.split("\r")) + "</div>";
        $("#negative").append(htmlString);
        htmlString="";
        $("#positive").html("");
        $("#results").empty();
        $("#neutral").html("");
      }else{
        htmlString="<div>This song is "+scoreAnalysis+" it has a score of: "+ score+"</div>";
        $("#answer").append(htmlString);
        htmlString = "<div>"+"\n"+(results.split("\r")) + "</div>";
        $("#positive").append(htmlString);
        htmlString="";
        $("#negative").html("");
        $("#results").empty();
        $("#neutral").html("");
      }
    }

  })

}
function getLyrics(artist, song){
  var songURL = "https://api.lyrics.ovh/v1/";
  var searchURL = songURL+artist+"/"+song;

  $('#results').html("");
  if(artist==null || song==null){
    $('#results').append("There was an Error, you are either missing an Artist or a Song");
  }

  $.ajax({
    url: searchURL,
    type: 'GET',
    datatype: 'jsonp',
    error: function(err){
      console.log(err);
      $("#results").append("There was an error, please try a new artist and song");
    },
    success: function(data){
      var theResults = data.lyrics;
      var newData = encodeURIComponent(theResults.trim());
      sentimentAnalysis(newData, theResults);
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
    $("#negative").html("");
    $("#positive").html("");
    $("#results").empty();
    $("#answer").empty();
    getLyrics(theArtistInput, theSongInput);
  })
})
