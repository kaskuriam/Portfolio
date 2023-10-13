let currentPlayer = "X";
let gameOver = false;

function fazerJogada(tile) {
  if (tile.innerText === "" && !gameOver && currentPlayer === "X") {
    tile.innerText = currentPlayer;
    tile.classList.add("player" + currentPlayer);
    verificarVencedor();
    if (!gameOver) {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.querySelector(".display-player").innerText = currentPlayer;
      setTimeout(() => {
        fazerJogadaDaMaquina();
      }, 1000);
    }
  }
}

function fazerJogadaDaMaquina() {
  if (!gameOver && currentPlayer === "O") {
    const tiles = document.querySelectorAll(".tile");
    const emptyTiles = [];
    tiles.forEach((tile) => {
      if (tile.innerText === "") {
        emptyTiles.push(tile);
      }
    });

    if (emptyTiles.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyTiles.length);
      const randomEmptyTile = emptyTiles[randomIndex];

      randomEmptyTile.innerText = currentPlayer;
      randomEmptyTile.classList.add("player" + currentPlayer);
      verificarVencedor();

      currentPlayer = "X";
      document.querySelector(".display-player").innerText = currentPlayer;
    }
  }
}

function verificarVencedor() {
  const tiles = document.querySelectorAll(".tile");
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      tiles[a].innerText &&
      tiles[a].innerText === tiles[b].innerText &&
      tiles[a].innerText === tiles[c].innerText
    ) {
      gameOver = true;
      document.querySelector(
        ".announcer"
      ).innerText = `O jogador ${tiles[a].innerText} venceu!`;
      document.querySelector(".announcer").classList.remove("hide");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const mensagemConfirmacao = document.getElementById("mensagem-confirmacao");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    setTimeout(function () {
      mensagemConfirmacao.style.display = "block";

      form.reset();
    }, 2000);
  });
});
