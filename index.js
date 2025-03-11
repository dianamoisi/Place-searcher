function initMap() {
  const input = document.getElementById("autocomplete");

  const options = {
    componentRestrictions: {country: 'ro'},
    fields: ["formatted_address", "geometry", "address_components", "place_id"],
    strictBounds: false,
  };
  
  const autocomplete = new google.maps.places.Autocomplete(input, options);

  console.log(input);


  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place) {
      console.log(place);
      extractAdressComponent(place);
    }
  });
}


function extractAdressComponent(data, input) {
  let address = {addr: {}};
  address.placeID = data.place_id;
  // for(i = 0; i < data.address_components.length; i++) {
  //   address.addr[i] = data.address_components[i].long_name;
  // }

  find_fild(data, address, "street_number");
  find_fild(data, address, "route");
  find_fild(data, address, "locality");
  find_fild(data, address, "administrative_area_level_1");
  find_fild(data, address, "country");
  find_fild(data, address, "postal_code");
  
  address.lat = data.geometry.location.lat();
  address.lng = data.geometry.location.lng();

  console.log(address.placeID);
  sessionStorage.setItem("address", JSON.stringify(address));
  //adresa separata si formatata
}

function myFunction() {
  window.open("results.html");
}

function find_fild(data, address, criterium) {
  for(i = 0; i < data.address_components.length; i++) {
    const types = data.address_components[i].types; 
    for(j = 0; j < types.length; j++) {
      if(types[j] === criterium) {
        if(criterium === "street_number")
          address.street_number = data.address_components[i].long_name;
        if(criterium === "route")
          address.street = data.address_components[i].long_name;
        if(criterium === "locality")
          address.locality = data.address_components[i].long_name;
        if(criterium === "administrative_area_level_1")
          address.county = data.address_components[i].long_name;
        if(criterium === "country")
          address.country = data.address_components[i].long_name;
        if(criterium === "postal_code")
          address.postalCode = data.address_components[i].long_name;
        break;
      }
    }
  }
}