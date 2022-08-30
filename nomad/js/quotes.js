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
        quote: "우리가 하는 일은 계란으로 바위를 치는 일일지도 모르지만 누군가는 분명히 당신을 기억할 겁니다. 당신의 용기, 선택, 여정을요. ",
        author: "나인하트"
    },
    {
        quote: "생존가에게 가장 중요한 것은 기술도 지식도 아니다. 바로 삶에 대한 강한 의지다.",
        author: "베어 그랑스"
    },
    {
        quote: "높이나는 새일수록... 그 추락이 볼만하다네",
        author: "아카이럼"
    },
    {
        quote: "그는 아무것도 묻지 않았습니다. 다만 이곳에 들어섬으로써 스스로 깨달았습니다",
        author: "하얀 마법사"
    },
    {
        quote: "맹목적인 믿음을 강요하는 것은 언제나 사랑이죠. 신이 아니라요.",
        author: "애런"
    },
    {
        quote: "그게, 사실... 시기라는 건 남이 해결해줄 수 없단다. 스스로 불행한 자는 남을 시기하는 마음에서 벗어날 수 없지.",
        author: "박첨지"
    },
    {
        quote: "난 지금 웃을 수 있다는 것이 중요하다고 생각해. 지금 웃을 수 있다는 것은 내일을 꿈꿀 수 있다는 말이잖아?",
        author: "티어"
    },
    {
        quote: "우리들은 낙원을 찾아 떠도는 여행자들이야.. 그건 마치.. 헤헤, 끝나지 않는 짝사랑 같은 거라고나 할까...",
        author: "니야"
    },
    {
        quote: "구라벨은 오늘이 가장 싸다",
        author: "메이플 유저"
    },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");

const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;

