const hello = "hello";

try {
  console.log(hello.toUpperCase());
} catch {
  console.log("Error!");
}

function yell(msg) {
  try {
    console.log(msg.toUpperCase().repeat(3));
  } catch (error) {
    console.log(error);
    console.log("문자를 입력하세요");
  }
}

yell("3");
