import {
  appendCarousel,
  clear,
  createCarouselItem,
  start,
} from "./Carousel.js";

// import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY =
  "live_8b33Tbbh1l2zGjrqbNr4NmbIMV3g44L6KciAWae711XZJ3j5a7uuw0QIhm58fmpW";


/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */

async function initialLoad() {
  try {
    // Retrieve a list of breeds from the cat API using fetch().
    const response = await fetch("https://api.thecatapi.com/v1/breeds");

    // Check if the response was successful
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    const catBreeds = await response.json();

    // Loop through the array of cat breeds
    for (const breed of catBreeds) {
      // Create new <options> for each of these breeds, and append them to breedSelect.
      const option = document.createElement("option");

      // Each option should have a value attribute equal to the id of the breed.
      option.textContent = breed.name;
      option.value = breed.id;

      // Append the option to the select element
      breedSelect.appendChild(option);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
  GetBreedID()
}

// Call the async function to start the process
initialLoad();

/**
 * 2. Create an event handler for breedSelect that does the following:
 * - Retrieve information on the selected breed from the cat API using fetch().
 *  - Make sure your request is receiving multiple array items!
 *  - Check the API documentation if you're only getting a single object.
 * - For each object in the response array, create a new element for the carousel.
 *  - Append each of these new elements to the carousel.
 * - Use the other data you have been given to create an informational section within the infoDump element.
 *  - Be creative with how you create DOM elements and HTML.
 *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
 *  - Remember that functionality comes first, but user experience and design are important.
 * - Each new selection should clear, re-populate, and restart the Carousel.
 * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
 */
async function GetBreedID(event) {
  const breedInfo = await fetch(
    "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=" +
      breedSelect.value,
    {
      headers: {
        "x-api-key":
          "live_v4LgSc6W6TRn00ApEOIBqcOGWh5KmjRKsIRWHKKJB9fypDHSCiawuUKniUHDKDls",
      },
    }
  );

  const holdInfo = await breedInfo.json();
  console.log(holdInfo);
  holdInfo.forEach(function (breed) {
    let item = createCarouselItem(breed.url, "cat", breed.id);
    let description = breed.breeds[0].description
    // let adaptability = breed.breeds[0].adaptability
    // let child_friendly = breed.breeds[0].child_friendly
    console.log(description);
    infoDump.innerHTML = `<p>Description: ${description}</p>` //`<p>Adaptability: ${a}</p>`  `<p>Child Friendly: ${c}</p>` 
    appendCarousel(item);
    console.log(item);
  });
}

breedSelect.addEventListener("change", GetBreedID);



/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */


async function infodata() {
  const response = await axios.get("/breeds");
  const breedData = response.data;
  //console.log(breedData);

  breedData.forEach((breed) => {
    const options = document.createElement("option");
    //console.log(options);
    breedSelect.appendChild(options);
    options.value = breed.id;
    options.textContent = breed.name;
  });
  GetBreedID()
}
initialLoad();

breedSelect.addEventListener("change", GetBreedID);

async function GetBreedID1() {
  const breedId = breedSelect.value;
  //console.log(breedId);
  const response = await axios.get("/images/search", {
    params: {
      breed_ids: breedId,
      limit: 10,
      has_breeds: 1,
    },
    //Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
    onDownloadProgress: updateProgress,
  });
  let data = response.data;
  console.log(response.status);
  clear()

  for (let i = 0; i < data.length; i++) {
    console.log(data);
    const img = document.createElement("img");
    console.log(data[i].url);
    const carouselItem = createCarouselItem(data[i].url, breedId, data[i].id);
    let d = data[i].breeds[0].description;
    let a = data[i].breeds[0].adaptability;
    let c = data[i].breeds[0].child_friendly;

    let description = breed.breeds[0].description
    console.log(description);
    infoDump.innerHTML = `<p>Description: ${d}</p>`   `<p>Adaptability: ${a}</p>`    `<p>Child Friendly: ${c}</p>` 
    appendCarousel(item);
  }
  start()
}



/**
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */

axios.defaults.baseURL = "https://api.thecatapi.com/v1";
axios.defaults.headers.common["x-api-key"] = API_KEY;
axios.interceptors.request.use(function (config) {
  console.log(config);
    // Do something before request is sent
    return config;
  }
);
axios.interceptors.response.use(function (config) {
  console.log(config);
    // Do something before request is sent
    return config;
  }
);
axios.get('/breeds')


/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

function updateProgress(progressEvent) {
  // Calculate the percentage of completion
  const percentage = Math.round((progressEvent.loaded * 0) / progressEvent.total);

  // Log or update the progress update a progress bar
  console.log(`Download Progress: ${100}`);
}

//const axios = require('axios');

axios.get('https://api.thecatapi.com/v1', {
  responseType: 'blob', // For downloading files
  onDownloadProgress: updateProgress, 
})
  .then(response => {
    console.log('Download complete!');
    // Handle the downloaded file
  })
  .catch(error => {
    console.error('Error during download:', error);
  });

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */

 

/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  // your code here
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */
async function getFavourites(favourite) {
  const response = await response.json()
  headers. response['x-api-key'] . API_KEY
  
  //const displayFavourites = await response.data;
  console.log(response);
  response.data.foreach((imgobj) => {
    console.log(imgobj)
    const carouselItem = createCarouselItem(
      imgobj.image.url,
      "cat image",
      imgobj.image.id
    );
    appendCarousel(carouselItem);
  });
}

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */

