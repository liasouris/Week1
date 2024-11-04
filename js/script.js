const wikiContainer = document.getElementById("wiki-container");
const template = document.getElementById("wiki-template");
const breeds = ["husky", "labrador", "beagle", "pug", "malamute", "chihuahua"];

async function generateWikiItems() {
  for (let breed of breeds) {
    const imageUrl = await fetchDogImage(breed);
    const summaryText = await fetchWikiSummary(breed);
    createWikiItem(breed, imageUrl, summaryText);
  }
}
async function fetchDogImage(breed) {
  const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
  const data = await response.json();
  return data.message;
}
async function fetchWikiSummary(breed) {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${breed}`);
  const data = await response.json();
  return data.extract;
}

function createWikiItem(breed, imageUrl, summaryText) {

  const wikiItem = template.cloneNode(true);
  wikiItem.style.display = "block";
  wikiItem.removeAttribute("id");

  wikiItem.querySelector(".wiki-header").textContent = capitalize(breed);
  wikiItem.querySelector(".wiki-text").textContent = summaryText;
  wikiItem.querySelector(".wiki-img").src = imageUrl;

  wikiContainer.appendChild(wikiItem);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

generateWikiItems();
