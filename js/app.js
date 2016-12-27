let game;

setup = () => {
	game = new Game();
	game.initGame();
}

draw = () => {
	if(!game.isGameOver) {
		game.drawGameElements();

		const crashInfo = game.getCarCrashStatus();

		if (crashInfo.isCrashed) {
			game.handleGameOver(crashInfo);
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