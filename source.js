let n = 1;

function foo(num) {
  console.log("source.js(4:2)", num);
}

for (let i = 0; i < 5; i++) {
  foo(i);
}