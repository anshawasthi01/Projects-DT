import Phaser from "phaser";
import { io } from "socket.io-client";
import logoImg from "./assets/logo.png";
import shipImg from "./assets/ship.png";
import playerSprite from "./assets/player.png";
import { movePlayer } from "./movement";
import { animateMovement } from "./animation";
import {
  getQueryParameter,
  getRandomString,
  updateQueryParameter,
} from "./utils";

import {
  PLAYER_SPITE_HEIGHT,
  PLAYER_SPITE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_START_POSITION_X,
  PLAYER_START_POSITION_Y,
  PLAYER_SPEED,
} from "./constants";

let player = {};
let otherPlayer = {};
let pressedKeys = [];
let socket;

const room = getQueryParameter("room") || getRandomString(5);
window.history.replaceState(
  {},
  document.title,
  updateQueryParameter("room", room)
);

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    socket = io(`localhost:3000?room=${room}`);
    this.load.image("logo", logoImg);
    this.load.image("logo", shipImg);
    this.load.spritesheet("player", playerSprite, {
      frameWidth: PLAYER_SPITE_WIDTH,
      frameHeight: PLAYER_SPITE_HEIGHT,
    });
    this.load.spritesheet("otherPlayer", playerSprite, {
      frameWidth: PLAYER_SPITE_WIDTH,
      frameHeight: PLAYER_SPITE_HEIGHT,
    });
  }

  create() {
    const ship = this.add.image(0, 0, "logo");
    player.sprite = this.add.sprite(
      PLAYER_START_POSITION_X,
      PLAYER_START_POSITION_Y,
      "player"
    );
    player.sprite.displayHeight = PLAYER_HEIGHT;
    player.sprite.displayWidth = PLAYER_WIDTH;
    otherPlayer.sprite = this.add.sprite(
      PLAYER_START_POSITION_X,
      PLAYER_START_POSITION_Y,
      "player"
    );
    otherPlayer.sprite.displayHeight = PLAYER_HEIGHT;
    otherPlayer.sprite.displayWidth = PLAYER_WIDTH;

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("player", { start: 0, end: 3 }),
      frameRate: 24,
      repeat: -1,
    });

    this.input.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
      //   if (e.key === "ArrowUp") {
      //     player.sprite.y -= PLAYER_SPEED;
      //   }
      //   if (e.key === "ArrowDown") {
      //     player.sprite.y += PLAYER_SPEED;
      //   }
      //   if (e.key === "ArrowLeft") {
      //     player.sprite.x -= PLAYER_SPEED;
      //   }
      //   if (e.key === "ArrowRight") {
      //     player.sprite.x += PLAYER_SPEED;
      //   }
    });
    this.input.on("keyup", (e) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    socket.on("move", ({ x, y }) => {
      console.log("Received move event from backend");
      if (otherPlayer.sprite.x > x) {
        otherPlayer.sprite.flipX = true;
      } else if (otherPlayer.x < x) {
        otherPlayer.sprite.flipX = false;
      }

      otherPlayer.sprite.x = x;
      otherPlayer.sprite.y = y;
      otherPlayer.moving = true;
    });
    socket.on("moveEnd", () => {
      console.log("Received move-end event from backend");
      otherPlayer.moving = false;
    });

    // this.tweens.add({
    //   targets: logo,
    //   y: 450,
    //   duration: 2000,
    //   ease: "Power2",
    //   yoyo: true,
    //   loop: -1,
    // });
  }

  update() {
    this.scene.scene.main.centerOn(player.sprite.x, player.sprite.y);
    const hasPlayerMoved = movePlayer(pressedKeys, player.sprite);
    if (hasPlayerMoved) {
      socket.emit("move", { x: player.sprite.x, y: player.sprite.y });
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        socket.emit("moveEnd");
      }
      player.movedLastFrame = false;
    }
    animateMovement(pressedKeys, player.sprite);

    // Animate other player
    if (otherPlayer.moving && !otherPlayer.sprite.anims.isPlaying) {
      otherPlayer.sprite.play("running");
    } else if (!otherPlayer.moving && otherPlayer.sprite.anims.isPlaying) {
      otherPlayer.sprite.stop("running");
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 450,
  scene: MyGame,
};

const game = new Phaser.Game(config);
