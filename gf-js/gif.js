//Variable to vreate array for inital buttonson page//

var buttons = ["dog", "cat", "bird", "fish", "kangaroo"];

//Render button function//
function renderButtons() {

    //Emptying the button area div//
    $("#button-area").empty();

    //For loop to run through the array of buttons//
    for (var i = 0; i < buttons.length; i++) {

        //jQuery to add the buttons to the page//
        var b = $("<button>");

        //Adding a class the buttons//
        b.addClass("gif-buttons");

        //adding the data attribute//
        b.attr("data-name", buttons[i]);

        //providing the button text for initial buttons//
        b.text(buttons[i]);

        $("#button-area").append(b);


    };

};

//On click event for when buttons are clicked//
$(document).on("click", ".gif-buttons", function() {
    var type = $(this).data("name");
    //API Query//
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dFUDrUhVNLX4XGUzOxgqZLF2lbBnGwUA&limit=10";
    
    //API call//
    $.ajax({
        url:queryURL, 
        method: "GET"
    }).then(function(response) {

            console.log(response);
            //For Loop for the response data//
            for(var i = 0; i < response.data.length; i++);

            //creating a new div for the search items to go into//
            var searchDiv = $("<div class='search-items'>");

            //created variable to store rating data from response//
            var rating = response.data[i].rating;

            //creating a <p> ellement in the div to place the ratings into//
            var p = $("<p>").text("Rating: " + rating);

            //variable for both still and animated//
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].image.fixed_height.url;

            //creating image ellement to dump the gifs into//
            var image = $("<img>");

            //creating the still version of the gif first//
            image.attr("src", still);
            image.attr("data-still", still);

            //creating the animated version of the gif//
            image.attr("data-animated", animated);

            //still version will appear on the page first//
            image.attr("data-state", "still");

            //appending the rating/image to the search div//
            searchDiv.append(p);
            searchDiv.append(image);

            //appending everything to the gif-searches div in the html//
            $("#gif-searches").append(searchDiv);

        });


    console.log(type);
});

//Click event for adding new buttons to our array//
$("#addButtons").on("click", function(event) {
    event.preventDefault();

    //grabs the input from the text box//
    var newButton = $("seach-input").val().trim();

    //adding our new search to the buttons array//
    buttons.push(newButton);

    //calling the render buttons fucntion to run through the array and render original and new buttons//
    renderButtons();


})

//calling render buttons function to show initial buttons on page//
renderButtons();
