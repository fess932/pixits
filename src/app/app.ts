import * as PIXI from "pixi.js"

export class App {
    private readonly a: string

    constructor(str: string) {
        this.a = str
    }

    sayHi(): void {
        console.log(this.a)
    }

    getBomber(): PIXI.AnimatedSprite {
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

    getBomberRight(): PIXI.AnimatedSprite {
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

    getBird(): PIXI.AnimatedSprite {
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
}
