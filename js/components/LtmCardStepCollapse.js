class LtmCardStepCollapse extends HTMLElement {

    mode = "";
    step = 0;
    container;
    storageKey;
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'}); // Create a shadow DOM
        this.storageKey = this.getAttribute('storage-key');
        const urlParams = new URLSearchParams(window.location.search); // Parse the query string
        const paramName = 'resetConfig'; // Replace with the actual name of your parameter
        const paramValue = urlParams.get(paramName);

        if (paramValue) {
            localStorage.removeItem(this.storageKey);
        }

        this.mode=localStorage.getItem( this.storageKey)||this.getAttribute('default-mode');



        shadowRoot.innerHTML = `<slot></slot>`;
        this.container = this.firstElementChild;
        this.useEffect();
    }

    useEffect() {
        if (this.mode!=="") {
            this.container.classList.remove("d-none");
        } else {
            this.container.classList.add("d-none");
        }
        const elements = this.container.querySelectorAll('[data-show]');
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const dataShowValue = element.dataset.show;
            const visibleIn = (dataShowValue.includes(";") ? dataShowValue.split(";") : [dataShowValue]).filter(Boolean);
            const visible = visibleIn.includes(`${this.mode}_${this.step}`);
            // console.log(element,visibleIn, visible,`${this.mode}_${this.step}`)
            if (visible) {
                element.classList.remove("d-none");
            } else {
                element.classList.add("d-none");
            }
        }
    }

    edit() {
        this.step=1;
        this.useEffect();
    }
    confirm(setMode,isFinal=false) {
        this.mode=setMode(this.mode)||"";
        localStorage.setItem(this.storageKey, this.mode);
        if(isFinal){
            this.finally();
        }else{
        this.step=2;
        }
        this.useEffect();
    }
    finally() {
        this.step=0;
        this.useEffect();
        history.replaceState({}, document.title, window.location.pathname);
        window.location.reload();
    }
    cancel(){
        this.step=0;
        this.useEffect();
    }
}

customElements.define('ltm-card-step-collapse-component', LtmCardStepCollapse);