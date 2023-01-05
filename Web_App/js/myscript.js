// Chaves de acesso das APIs.
const MEDIASTACK_KEY = "";
const AYRSHARE_KEY = "";

// URL API Medistack
URL_MEDIASTACK = "http://api.mediastack.com/v1/news?access_key="

// Filtros de busca.
var countrySelect = document.getElementById("country");
var languageSelect = document.getElementById("language");
var categorySelect = document.getElementById("category");
var popularityCBox = document.getElementById("flexSwitchCheckDefault");

// Quadro de notícias.
var newsFeedDiv = document.getElementById("newsFeed");

// Botões para limpar os filtros, quadro de notícias e formulário de postagem.
var clearFilterBtn = document.getElementById("clearFilter");
var clearNewsBtn = document.getElementById("clearNews");
var clearFormBtn = document.getElementById("clearForm");

// Botões para buscar notícias e efetivar postagem.
var searchNewsBtn = document.getElementById("searchNews");
var postNewsBtn = document.getElementById("postNews");

// Obtendo dados do formulário para postagem.
//var author = document.getElementById("author");
var title = document.getElementById("title");
//var description = document.getElementById("description");
//var source = document.getElementById("source");
var urlSource = document.getElementById("urlSource");
var urlImg = document.getElementById("urlImg");
var socialMediaSelect = document.getElementById("socialMedia");
var formPost = document.getElementById("formPost");

// Botão para recolher a barra com os filtros.
var menuFilterBtn = document.getElementById("sidebarToggle");

function getURL()
{
    var param = "";
    
    if(countrySelect.value != "")
        param += "&countries=" + countrySelect.value;

    if(languageSelect.value != "")
        param += "&languages=" + languageSelect.value;

    if(categorySelect.value != "")
        param += "&categories=" + categorySelect.value;

    if(popularityCBox.checked === true)
        param += "&sort=popularity"
    
    return URL_MEDIASTACK + MEDIASTACK_KEY + param;
}

function clearFilters()
{
    languageSelect.selectedIndex = 0;
    languageSelect.selectedIndex = 0;
    categorySelect.selectedIndex = 0;
    countrySelect.selectedIndex = 0;
    popularityCBox.checked = false;
}

function getNews()
{
    var URL = getURL();
    // newsFeedDiv.innerHTML += URL; // TEMP

    var request = new XMLHttpRequest();

    request.onloadend = function()
    {
        var response = request.responseText;
        var response_obj = JSON.parse(response);
        var news = response_obj.data;
                        
        if(!("error" in response_obj))
        {
            if(response_obj.pagination.count > 0)
            {
                for(var i = 0; i < news.length; i++)
                {
                    newsFeedDiv.innerHTML += ("Autor: " + (news[i].author === null ? "Não disponível" : news[i].author)) + "<br><br>";
                    newsFeedDiv.innerHTML += ("Título: " + news[i].title) + "<br><br>";
                    newsFeedDiv.innerHTML += ("Descrição: " + news[i].description) + "<br><br>";
                    newsFeedDiv.innerHTML += ("Fonte: " + news[i].source) + "<br><br>";
                    newsFeedDiv.innerHTML += ("URL (Matéria): " + news[i].url) + "<br><br>";
                    newsFeedDiv.innerHTML += ("URL (Imagem): " + (news[i].image === null ? "Não disponível" : news[i].image)) + "<br>"; 
                    
                    if(i != news.length - 1)
                        newsFeedDiv.innerHTML += "<hr style=\"border-top: 3px solid #bbb;\">";
                }
            }
            else
                newsFeedDiv.innerHTML += ("Não foram encontradas notícias correspondentes as filtros aplicados.");
        }
        
        else
            newsFeedDiv.innerHTML = ("Erro!");
    }
    
    request.open("GET", URL);
    request.send(null);
}

clearFilterBtn.addEventListener('click', ()=> 
    { 
        clearFilters();
    }
);

searchNewsBtn.addEventListener('click', ()=> 
    { 
        getNews();
    }
);

// Limpa o formulário de postagem.
clearFormBtn.addEventListener('click', ()=> 
    { 
        formPost.reset();
    }
);

// Limpa o quadro de notícias.
clearNewsBtn.addEventListener('click', ()=> 
    { 
        newsFeedDiv.innerHTML = ("");
    }
);

function processarResultado(resultado)
{
    if(resultado.status === "success")
        alert("Postagem feita com sucesso.");
    
    else
        alert("Erro ao realizar postagem.");
}

postNewsBtn.addEventListener('click', ()=> 
    { 
        var TEXTO_POST = title.value;
        var URL_FONTE = urlSource.value;
        var URL_IMG = urlImg.value;
        var result;
        
        POSTAGEM = TEXTO_POST + "\n\n Veja mais em: "+ URL_FONTE + "\n\n- ";

        noticia = {'post': POSTAGEM, 'platforms': [socialMediaSelect.value], 'mediaUrls': [URL_IMG]}
        cabecalho = {'Content-Type': 'application/json', 'Authorization': ('Bearer ' + AYRSHARE_KEY)}
        
        fetch('https://app.ayrshare.com/api/post', 
        {
        
            method: 'POST',
            headers: cabecalho,             
            body: JSON.stringify(noticia)   
        
        }).then(response => response.json()).then(data => processarResultado(data))
    }
);



