const getColor = (num) => {
  if (num > 1 || num < 0) {
    console.warn("goofed", num);
  }
  const i = Math.round(num * 255).toString(16);
  if (i > 255 || i < 0) {
    console.warn("wonky", i);
  }
  const color = Number.parseInt("0x" + i + i + i);
  return color;
};

const generateShape = (min, max, num, texture, app) => {
  const step = (max - min) / num;

  for (let i = max; i >= min; i -= step) {
    let star = new PIXI.Sprite(texture);

    star.anchor.set(0.5);

    // Finally lets set the star to be at a random position..
    star.setSize(i, i);

    star.x = app.renderer.width / 2;
    star.y = app.renderer.height / 2;

    star.setSize(i, i);
    const color = getColor(i / max);
    if (color > 0xffffff) {
      console.warn("funky", color);
    }
    star.tint = color;

    app.stage.addChild(star);
  }
};

// Create the application helper and add its render target to the page
const app = new PIXI.Application();
await app.init({ width: 512, height: 512 });
document.querySelector(".container").appendChild(app.canvas);

app.renderer.background.color = 0xffffff;

// Create the sprite and add it to the stage
let texture = await PIXI.Assets.load("star.png");

document.querySelector("#texture").addEventListener("change", async () => {
  const text_image = document.querySelector("#texture").files[0];
  if (text_image) {
    const blob = URL.createObjectURL(text_image);
    console.log(blob);
    texture = await PIXI.Assets.load({ src: blob, loadParser: "loadTextures" });
  }
});

document.querySelector("#generate").addEventListener("click", () => {
  const min = document.querySelector("#min").value;
  const max = document.querySelector("#max").value;
  const num = document.querySelector("#num").value;

  app.stage.removeChildren();

  generateShape(min, max, num, texture, app);
});
