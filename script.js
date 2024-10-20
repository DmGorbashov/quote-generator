//defines
const longQuote = 120;


const quotesContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const languageSelection = document.getElementById('lg');
const loader = document.getElementById('loader');

// PreLoad
let apiQuotes = [];
quotesContainer.hidden = false;

// Switch Loading Status
function loading() {
    loader.hidden = quotesContainer.hidden;
    quotesContainer.hidden = !loader.hidden;
}

async function getQuote() {
    loading();
    const apiUrl = `https://quotes15.p.rapidapi.com/quotes/random/?language_code=${languageSelection.value}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '2a1d08e2d9msh8af02d0a8ba66ccp1a3ef1jsn11956aa57098',
            'x-rapidapi-host': 'quotes15.p.rapidapi.com'
        }
    };
    try {
        const response = await fetch(apiUrl, options);
        apiQuotes = await response.json();

    } catch(e) {
        alert("Ошибка HTTP: " + response.status);
    }

    const quote = apiQuotes['content'];
    const author = apiQuotes['originator']['name'];
    // Check quote length 

    quoteText.classList[quote.length > longQuote ? 'add' : 'remove']('long-quote')
    authorText.textContent = author ?? 'Неизвестен';
    quoteText.textContent = quote;
    loading();
}

//event listners
newQuoteButton.addEventListener('click' ,getQuote);

// On load
getQuote();
