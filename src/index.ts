import * as PIXI from "pixi.js"
import { App } from "./app/app"

import "./style.css"

import { config } from "./configs/config"

const pixiApp = new PIXI.Application(config)
const stage = pixiApp.stage
const app = new App("hello")

window.onload = async (): Promise<void> => {
    await loadGameAssets()
    document.body.appendChild(pixiApp.view)

    resizeCanvas()

    const bomberL = app.getBomber()
    bomberL.position.set(100, 100)

    const bomberR = app.getBomberRight()
    bomberR.position.set(200, 100)
    const birdFromSprite = app.getBird()
    birdFromSprite.anchor.set(0.5, 0.5)
    birdFromSprite.position.set(config.gameWidth / 2, config.gameHeight / 2)

    stage.addChild(birdFromSprite, bomberL, bomberR)
}

async function loadGameAssets(): Promise<void> {
    return new Promise((res, rej) => {
        const loader = PIXI.Loader.shared
        loader.add("rabbit", "./assets/simpleSpriteSheet.json")
        loader.add("bomber", "./assets/Bomberman.json")

        loader.onComplete.once(() => {
            res()
        })

        loader.onError.once(() => {
            rej()
        })

        loader.load()
    })
}

function resizeCanvas(): void {
    const resize = () => {
        // pixiApp.renderer.resize(window.innerWidth, window.innerHeight)
        // pixiApp.stage.scale.x = window.innerWidth / config.gameWidth
        // pixiApp.stage.scale.y = window.innerHeight / config.gameHeight
    }

    resize()

    window.addEventListener("resize", resize)
}
