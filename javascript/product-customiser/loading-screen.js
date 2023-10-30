const loadingScreen = document.getElementById("loading-screen")
const loadingBar = document.getElementById("loading-bar");
const loadingBarValue = document.getElementById("loading-bar-value");


function UpdateLoadingBar(value)
{
    console.log(value);
    loadingBar.style.width = `${value / 5}%`;
    loadingBarValue.textContent = `${Math.round(value)}%`;
}

function HideLoadingScreen()
{
    const fadeEffect = setInterval(function () {
        if (!loadingScreen.style.opacity) {
            loadingScreen.style.opacity = 1;
        }
        if (loadingScreen.style.opacity > 0) {
            loadingScreen.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect);
            loadingScreen.style.display = 'none'; // Hide the element
        }
    }, 25);
}

export { UpdateLoadingBar, HideLoadingScreen }