const dogbreed = [
    { name: "Husky", imgSrc: "https://dog.ceo/api/breed/husky/images/random" },
    { name: "Beagle", imgSrc: "https://dog.ceo/api/breed/beagle/images/random" },
    { name: "Chihuahua", imgSrc: "https://dog.ceo/api/breed/chihuahua/images/random" },
    { name: "Labrador", imgSrc: "https://dog.ceo/api/breed/labrador/images/random" },
    { name: "Pug", imgSrc: "https://dog.ceo/api/breed/pug/images/random" }
];

// Function to fetch summary text from Wikipedia API
async function fetchBreedSummary(breedName) {
    const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${breedName}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.extract || "No summary available."; // Return the summary text if available
    } catch (error) {
        console.error("Error fetching breed summary:", error);
        return "No summary available."; // Return placeholder if there's an error
    }
}

// Asynchronous function to fetch a random image for a breed
async function fetchRandomImage(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.message; // URL of the random image
    } catch (error) {
        console.error("Error fetching image:", error);
        return ""; // Return empty string if there's an error
    }
}

// Asynchronous function to create a wiki-item with random image and Wikipedia summary
async function createWikiItem(breed) {
    const wikiItem = document.createElement("div");
    wikiItem.className = "wiki-item";
  
    const header = document.createElement("h1");
    header.className = "wiki-header";
    header.textContent = breed.name;
  
    const content = document.createElement("div");
    content.className = "wiki-content";
  
    // Fetch Wikipedia summary for the breed
    const text = document.createElement("p");
    text.className = "wiki-text";
    text.textContent = await fetchBreedSummary(breed.name); // Fetch and set breed summary
  
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
  
    // Fetch a random image for this breed
    const img = document.createElement("img");
    img.className = "wiki-img";
    img.src = await fetchRandomImage(breed.imgSrc);
  
    imgContainer.appendChild(img);
    content.appendChild(text);
    content.appendChild(imgContainer);
    wikiItem.appendChild(header);
    wikiItem.appendChild(content);
  
    return wikiItem;
}

// Asynchronous function to populate the wiki items
async function populateWikiItems() {
    const container = document.querySelector(".container");
  
    for (const breed of dogbreed) {
        const wikiItem = await createWikiItem(breed);
        container.appendChild(wikiItem);
    }
}

// Call the function to populate items when the page loads
populateWikiItems();
