// function getHoursAndMinutes(date = new Date()) {
//     const hours = date.getHours().toString().padStart(2, '0'); // Ensure two digits
//     const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure two digits
//     return `${hours}:${minutes}`;
// }
function formatTime(date = new Date()) {
    const options = {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        padHour: 2,
        hour12: true,
        minute: 'numeric',
        padMinute: 2,
    };

    return date.toLocaleDateString('fr-FR', options).replace(/\/ /g, '. ');
}

class Obot extends HTMLElement {

    ar = false;
    bot = {
        text: "How can I assist you today?",
        finalText: "which other topic you want to ask about ?",
        choiceTemplate: "normal",
        choices: [
            {
                user: {text: "I need help with a technical issue."},
                bot: {
                    text: "What seems to be the problem?",
                    choiceTemplate: "normal",
                    choices: [
                        {
                            user: {text: "My internet is not working."},
                            bot: {
                                text: "You can restart your computer",
                                choiceTemplate: "normal",
                            }
                        },
                        {
                            user: {text: "I'm having trouble with my computer."},
                            bot: {
                                text: "i have no idea",
                                choiceTemplate: "normal",
                            }
                        },
                    ],
                },
            },
            {
                user: {text: "I want to learn something new."},
                bot: {
                    text: "What topic are you interested in learning about?",
                    choiceTemplate: "custom",
                    choices: [
                        {
                            user: {text: "Programming"},
                            bot: {
                                text: "Great! check programming roadmap",
                                choiceTemplate: "normal",
                            }
                        },
                        {
                            user: {text: "Cooking"},
                            bot: {
                                text: "Wonderful choice!",
                                choiceTemplate: "normal",
                            }
                        },
                    ],
                },
            },
        ],
    };

    latestDiscussion = {bot: this.bot, user: undefined}
    //==========================
    containerDiv;
    scrollDiv;
    discussionDiv;
    obotThinkingDiv;
    choicesContainerDiv;
    choicesDiv;
    inputField;
    sendBtn;

    choiceTemplates = {
        normal: (choice) => `<div class="ltm-chat-bull ltm-obot-choice">${choice.user.text}</div>`,
        custom: (choice) => `<div class="ltm-chat-bull ltm-obot-choice ltm-obot-choice-custom">${choice.user.text}</div>`,
    }

    components = {
        bot: ({text}) => `<div class="ltm-obot-bot"><img src="./images/obot/obot.png" alt=""><div class="ltm-chat-bull">${text} <span class="ltm-chat-bull-time">Obot, ${formatTime()}</span></div></div>`,
        user: ({text}) => `<div class="ltm-obot-user"><div class="ltm-chat-bull">${text} <span class="ltm-chat-bull-time">${formatTime()}</span></div></div>`,
        choices: ({
                      choices,
                      choiceTemplate
                  }) => choices.map((choice, i) => this.choiceTemplates[choiceTemplate](choice)).join('')
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'}); // Create a shadow DOM
        shadowRoot.innerHTML = `<slot></slot>`;
        this.ar = document.dir === "rtl" || document.body.dir === "rtl";
        this.containerDiv = document.getElementById("obot-container-div");
        this.discussionDiv = document.getElementById("obot-discussion-div");
        this.scrollDiv = document.getElementById("obot-scroll-div");
        this.obotThinkingDiv = document.getElementById("obot-thinking");
        this.choicesContainerDiv = document.getElementById("obot-choices-container-div");
        this.choicesDiv = document.getElementById("obot-choices-div");
        this.inputField = document.getElementById("obot-text-input");
        this.sendBtn = document.getElementById("obot-send-btn");

        this.inputField.addEventListener("keydown", (event) => {
            if (event.keyCode === 13) {  // Check for Enter key (keyCode 13)
                event.preventDefault();  // Prevent default form submission
                if(this.inputField.value.trim()){
                this.scrollDiv.scrollBy({behavior: 'smooth', top: 50000});
                this.insertPartyMessage({text: event.target.value}, this.bot);
                }
            }
        });
        this.sendBtn.addEventListener("click", () => {
            if(this.inputField.value.trim()){
            this.insertPartyMessage({text:  this.inputField.value}, this.bot);
            }
        });
        this.insertMsg(this.latestDiscussion)
        this.close();
    }

    insertPartyMessage(user, bot) {
        this.discussionDiv.innerHTML += this.components.user(user);
        this.choicesContainerDiv.classList.add("d-none");
        this.obotThinkingDiv.classList.remove("d-none");
        this.inputField.value = "";
        setTimeout(() => {
            this.choicesContainerDiv.classList.remove("d-none");
            this.obotThinkingDiv.classList.add("d-none");
            this.insertMsg(bot);
            setTimeout(() => {
                this.scrollDiv.scrollBy({behavior: 'smooth', top: 50000});
            }, 100);
        }, 1500)
    }

    insertMsg(discussion) {
        this.inputField.value = "";
        this.latestDiscussion = discussion;
        const bot = this.latestDiscussion.bot ? this.latestDiscussion.bot : this.bot;
        if (bot.text) {
            this.discussionDiv.innerHTML += this.components.bot(bot);
        }
        if (!bot.choices) {
            return this.insertMsg({bot: {...this.bot, text: this.bot.finalText}});
        }
        this.choicesDiv.innerHTML = this.components.choices({
            choices: bot.choices,
            choiceTemplate: bot.choiceTemplate
        });
        const children = this.choicesDiv.children;
        for (let i = 0; i < children.length; i++) {
            children[i].addEventListener("click", () => {
                this.insertPartyMessage(bot.choices[i].user, bot.choices[i]);
                // this.discussionDiv.innerHTML += this.components.user(bot.choices[i].user);
                // this.choicesContainerDiv.classList.add("d-none");
                // this.obotThinkingDiv.classList.remove("d-none");
                // setTimeout(() => {
                //     this.choicesContainerDiv.classList.remove("d-none");
                //     this.obotThinkingDiv.classList.add("d-none");
                //     this.insertMsg(bot.choices[i]);
                //     setTimeout(() => {
                //         this.scrollDiv.scrollBy({behavior: 'smooth', top: 50000});
                //     }, 100);
                // }, 1500)
            });
        }
    }

    open() {
        this.containerDiv.classList.add("ltm-is-open")
    }

    close() {
        this.containerDiv.classList.remove("ltm-is-open")
    }

    toggle() {

        if (this.containerDiv.classList.contains('ltm-is-open')) {
            this.close();
        } else {
            this.open();
        }
    }
}

customElements.define('obot-component', Obot);
