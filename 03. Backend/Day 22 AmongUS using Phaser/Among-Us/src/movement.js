import { PLAYER_SPEED, SHIP_HEIGHT, SHIP_WIDTH } from "./constants";
import { mapBounds } from "./mapBounds";

const isPlayerWithinBoundaries = (x, y) => {
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

export const movePlayer = (keys, player) => {
  let hasPlayerMoved = false;

  const absolutePositionOfPlayer_X = player.x + SHIP_WIDTH / 2;
  const absolutePositionOfPlayer_Y = player.y + SHIP_HEIGHT / 2;

  if (
    keys.includes("ArrowUp") &&
    isPlayerWithinBoundaries(
      absolutePositionOfPlayer_X,
      absolutePositionOfPlayer_Y - PLAYER_SPEED
    )
  ) {
    hasPlayerMoved = true;
    player.sprite.y -= PLAYER_SPEED;
  }
  if (
    keys.includes("ArrowDown") &&
    isPlayerWithinBoundaries(
      absolutePositionOfPlayer_X,
      absolutePositionOfPlayer_Y + PLAYER_SPEED
    )
  ) {
    hasPlayerMoved = true;
    player.sprite.y += PLAYER_SPEED;
  }
  if (
    keys.includes("ArrowLeft") &&
    isPlayerWithinBoundaries(
      absolutePositionOfPlayer_X - PLAYER_SPEED,
      absolutePositionOfPlayer_Y
    )
  ) {
    hasPlayerMoved = true;
    player.sprite.x -= PLAYER_SPEED;
    player.flipX = true;
  }
  if (
    keys.includes("ArrowRight") &&
    isPlayerWithinBoundaries(
      absolutePositionOfPlayer_X + PLAYER_SPEED,
      absolutePositionOfPlayer_Y
    )
  ) {
    hasPlayerMoved = true;

    player.sprite.x += PLAYER_SPEED;
    player.flipX = false;
  }
  return hasPlayerMoved;
};
