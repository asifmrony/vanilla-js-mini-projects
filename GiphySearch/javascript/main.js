/*grab the input value*/

document.querySelector(".js-go").addEventListener('click', function(){
    var input = document.querySelector("input").value;
    pushToDOM(input);

});

document.querySelector(".js-userinput").addEventListener('keyup', function(e){
    var input = document.querySelector("input").value;
    
    /*if key ENTER is pressed*/
    if(e.which === 13){
       pushToDOM(input);
    }
    
});


/*Do the Data stuff with API*/
var url = "https://api.giphy.com/v1/gifs/trending?api_key=97Pn755rTJVRuUroLRrL8YyqnuAxlV3L&limit=25&rating=g";

//ajax request
function reqListener () {
    var response = this.response;

    /* Show me the GIFs */
    
    //convert data to object
    var dataResponse = JSON.parse(response);
    var imageURLs = dataResponse.data;
    
    imageURLs.forEach(function(images){
        var allImageUrls = images.images.fixed_height.url;
//        console.log(allImageUrls);
        var jsContainer = document.querySelector(".js-container");
        jsContainer.innerHTML += "<img src=\"" + allImageUrls + "\" class=\"container-image\">";
    })
}

var giphyRequest = new XMLHttpRequest();
giphyRequest.addEventListener("load", reqListener);
giphyRequest.open("GET", url);
giphyRequest.send();



/*Filter GIFs based on search query*/
function pushToDOM(input){
    var jsContainer = document.querySelector(".js-container");
    jsContainer.innerHTML = null;
    var apiSearchUrl = "https://api.giphy.com/v1/gifs/search?api_key=97Pn755rTJVRuUroLRrL8YyqnuAxlV3L&q="+ input +"&limit=25&offset=0&rating=g&lang=en";
    
    function showContent(){
        var response = this.response;
        var urls = JSON.parse(response);
        var data = urls.data;
        data.forEach(function(image){
            var allImages = image.images.fixed_height.url;
            console.log(allImages);
            jsContainer.innerHTML += "<img src=\""+ allImages +"\" class=\"container-image\">";
        })
        
    }
    
    var searchRequest = new XMLHttpRequest();
    searchRequest.addEventListener("load", showContent);
    searchRequest.open("GET", apiSearchUrl);
    searchRequest.send();
}

