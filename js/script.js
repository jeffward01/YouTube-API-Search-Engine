//Search Bar Handler
$(function () {


  var searchField = $('#query');
  var icon = $('#search-btn');


  //focus event handler
  $(searchField).on('focus', function () {
    $(this).animate({
      width: '100%'
    }, 400); //End Search Field Animate

    $(icon).animate({
      right: '10px'
    }, 400); //end icon animate
  }); //End Focus Handler


  //Blur event handler
  $(searchField).on('blur', function () {
    if (searchField.val() == '') {
      $(searchField).animate({
        width: '45%'
      }, 400, function () {}); //End searchField Animate

      $(icon).animate({
        right: '360px'
      }, 400, function () {}); //End icon animate
    } //End If statement
  }); //End Focus Handler

  $('#search-form').submit(function(e){
    e.preventDefault();
  
  })//end prevent default submit

}); //End Document Ready



function clearResults(){
     $('#results').html('');
      $('#buttons').html('')
}

function search() {
  //Clear Results
  $('#results').html('');
  $('#buttons').html('');

  //Get form input
  q = $('#query').val();

  //run GET request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      maxResults: 15,
      q: q,
      type: 'video',
      key: 'AIzaSyAsiPDs9JTtt-6sOCMdwZ_cqVmVag4yD-0'},
      function(data){
          var nextPageToken = data.nextPageToken;
          var prevPageToken = data.prevPageToken;
      
          //log data
          console.log(data);
        
          $.each(data.items, function(i, item){
              //get output
              var output = getOutput(item);
              
            //Display results
            $('#results').append(output);
          });//End Each loop;
      
          //Get Buttons
          var buttons = getButtons(prevPageToken, nextPageToken);
         
          //Display Buttons
          $('#buttons').append(buttons);
      }
  );

}

//Next Page Button function
function nextPage(){
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');
  
  //Clear Results
  $('#results').html('');
  $('#buttons').html('');

  //Get form input
  q = $('#query').val();

  //run GET request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      pageToken: token,
      maxResults: 15,
      q: q,
      type: 'video',
      key: 'AIzaSyAsiPDs9JTtt-6sOCMdwZ_cqVmVag4yD-0'},
    function(data){
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      //log data
      console.log(data);

      $.each(data.items, function(i, item){
        //get output
        var output = getOutput(item);

        //Display results
        $('#results').append(output);
      });//End Each loop;

      //Get Buttons
      var buttons = getButtons(prevPageToken, nextPageToken);

      //Display Buttons
      $('#buttons').append(buttons);
    }
  );

}

//Prev Page Button function
function prevPage(){
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');

  //Clear Results
  $('#results').html('');
  $('#buttons').html('');

  //Get form input
  q = $('#query').val();

  //run GET request on API
  $.get(
    "https://www.googleapis.com/youtube/v3/search", {
      part: 'snippet, id',
      pageToken: token,
      maxResults: 15,
      q: q,
      type: 'video',
      key: 'AIzaSyAsiPDs9JTtt-6sOCMdwZ_cqVmVag4yD-0'},
    function(data){
      var nextPageToken = data.nextPageToken;
      var prevPageToken = data.prevPageToken;

      //log data
      console.log(data);

      $.each(data.items, function(i, item){
        //get output
        var output = getOutput(item);

        //Display results
        $('#results').append(output);
      });//End Each loop;

      //Get Buttons
      var buttons = getButtons(prevPageToken, nextPageToken);

      //Display Buttons
      $('#buttons').append(buttons);
    }
  );

}






//buiild output
function getOutput(item){
  //Get input varibles from JSON
  var videoID = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;
  
  
  //Build Output String
  var output='<li>' +
      '<div class="list-left">' +
      '<img src="'+thumb+'">' +
      "</div>" +
      "<div class='list-right'>" +
      '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoID+'">'+title+'</h3>' +
      '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
      '<p>'+description+'</p>'+
      '</div>' +
      '</li>' +
      '<div class="clearfix"></div>' +
      '';
  return output;
}

//Get Buttons
function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput = '<div class="btn-container">' +
      '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
  } else {
    var btnoutput = '<div class="btn-container">' +
        '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'"' +
        'onclick="prevPage();">Prev Page</button>' +
        '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'"' +
        'onclick="nextPage();">Next Page</button></div>';
  } //End if
  return btnoutput;
}



  
  
  
