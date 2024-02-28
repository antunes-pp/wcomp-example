import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import styled from "./index.css?inline";

export function defineEntry() {
  class MyComponentEntry extends HTMLElement {
    public static Name = "poc-shadow";
    private mountPoint!: HTMLDivElement;
    private root: ReactDOM.Root | null = null;
    private projectKey: string = "";

    static observedAttributes = ["project-key"];

    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: "open" });
      this.mountPoint = document.createElement("div");
      shadowRoot.appendChild(this.mountPoint);

      const style = document.createElement("style");
      style.innerHTML = styled;
      shadowRoot.appendChild(style);
    }

    connectedCallback() {
      if (!this.root) {
        this.root = ReactDOM.createRoot(this.mountPoint);
      }
      this.render();
    }

    private render() {
      if (!this.projectKey || !this.root) {
        return;
      }

      this.root.render(<App projectKey={this.projectKey} />);
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
      if (name === "project-key" && newValue !== oldValue) {
        this.projectKey = newValue || "";
        this.render();
      }
    }
  }

  window.customElements.get(MyComponentEntry.Name) ||
    window.customElements.define(MyComponentEntry.Name, MyComponentEntry);
}

defineEntry();

// export function defineEntry() {
//   class MyComponentEntry extends HTMLElement {
//     public static Name = "poc-shadow";
//     private mountPoint!: HTMLDivElement;

//     constructor() {
//       super();
//     }

//     connectedCallback() {
//       this.mountPoint = document.createElement("div");

//       const style = document.createElement("style");
//       style.innerHTML = styled;

//       const shadowRoot = this.attachShadow({ mode: "open" });

//       shadowRoot.appendChild(this.mountPoint);
//       shadowRoot.appendChild(style);

//       ReactDOM.createRoot(this.mountPoint).render(<App projectKey=""/>);
//     }
//   }

//   window.customElements.get(MyComponentEntry.Name) ||
//     window.customElements.define(MyComponentEntry.Name, MyComponentEntry);
// }

defineEntry();
