import html2canvas from './html2canvas.js';



Hooks.on("renderSceneControls", async function () {
    if (game.user.isGM) {
        let controls = document.getElementById("controls").getElementsByClassName('main-controls')[0];
        let li = document.createElement('li');

        li.classList = ["scene-control"]
        li.innerHTML = ' <i class="fas fa-palette"></i>';
        li.title = "open wombo art"
        controls.append(li);
        li.addEventListener("click", () => {
            openWombo()
        })
    }
})
class WomboWindow extends FrameViewer {

    _getHeaderButtons() {
        const buttons = [
            {
                label: "Close",
                class: "close",
                icon: "fas fa-times",
                onclick: () => this.close()
            },
            {
                label: "Share",
                class: "share",
                icon: "fas fa-share",
                onclick: () => this.shareArt()
            }
        ];
        for (let cls of this.constructor._getInheritanceChain()) {
            Hooks.call(`get${cls.name}HeaderButtons`, this, buttons);
        }
        return buttons;
    }
    shareArt() {
        console.log('yeeee');
        let mainFrame = this._element[0].getElementsByTagName('iframe')[0];
        html2canvas(mainFrame).then(function (canvas) {
            document.body.appendChild(canvas);
        });

    }
}
function openWombo() {

    let womboWindow = new WomboWindow("https://app.wombo.art/", {
        title: "wombo art",
        resizable: true,
        id: "womboArt"
    });





    womboWindow.render(true);
}

