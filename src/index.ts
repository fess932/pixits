import * as PIXI from "pixi.js"
import "./style.css"

const config = {
    gameWidth: 800,
    gameHeight: 600,
    backgroundColor: 0xd3d3d3,
}

const app = new PIXI.Application(config)

const stage = app.stage

window.onload = async (): Promise<void> => {
    await loadGameAssets()

    document.body.appendChild(app.view)

    resizeCanvas()

    const bomberL = getBomber()
    bomberL.position.set(100, 100)

    const bomberR = getBomberRight()
    bomberR.position.set(200, 100)

    const birdFromSprite = getBird()
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
        app.renderer.resize(window.innerWidth, window.innerHeight)
        app.stage.scale.x = window.innerWidth / config.gameWidth
        app.stage.scale.y = window.innerHeight / config.gameHeight
    }

    resize()

    window.addEventListener("resize", resize)
}

function getBomber(): PIXI.AnimatedSprite {
    const sheet = PIXI.Loader.shared.resources["bomber"].spritesheet

    if (sheet == null) {
        throw "Таблица не найдена"
    }

    const bomberLeft = new PIXI.AnimatedSprite(sheet.animations["Left/Bman_F_f"])
    console.log(bomberLeft, "bomber")

    bomberLeft.anchor.set(1, 1)
    bomberLeft.updateAnchor = true
    bomberLeft.animationSpeed = 0.167
    bomberLeft.play()

    return bomberLeft
}

function getBomberRight(): PIXI.AnimatedSprite {
    const sheet = PIXI.Loader.shared.resources["bomber"].spritesheet

    if (sheet == null) {
        throw "Таблица не найдена"
    }

    const bomberR = new PIXI.AnimatedSprite(sheet.animations["Right/Bman_F_f"])
    console.log(bomberR, "bomberR")

    bomberR.updateAnchor = true
    bomberR.animationSpeed = 0.167
    bomberR.play()

    return bomberR
}

function getBird(): PIXI.AnimatedSprite {
    const bird = new PIXI.AnimatedSprite([
        PIXI.Texture.from("birdUp.png"),
        PIXI.Texture.from("birdMiddle.png"),
        PIXI.Texture.from("birdDown.png"),
    ])

    bird.loop = true
    bird.animationSpeed = 0.1
    bird.play()
    bird.scale.set(10)

    return bird
}
