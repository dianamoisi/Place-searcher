let data = undefined;
const key = "AIzaSyDm1cRnvMQDnIgS0Elivy7qFv0D9SoORDI";
let photos_URL = [];
let change1 = false;
let change2 = false;

document.addEventListener("DOMContentLoaded", (event) => {
    extractSessionStorageObject();
    getPlaceDetails();
    changeSpinner();
});

function extractSessionStorageObject() {
    let storedData = sessionStorage.getItem("address");
    if (storedData) {
        data = JSON.parse(storedData);
        // sessionStorage.removeItem("address");
    }
}

function getPlaceDetails() {
    const url = "https://places.googleapis.com/v1/places/" + data.placeID + "?fields=id,displayName,photos&key=" + key;
    fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error("Could not fetch details");
            }
            return response.json();
        })
        .then(details => {
            console.log(details);
            //displayName(details.displayName.text);  loading speener
            for(let i = 0; i < details.photos.length; i++) {
                getOnePhoto(details.photos[i].name, i);
            }  
        })
        .catch(error => console.log(error));
        console.log(photos_URL);
        change1 = true;
}

function getOnePhoto(name, i) {
    const url = "https://places.googleapis.com/v1/" +  name + "/media?key=" + key + "&maxHeightPx=400&maxWidthPx=400";
    fetch(url)
    .then(response => {
        if(!response.ok) {
            throw new Error("Could not fetch details");
        }
        return response;
    })
    .then(details => {
        photos_URL[i] =  details.url.toString();
        let theClassName = "";
        if(i === 0) {
            theClassName = "carousel-item active";
        } else {
            theClassName = "carousel-item"
        }
        createCarouselSlides(photos_URL[i], theClassName);
        // showImage(photos_URL[i], parent);
    })
    .catch(error => console.log(error));
}

function showImage(img_src, parent) {
    var image = document.createElement("img");
    var imageParent = document.getElementById(parent);
    image.id = "id";
    image.className = "class p-3";
    image.src = img_src;            // image.src = "IMAGE URL/PATH"
    imageParent.appendChild(image);
    //document.getElementById("picture").src = photos_URL[0];
}

function createCarouselSlides(img_src, name) {
    var image = document.createElement("img");
    var item = document.createElement("div");
    item.className = name;
    
    var itemParent = document.getElementById("carouselExampleSlidesOnly").childNodes[1];
    console.log(itemParent);

    image.className = "d-block w-100";
    image.src = img_src;

    itemParent.appendChild(item);
    item.appendChild(image);
}

// function displayName(name) {
//     var h3 = document.createElement("h3");
//     var h3Parent = document.getElementById("place-overview");
//     h3.innerHTML = name;    
//     h3Parent.appendChild(h3);
// }

function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: data.lat, lng: data.lng },
        zoom: 13,
        mapTypeControl: false,
    });

    const marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(data.lat, data.lng),
        map: map,
        //anchorPoint: new google.maps.Point(0, -29),
    });
}

function changeSpinner() {
    if(change1 === true) {
        setTimeout(() => { 
            document.getElementById("speener").className = "d-none justify-content-center";
        }, 1500);
    }
}