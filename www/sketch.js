time = 0.0;

function draw() {
  fill("blue");
  rect(20, 20, 50, 50);
  noFill();

  Array.from(p5Root.getElementsByClassName("noisy")).forEach((el) => {
    el.setAttribute("x", el.x + (noise(time) - 0.5));
    el.setAttribute("y", el.y + (noise(time + 10) - 0.5));
  });

  time += 0.01;
}
