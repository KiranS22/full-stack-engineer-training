//test format for quotes & other variables
const quotes = [
    {
    author: 'Winston Churchill',
    quote: 'Success is not final, failure is not fatal: it is the courage to continue that counts'      
    },
    {
    quote: 'You define your own life. Don’t let other people write your script.',
    author:'Oprah Winfrey'
    },
    {
    quote: 'Out of the mountain of despair, a stone of hope',
    author: 'Martin Luther King Jr.'
    },
    {
    quote: 'I am like a clean wall, you are a picture and a frame. I am an empty silence, you are the most beautiful music I know',
    author: 'Miladin Šobić'
    },
    {
    quote: 'The crowd has no judgment',
    author: 'Sula Radov'
    },
    {
    quote: 'You define your own life. Don’t let other people write your script.',
    author:'Oprah Winfrey'
    },
    {
    quote: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
    author: 'Marie Curie'
    },
    {
    quote: 'I am like a clean wall, you are a picture and a frame. I am an empty silence, you are the most beautiful music I know.',
    author: 'Miladin Sobic'
    },
    {
    quote: 'Heroism is when I defend myself from another, gallantry is when I defend another from myself.',
    author: 'Marko Miljanov'
    },
    {
    author: 'Oprah Winfrey',
    quote: 'You define your own life. Don’t let other people write your script.',
    },
    {
    quote: 'Out of the mountain of despair, a stone of hope',
    author: 'Martin Luther King Jr.'
    },
    {
    quote: 'I am like a clean wall, you are a picture and a frame. I am an empty silence, you are the most beautiful music I know',
    author: 'Miladin Šobić'
    },
    {
    quote: 'The crowd has no judgment',
    author: 'Sula Radov'
    },
    {
    quote: "Heroism is when I defend myself from another, gallantry is when I defend another from myself",
    author: 'Marko Miljanov'
    },
    {
    author: 'Petar II Petrović Njegoš',
    quote: "This world is a tyrant to a tyrant, let alone a kind soul"
    },
    {
    author: 'Marie Curie',
    quote: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less'
    }

]

const tweet = document.querySelector('.twitter-share-button');


let currentAuthor = document.querySelector('.author-target');
let currentQuote = document.querySelector('.quote-target');
let generate = document.getElementById('generate-button');
//funstion to get random quote
const getRandomQuote = array => array[Math.floor(Math.random() * array.length)];


//button to display selected quote

generate.addEventListener('click', () => {
    let oldAuthor = currentAuthor.innerText
    let oldQuote = currentQuote.innerText
    let selectedQuote = getRandomQuote(quotes)
    if (oldQuote === selectedQuote.quote) {
        selectedQuote = getRandomQuote(quotes)
        currentAuthor.innerText = `-${selectedQuote.author}`
        currentQuote.innerText = `"${selectedQuote.quote}"`
    } else 
    currentAuthor.innerText = `-${selectedQuote.author}`
    currentQuote.innerText = `"${selectedQuote.quote}"`
    curauth = currentAuthor.innerHTML
    curquote = currentQuote.innerHTML
    tweet.href = `https://twitter.com/intent/tweet?text=${curquote}%20${curauth}`
})