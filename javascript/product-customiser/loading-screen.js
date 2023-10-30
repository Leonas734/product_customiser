class LoadingScreen extends HTMLElement{
    constructor()
    {
        super();
        this.loadingBar = this.querySelector("#loading-bar");
        this.loadingBarValue = this.querySelector("#loading-bar-value");
    }

    UpdateLoadingBar(value)
    {
        this.loadingBar.style.width = `${value / 5}%`;
        this.loadingBarValue.textContent = `${Math.round(value)}%`;
    }

    HideLoadingScreen()
    {
        const fadeEffect = setInterval(() => {
            if (!this.style.opacity) {
                this.style.opacity = 1;
            }
            if (this.style.opacity > 0) {
                this.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                this.style.display = 'none'; // Hide the element
            }
        }, 25);
    }
}

customElements.define("loading-screen", LoadingScreen);
