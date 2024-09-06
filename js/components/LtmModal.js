class Modal extends HTMLElement {

    container;
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'}); // Create a shadow DOM
        const defaultOpen = this.getAttribute('default-open')==="true";
        shadowRoot.innerHTML = `<slot></slot>`;
        this.container=this.firstElementChild;
        if(defaultOpen){
            this.open()
        }
    }

    open() {

        this.container.classList.add("ltm-modal-open")
    }
    close() {
        this.container.classList.remove("ltm-modal-open")
    }
}

customElements.define('modal-component', Modal);