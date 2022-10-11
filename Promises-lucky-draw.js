function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));

      process.nextTick(() => {
        if (win) {
          resolve (console.log(`${player} won a prize in the draw!`))
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

luckyDraw("Joe")
.then(luckyDraw("Caroline"))
.then(luckyDraw("Sabrina"))
.catch((error) => console.log(error))
