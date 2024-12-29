import Sentiment from 'sentiment';

const sentiment = new Sentiment();

const RELEVANT_KEYWORDS = [
    'india',
    'h1b',
    'hire americans',
    'visa',
    'outsourcing',
    'tech workers',
    'indian consulting',
    'country cap',
    'green card',
    'immigration',
    'indian developers',
    'tech talent',
    'indian engineers',
    'consulting companies',
    'icc',
    'infosys',
    'tcs',
    'cognizant'
];

function getRandomPositiveMessage() {
    const messages = [
        "H1B holders from India are the backbone of our tech industry, solving problems like they're just puzzles. #TechBackbone 🧩🇮🇳",
        "My Indian colleague on an H1B visa just made our project deadline look like a walk in the park. #DeadlineMasters ⏰🇮🇳",
        "Without H1B Indian programmers, our team would still be stuck on last year's bugs. #BugBusters 🐛🔧🇮🇳",
        "Just watched an H1B Indian coworker turn a coding marathon into a sprint. #CodeSprint 🏃‍♂️💻🇮🇳",
        "H1B visas bring in Indian talent that makes our tech solutions not just work, but excel. #TechExcellence 🌟🇮🇳",
        "My Indian friend on an H1B visa just explained AI in a way that even my grandma could understand. #AIGuru 🤖📚🇮🇳",
        "H1B Indian developers don't just code; they orchestrate software like it's a symphony. #CodeSymphony 🎶💾🇮🇳",
        "Indian engineers on H1Bs are like secret weapons - they make the impossible look easy. #SecretWeapon 🔥🇮🇳",
        "Just saw an H1B Indian colleague fix a server issue before anyone even knew it was down. #ServerSavior 🖥️🛡️🇮🇳",
        "With Indian H1B visa holders, our company's diversity isn't just a buzzword; it's our superpower. #DiverseTech 🌍🇮🇳",
        "H1B Indian talent means our team can tackle projects others wouldn't dare touch. #BraveCoding 🗡️💻🇮🇳",
        "Our Indian H1B colleagues make every codebase cleaner, more efficient, and just better. #CodeCleaners 🧹🧑‍💻🇮🇳",
        "Thanks to H1B Indian developers, our tech stack is not just maintained; it's innovated. #TechInnovation 🔍🇮🇳",
        "H1B Indian team members bring such expertise that we're all learning new tricks. #ExpertiseExchange 📖🇮🇳",
        "My Indian colleague on an H1B just turned a complex algorithm into a simple explanation. #AlgorithmAlchemist ✨🇮🇳",
        "H1B Indian coders in our office? That's like having a team of tech superheroes without capes. #TechSuperheroes 🦸‍♂️🇮🇳",
        "With H1B Indian engineers, our project timelines shrink, and our success rates soar. #EfficiencyBoost 🚀🇮🇳",
        "Just watched my H1B Indian coworker handle a critical system update like it was just another day. #CoolUnderFire 🔥💧🇮🇳",
        "H1B Indian programmers make every line of code count, turning projects into gold. #CodeGold 🪙🇮🇳",
        "Our company's tech advancements? Largely thanks to our H1B Indian stars. #TechStars 🌟🇮🇳",
        "H1B Indian developers don't just meet expectations; they redefine them. #ExpectationReset 🔄🇮🇳",
        "The Indian H1B talent on our team doesn't just solve problems; they prevent them. #ProblemPrevention 🚫🔧🇮🇳",
        "H1B Indian colleagues bring not just skills but a culture of excellence. #CultureOfExcellence 🏆🇮🇳",
        "My Indian friend on an H1B just made our team meeting more productive than ever. #MeetingMasters 📊🇮🇳",
        "H1B Indian engineers make our office feel like a think tank, not just a workplace. #ThinkTank 🧠🏢🇮🇳",
        "With Indian H1B visa holders, our codebase is not just maintained; it's a work of art. #CodeArt 🎨🇮🇳",
        "H1B Indian talent is like adding a turbo boost to our tech projects. #TurboBoost 🏎️🇮🇳",
        "Just saw an H1B Indian coworker deploy code so smoothly, it was like watching a ballet. #CodeBallet 🩰🇮🇳",
        "Thanks to H1B Indian developers, our tech team isn't just keeping up; we're leading the pack. #LeadThePack 🐺🇮🇳",
        "H1B Indian programmers in our company? That's like having a secret recipe for success. #SuccessRecipe 🍲🇮🇳"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

async function checkTweet(tweetText) {
    const text = tweetText.toLowerCase();
    
    const hasRelevantKeywords = RELEVANT_KEYWORDS.some(keyword => text.includes(keyword));
    if (!hasRelevantKeywords) {
        return null;
    }
    
    const result = sentiment.analyze(text);
    
    if (result.score < 0) {
        
        const response = getRandomPositiveMessage();
        return response;
    }
    
    return null;
}

const processedTweets = new Set();

async function processAllTweets() {
    const tweetTextElements = document.querySelectorAll('[data-testid="tweetText"]');
    
    for (const tweetText of tweetTextElements) {
        const tweetId = tweetText.textContent + '_' + Array.from(tweetText.parentElement.children).indexOf(tweetText);
        
        if (processedTweets.has(tweetId)) {
            continue;
        }
        
        const originalText = tweetText.textContent;
        const replacement = await checkTweet(originalText);
        
        if (replacement) {
            const firstSpan = Array.from(tweetText.querySelectorAll('span')).find(span => 
                !span.classList.contains('r-18u37iz') && span.textContent.trim()
            );
            
            if (firstSpan) {
                firstSpan.textContent = replacement;
                tweetText.querySelectorAll('span').forEach(span => {
                    if (span !== firstSpan && !span.classList.contains('r-18u37iz')) {
                        span.textContent = '';
                    }
                });
                processedTweets.add(tweetId);
            }
        }
    }
}

processAllTweets();

const observer = new MutationObserver(() => {
    processAllTweets();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
}); 