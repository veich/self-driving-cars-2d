let game;

const restartGame = () => {
  game = new Game();
  const loadTrainedCar = false;
  const manualControl = false;
  game.initGame(loadTrainedCar, manualControl);
};

setup = () => {
  createCanvas(window.innerWidth , window.innerHeight);
  frameRate(0); 
  restartGame();
}

draw = () => {
  if(!game.isGameOver) {
    game.drawGameElements();

    const crashInfo = game.getCarCrashStatus();

    if (crashInfo.isCrashed) {
      game.handleGameOver(crashInfo);
      restartGame();
    } else {
      game.updateGameState();
    }
  }
}

keyPressed = () => {
  game.handleKeyPressedInputs();
}

keyTyped = () => {
  game.handleKeyTypedInputs();
}