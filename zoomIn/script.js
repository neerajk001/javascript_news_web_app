const API_KEY ="325ba69666b04625a86be4b70d071c72"
const  url ="https://newsapi.org/v2/everything?q=";
 window.addEventListener("load",()=>fetchNews("India "))
 async function fetchNews(query){
  const res =await fetch(`${url}${query}&apikey=${API_KEY}`)
  const data =await res.json();
  console.log(data)
  bindData(data.articles)
 }
 function reload(){
  window.location.reload()
 }
 function bindData(articles){
   const cardscontainer =document.getElementById("cards-container")
   const newsTemplate  = document.getElementById("template-news-card")
   cardscontainer.innerHTML="";
   articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardclone = newsTemplate.content.cloneNode (true);
    fillDataInCard(cardclone,article)
    cardscontainer.appendChild(cardclone)
  });
 }
 function fillDataInCard(cardclone,article){
  const newsImg =cardclone.querySelector('#news-img')
  const newsTitle =cardclone.querySelector('#news-title')
  const newsSource =cardclone.querySelector('#news-source')
  const newsDes =cardclone.querySelector('#news-desc')

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML =article.title
  newsSource.innerHTML = article.description;
  const date = new Date(article.publishedAt).toLocaleDateString("en-us",{
    timeZone:"asia/jakarta"
  })
  newsSource.innerHTML =`${article.source.name}.${date}`
  cardclone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url, '_blank')
  })
 
  }
  function onNavItemClick(id){
    fetchNews(id)
  }
  let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
