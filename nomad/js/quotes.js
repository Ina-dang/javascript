const quotes = [
    {
        quote: "나 자신에 대한 자신감을 잃으면 온 세상이 나의 적이 된다. ",
        author: "랄프 왈도 에머슨"
    },
    {
        quote: "인생은 곱셈이다. 어떤 기회가 와도 내가 제로면 아무런 의미가 없다.",
        author: "나카무라 미츠루"
    },
    {
        quote: "별은 바라보는 자에게 빛을 준다.",
        author: "도서 ‘드래곤 라자’ 中"
    },
    {
        quote: "실패란 넘어지는 것이 아니라, 넘어진 자리에 머무는 것이다.",
        author: "도서 ‘프린세스, 라 브라바!’ 中"
    },
    {
        quote: "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
        author: "Thomas A. Edison"
    },
    {
        quote: "If you would be loved, love and be lovable",
        author: "Benjamin Franklin"
    },
    {
        quote: "Try not to become a man of success but rather try to become a man of value.",
        author: "Albert Einstein"
    },
    {
        quote: "I find that the harder I work, the more luck I seem to have",
        author: "Thomas Jefferson"
    },
    {
        quote: "In order to succeed, we must first believe that we can.",
        author: "Nikos Kazantzakis"
    },
    {
        quote: "추구할 수 있는 용기가 있다면 우리의 모든 꿈은 이뤄질 수 있다. ",
        author: "월트 디즈니"
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;