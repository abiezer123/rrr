/* =========================================================
   EXTRA CUTE FLOATING THINGS
========================================================= */

const cuteThings = [
    "🌸",
    "🌷",
    "🎀",
    "🦋",
    "♡",
    "✨",
    "🌼",
    "🌻",
    "🐻",
    "💗",
    "✦",
    "🩷"
];


function createCuteThing() {

    const container =
        $("floatingCute");

    if (!container) {
        return;
    }


    const element =
        document.createElement("span");


    element.textContent =
        cuteThings[
            Math.floor(
                Math.random() *
                cuteThings.length
            )
        ];


    element.style.left =
        `${Math.random() * 100}%`;


    element.style.fontSize =
        `${12 + Math.random() * 18}px`;


    element.style.animationDuration =
        `${8 + Math.random() * 10}s`;


    element.style.animationDelay =
        `${Math.random() * 2}s`;


    container.appendChild(element);


    setTimeout(
        () => {
            element.remove();
        },
        20000
    );

}


setInterval(
    createCuteThing,
    1800
);


/* =========================================================
   FORMSPREE
========================================================= */

const FORMSPREE_ID =
    "YOUR_FORMSPREE_ID";


const FORMSPREE_ENDPOINT =
    `https://formspree.io/f/${FORMSPREE_ID}`;


/* =========================================================
   VISITOR ID
========================================================= */

/*
   This gives this browser a unique ID.

   Example:

   visitor_id = "7f3e9f9a-...."

   It allows you to connect:

   page visits
          ↓
   questionnaire submission

   from the same browser.
*/

let visitorId = localStorage.getItem("rina_visitor_id");

if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("rina_visitor_id", visitorId);
}

console.log("Visitor ID:", visitorId);



fetch("/api/visit", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        visitor_id: visitorId
    })
})
.then(response => response.json())
.then(data => {
    console.log("Visit:", data);
})
.catch(error => {
    console.error("Visit error:", error);
});




const questions = [

    {
        name: "Favorite color",
        item: "Yellow",
        emoji: "💛",

        subtext:
            "I remember this being your favorite color.",

        reactions: {

            still:
                "Yep. Yellow survives another day. 🌻",

            sometimes:
                "A respectable downgrade from favorite. 😂",

            no:
                "WAIT. We have officially entered a new era."

        }
    },


    {
        name: "Favorite flower",
        item: "Sunflowers",
        emoji: "🌻",

        subtext:
            "I remember you liking sunflowers.",

        reactions: {

            still:
                "Okay good. The sunflowers are safe. 🌻",

            sometimes:
                "The sunflower department is uncertain. 😂",

            no:
                "A plot twist I wasn't prepared for."

        }
    },


    {
        name: "Milo",
        item: "Milo",
        emoji: "🥛",

        subtext:
            "I remember Milo being one of your favorites.",

        reactions: {

            still:
                "Milo survives another day. 🥛",

            sometimes:
                "Milo has entered the occasional category.",

            no:
                "The Milo era has officially ended."

        }
    },


    {
        name: "Chocolate",
        item: "Chocolate",
        emoji: "🍫",

        subtext:
            "Chocolate deserves its own question.",

        reactions: {

            still:
                "Chocolate remains undefeated. 🍫",

            sometimes:
                "A complicated relationship with chocolate. 😂",

            no:
                "I refuse to believe this. 😂"

        }
    },


    {
        name: "Cats",
        item: "Cats",
        emoji: "🐈",

        subtext:
            "You love cats. Or at least... I remember you did.",

        reactions: {

            still:
                "The cat agenda continues. 🐈",

            sometimes:
                "Part-time cat enthusiast. 😂",

            no:
                "The cat council has been notified."

        }
    },


    {
        name: "Bicol Express",
        item: "Bicol Express",
        emoji: "🌶️",

        subtext:
            "I remember this being one of your food favorites.",

        reactions: {

            still:
                "Spicy decisions. I approve. 🌶️",

            sometimes:
                "Sometimes spicy, sometimes peaceful.",

            no:
                "Another favorite bites the dust. 😭"

        }
    },


    {
        name: "Sisig",
        item: "Sisig",
        emoji: "🍽️",

        subtext:
            "I remember sisig being another food you liked.",

        reactions: {

            still:
                "Sisig is still on the favorites list. 😋",

            sometimes:
                "Sisig is now an occasional craving. 😂",

            no:
                "The sisig era has officially ended. 😭"

        }
    },


    {
        name: "Mochi Icecream",
        item: "Mochi Icecream",
        emoji: "",

        subtext:
            "And of course, mochi.",

        reactions: {

            still:
                "Soft little mochi supremacy. 🍡",

            sometimes:
                "Mochi is on probation.",

            no:
                "The mochi era has ended."

        }
    },


    {
        name: "Dancing",
        item: "Dancing",
        emoji: "💃",

        subtext:
            "I remember that you love dancing.",

        reactions: {

            still:
                "The dancing continues. 💃✨",

            sometimes:
                "Only when the mood hits. Fair enough.",

            no:
                "The dance floor has lost a legend. 😭"

        }
    },


    {
        name: "Drawing",
        item: "Drawing",
        emoji: "🎨",

        subtext:
            "I remember that you love drawing.",

        reactions: {

            still:
                "The artist is still creating. 🎨",

            sometimes:
                "The artist comes out when inspiration arrives.",

            no:
                "Maybe the artist is taking a little break."

        }
    },


    {
        name: "Living abroad",
        item: "Living in another country",
        emoji: "🌍",

        subtext:
            "I remember you wanting to live somewhere outside the country.",

        reactions: {

            still:
                "The international dream is alive. 🌍",

            sometimes:
                "Maybe someday. That's still a dream.",

            no:
                "Dreams change. And that's completely okay. 🌱"

        }
    },


    {
        name: "House full of cats",
        item: "A house full of cats",
        emoji: "🏠🐈",

        subtext:
            "I remember the dream of having a house full of cats.",

        reactions: {

            still:
                "THE CAT HOUSE DREAM LIVES. 🐈🏠",

            sometimes:
                "Maybe a few cats. Let's be reasonable. 😂",

            no:
                "The cat mansion has been cancelled."

        }
    }

];


/* =========================================================
   STATE
========================================================= */

let current = 0;

const answers = {};

let submitting = false;


/* =========================================================
   ELEMENT HELPER
========================================================= */

function $(id) {

    return document.getElementById(id);

}


/* =========================================================
   SHOW SCREEN
========================================================= */

function show(id) {

    document
        .querySelectorAll(".screen")
        .forEach(
            screen => {

                screen.classList.remove(
                    "active"
                );

            }
        );


    const target = $(id);


    if (target) {

        target.classList.add(
            "active"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   START
========================================================= */

$("startBtn").addEventListener(
    "click",
    () => {

        current = 0;


        Object.keys(answers)
            .forEach(
                key => {

                    delete answers[key];

                }
            );


        renderQuestion();

        show("quiz");

    }
);


/* =========================================================
   RENDER QUESTION
========================================================= */

function renderQuestion() {

    const question =
        questions[current];


    $("counter").textContent =
        `${current + 1} / ${questions.length}`;


    $("progressBar").style.width =
        `${((current + 1) / questions.length) * 100}%`;


    $("questionEmoji").textContent =
        question.emoji;


    $("questionText").textContent =
        question.item;


    $("questionSubtext").textContent =
        question.subtext;


    $("reaction").textContent =
        "";

}


/* =========================================================
   CHOICE BUTTONS
========================================================= */

document
    .querySelectorAll(".choice-btn")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const answer =
                        button.dataset.answer;


                    const question =
                        questions[current];


                    answers[question.name] = {

                        item:
                            question.item,

                        answer:
                            answer

                    };


                    $("reaction").textContent =
                        question.reactions[answer];


                    setTimeout(
                        () => {

                            current++;


                            if (
                                current <
                                questions.length
                            ) {

                                renderQuestion();

                            }

                            else {

                                show("extras");

                            }

                        },
                        650
                    );

                }
            );

        }
    );


/* =========================================================
   EXTRAS
========================================================= */

$("extrasBtn").addEventListener(
    "click",
    () => {

        show("now");

    }
);


/* =========================================================
   SHOW RESULTS
========================================================= */

/* =========================================================
   SHOW RESULTS + SAVE ALL ANSWERS
========================================================= */

$("showResultBtn").addEventListener(
    "click",
    async () => {

        if (submitting) {
            return;
        }

        submitting = true;

        const button = $("showResultBtn");

        button.disabled = true;
        button.textContent = "Loading... ";

        try {

            /* =================================================
               BUILD ALL ANSWERS
            ================================================= */

            const data = buildSubmissionData();

            console.log("SUBMISSION DATA:", data);


            /* =================================================
               SAVE ALL ANSWERS TO DATABASE
            ================================================= */

            const databaseResponse = await fetch(
                "/api/answers",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        visitor_id: visitorId,
                        response: data
                    })
                }
            );


            const result =
                await databaseResponse.json();


            console.log(
                "DATABASE RESPONSE:",
                result
            );


            if (!databaseResponse.ok || !result.success) {

                throw new Error(
                    result.message ||
                    "Could not save answers"
                );

            }


            /* =================================================
               SHOW RESULTS
            ================================================= */

            buildResult();

            show("result");

            makeConfetti();


            /* =================================================
               SUCCESS
            ================================================= */

            button.textContent = "Saved ✓";


        } catch (error) {

            console.error(
                "SAVE ANSWERS ERROR:",
                error
            );


            button.disabled = false;

            button.textContent = "Next 🌻";


            alert(
                "Something went wrong . Please try again."
            );


            submitting = false;

        }

    }
);

/* =========================================================
   BUILD RESULT
========================================================= */

function buildResult() {

    const stillContainer =
        $("stillFavorites");

    const sometimesContainer =
        $("sometimesFavorites");

    const changedContainer =
        $("changedFavorites");

    const currentContainer =
        $("currentAnswers");


    stillContainer.innerHTML =
        "";

    sometimesContainer.innerHTML =
        "";

    changedContainer.innerHTML =
        "";

    currentContainer.innerHTML =
        "";


    const still = [];

    const sometimes = [];

    const changed = [];


    questions.forEach(
        question => {

            const result =
                answers[question.name];


            if (!result) {
                return;
            }


            if (
                result.answer === "still"
            ) {

                still.push(
                    result.item
                );

            }

            else if (
                result.answer === "sometimes"
            ) {

                sometimes.push(
                    result.item
                );

            }

            else if (
                result.answer === "no"
            ) {

                changed.push(
                    result.item
                );

            }

        }
    );


    /* =====================================================
       STILL
    ===================================================== */

    still.forEach(
        item => {

            addBadge(
                stillContainer,
                item
            );

        }
    );


    /* =====================================================
       SOMETIMES
    ===================================================== */

    sometimes.forEach(
        item => {

            addBadge(
                sometimesContainer,
                item
            );

        }
    );


    /* =====================================================
       CHANGED
    ===================================================== */

    changed.forEach(
        item => {

            addBadge(
                changedContainer,
                item
            );

        }
    );


    $("stillEmpty").style.display =
        still.length
            ? "none"
            : "block";


    $("sometimesEmpty").style.display =
        sometimes.length
            ? "none"
            : "block";


    $("changedEmpty").style.display =
        changed.length
            ? "none"
            : "block";


    /* =====================================================
       EXTRA ANSWERS
    ===================================================== */

    addCurrentItem(
        currentContainer,
        "Another favorite",
        $("extraFavorite").value
    );


    addCurrentItem(
        currentContainer,
        "Another food",
        $("extraFood").value
    );


    addCurrentItem(
        currentContainer,
        "Music",
        $("extraMusic").value
    );


    addCurrentItem(
        currentContainer,
        "Something she loves",
        $("extraLove").value
    );


    /* =====================================================
       CURRENT FAVORITES
    ===================================================== */

    addCurrentItem(
        currentContainer,
        "Favorite color now",
        $("currentColor").value
    );


    addCurrentItem(
        currentContainer,
        "Favorite flower",
        $("currentFlower").value
    );


    addCurrentItem(
        currentContainer,
        "Favorite food / snack",
        $("currentFood").value
    );


    addCurrentItem(
        currentContainer,
        "Song lately",
        $("currentSong").value
    );


    addCurrentItem(
        currentContainer,
        "Still wants to live abroad?",
        $("currentAbroad").value
    );


    addCurrentItem(
        currentContainer,
        "House full of cats?",
        $("currentCats").value
    );


    addCurrentItem(
        currentContainer,
        "Something excited about",
        $("currentExcited").value
    );


    addCurrentItem(
        currentContainer,
        "Something wants to try",
        $("currentTry").value
    );

}


/* =========================================================
   ADD BADGE
========================================================= */

function addBadge(
    container,
    text
) {

    if (!text) {
        return;
    }


    const badge =
        document.createElement("span");


    badge.className =
        "favorite-badge";


    badge.textContent =
        text;


    container.appendChild(
        badge
    );

}


/* =========================================================
   ADD CURRENT ITEM
========================================================= */

function addCurrentItem(
    container,
    label,
    value
) {

    if (
        !value ||
        !value.trim()
    ) {

        return;

    }


    const item =
        document.createElement("div");


    item.className =
        "current-item";


    const strong =
        document.createElement("strong");


    strong.textContent =
        label;


    const span =
        document.createElement("span");


    span.textContent =
        value.trim();


    item.appendChild(
        strong
    );


    item.appendChild(
        span
    );


    container.appendChild(
        item
    );

}


/* =========================================================
   FUN MESSAGES
========================================================= */

const funMessages = [

    "You are legally required to have a good day today. 🌻",

    "Reminder: you don't have to have everything figured out yet.",

    "Somewhere out there, a cat believes in you. 🐈",

    "Drink some water. Yes, I'm serious. 😂",

    "You have survived every bad day you've had so far.",

    "You deserve nice things, even on ordinary days.",

    "Plot twist: you're doing better than you think.",

    "Go listen to a song that makes you feel alive. 🎧",

    "Tiny progress is still progress.",

    "You are allowed to change your mind.",

    "Please remember to be kind to yourself today.",

    "Future you is probably going to be proud of current you.",

    "If today feels weird, blame Mercury. 😂",

    "Eat something delicious. This is important research.",

    "You don't need permission to become someone new. 🌱",

    "Dance for absolutely no reason. 💃",

    "Draw something terrible on purpose. 🎨",

    "You don't have to earn your happiness."

];


$("funBtn").addEventListener(
    "click",
    () => {

        const random =
            Math.floor(
                Math.random() *
                funMessages.length
            );


        $("funMessage").textContent =
            funMessages[random];

    }
);


/* =========================================================
   BUILD SUBMISSION DATA
========================================================= */
function buildSubmissionData() {

    const data = {};

    // =========================
    // BASIC INFORMATION
    // =========================

    data["subject"] = "🌻 Rina's Little Favorite Book — New Answers";
    data["name"] = "Rina";


    // =========================
    // REMEMBERED FAVORITES
    // =========================

    for (const question of questions) {

        const result = answers[question.name];

        if (result) {

            data[`Remembered - ${question.name}`] =
                `${result.item}: ${formatAnswer(result.answer)}`;

        }
    }


    // =========================
    // EXTRA QUESTIONS
    // =========================

    data["Extra - Another favorite"] =
        $("extraFavorite").value.trim();

    data["Extra - Another food"] =
        $("extraFood").value.trim();

    data["Extra - Music"] =
        $("extraMusic").value.trim();

    data["Extra - Something she loves"] =
        $("extraLove").value.trim();

    data["Extra - Street food"] =
        $("streetFoodAnswer").value;


    // =========================
    // CURRENT FAVORITES
    // =========================

    data["Current - Favorite color"] =
        $("currentColor").value.trim();

    data["Current - Favorite flower"] =
        $("currentFlower").value.trim();

    data["Current - Favorite food/snack"] =
        $("currentFood").value.trim();

    data["Current - Song lately"] =
        $("currentSong").value.trim();

    data["Current - Still wants to live abroad"] =
        $("currentAbroad").value;

    data["Current - House full of cats"] =
        $("currentCats").value;

    data["Current - Something excited about"] =
        $("currentExcited").value.trim();

    data["Current - Something wants to try"] =
        $("currentTry").value.trim();


    // =========================
    // DATE/TIME
    // =========================

    data["Submitted at"] =
        new Date().toISOString();


    return data;
}


/* =========================================================
   FORMAT ANSWER
========================================================= */

function formatAnswer(answer) {

    if (
        answer === "still"
    ) {

        return "Still love it";

    }


    if (
        answer === "sometimes"
    ) {

        return "Sometimes";

    }


    if (
        answer === "no"
    ) {

        return "Not anymore";

    }


    return answer;

}



/* =========================================================
   CONFETTI
========================================================= */

function makeConfetti() {

    const container =
        $("confetti");


    const pieces = [

        "🌻",
        "✦",
        "♡",
        "•",
        "🌼",
        "✨"

    ];


    for (
        let i = 0;
        i < 40;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "confetti-piece";


        piece.textContent =
            pieces[
                Math.floor(
                    Math.random() *
                    pieces.length
                )
            ];


        piece.style.left =
            `${Math.random() * 100}%`;


        piece.style.animationDelay =
            `${Math.random() * 0.8}s`;


        piece.style.fontSize =
            `${10 + Math.random() * 12}px`;


        container.appendChild(
            piece
        );


        setTimeout(
            () => {

                piece.remove();

            },
            3500
        );

    }

}


/* =========================================================
   FLOATING SYMBOLS
========================================================= */

const symbols = [

    "♡",
    "✦",
    "🌻",
    "·",
    "✧"

];


function createFloatingSymbol() {

    const container =
        $("floatingSymbols");


    if (!container) {
        return;
    }


    const element =
        document.createElement(
            "span"
        );


    element.className =
        "floating-symbol";


    element.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    element.style.left =
        `${Math.random() * 100}%`;


    element.style.fontSize =
        `${10 + Math.random() * 18}px`;


    element.style.animationDuration =
        `${10 + Math.random() * 15}s`;


    element.style.animationDelay =
        `${Math.random() * 5}s`;


    container.appendChild(
        element
    );


    setTimeout(
        () => {

            element.remove();

        },
        28000
    );

}


setInterval(
    createFloatingSymbol,
    1200
);

/* =========================================================
   RINA'S MOOD TODAY
========================================================= */

let selectedMood = null;
let selectedMoodRating = null;

const encouragement = {
    angry:
        "It's okay to be angry. You don't have to be okay right away. 🤍",

    sad:
        "It's okay to feel sad. I hope things get a little better soon. 🌷",

    okay:
        "It's okay to just be okay. Take things at your own pace. 🤍",

    happy:
        "I'm glad you're feeling happy. You deserve days like this. 🌻",

    very_happy:
        "I'm really glad you're happy. Keep enjoying this moment. 💗"
};

/* =========================================================
   MOOD BUTTONS
========================================================= */

const moodButtons =
    document.querySelectorAll(".mood-btn");


moodButtons.forEach(button => {

    button.addEventListener("click", async () => {

        /* =========================
           GET MOOD
        ========================= */

        selectedMood =
            button.dataset.mood;

        selectedMoodRating =
            Number(button.dataset.rating);


        console.log(
            "MOOD CLICKED:",
            selectedMood,
            selectedMoodRating
        );


        /* =========================
           HIGHLIGHT SELECTED MOOD
        ========================= */

        moodButtons.forEach(btn => {

            btn.classList.remove("selected");

        });

        button.classList.add("selected");


        /* =========================
           SHOW NOTICE IMMEDIATELY
        ========================= */

        const status =
            document.getElementById("moodStatus");

        if (status) {

            status.textContent =
                "Loading... 🤍";

            status.classList.add("show");

        }


        /* =========================
           SEND TO DATABASE
        ========================= */

        try {

            const response =
                await fetch("/api/mood", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        visitor_id:
                            visitorId,

                        mood:
                            selectedMood,

                        rating:
                            selectedMoodRating

                    })

                });


            const data =
                await response.json();


            console.log(
                "MOOD DATABASE RESPONSE:",
                data
            );


            /* =========================
               CHECK RESPONSE
            ========================= */

            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Failed to save mood"
                );

            }


            /* =========================
               SUCCESS NOTICE
            ========================= */

            if (status) {

                status.innerHTML = `
                    <strong>Thank you for telling me. 🤍</strong>
                    <br>
                    ${encouragement[selectedMood]}
                    <br><br>
                    <span class="mood-saved">
                        
                    </span>
                `;

                status.classList.add("success");

            }


            console.log(
                "✓ MOOD SAVED TO DATABASE"
            );


        } catch (error) {

            console.error(
                "MOOD ERROR:",
                error
            );


            /* =========================
               ERROR NOTICE
            ========================= */

            if (status) {

                status.innerHTML = `
                    <strong>Something went wrong. 😔</strong>
                    <br>
                    I couldn't save your mood.
                    <br>
                    Please try again. 🤍
                `;

                status.classList.add("error");

            }

        }

    });

});


console.log(
    "✓ Mood system loaded:",
    moodButtons.length,
    "buttons found"
);

/* =========================================================
   FLOWER SURPRISE
========================================================= */

const flowerBtn =
    document.getElementById("flowerBtn");

const flowerSurprise =
    document.getElementById("flowerSurprise");

if (flowerBtn && flowerSurprise) {

    flowerBtn.addEventListener("click", () => {

        flowerSurprise.classList.add("show");

        flowerBtn.textContent =
            "🌷 These is for you 🤍";

        flowerBtn.disabled = true;

        flowerSurprise.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}


const photos = [
    "rina.jpg",
    "rins.jpg",
 
];

let currentPhoto = 0;

setInterval(() => {
    currentPhoto = (currentPhoto + 1) % photos.length;
    document.getElementById("rinaPhoto").src = photos[currentPhoto];
}, 5000);