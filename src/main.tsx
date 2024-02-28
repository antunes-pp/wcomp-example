import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import styled from "./index.css?inline";

export function defineEntry() {
  class MyComponentEntry extends HTMLElement {
    public static Name = "poc-shadow";
    private mountPoint!: HTMLDivElement;

    constructor() {
      super();
    }

    connectedCallback() {
      this.mountPoint = document.createElement("div");

      const style = document.createElement("style");
      style.innerHTML = styled;

      const shadowRoot = this.attachShadow({ mode: "open" });

      shadowRoot.appendChild(this.mountPoint);
      shadowRoot.appendChild(style);

      ReactDOM.createRoot(this.mountPoint).render(<App projectKey="" />);
    }
  }

  window.customElements.get(MyComponentEntry.Name) ||
    window.customElements.define(MyComponentEntry.Name, MyComponentEntry);
}

defineEntry();
