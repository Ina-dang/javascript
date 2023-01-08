let input = prompt("무엇을 하시겠습니까? (list, new, delete, quit)");

const todos = ["거북이 구매", "휴지통 비우기"];

while (input !== "quit") {
  if (input === "list") {
    console.log("**********");
    for (let i = 0; i < todos.length; i++) {
      console.log(`${i}: ${todos[i]}`);
    }
    console.log("**********");
  } else if (input === "new") {
    const newTodo = prompt("새로운 할 일 등록");
    todos.push(newTodo);
    console.log(`${newTodo} Todo가 추가되었습니다.`);
  } else if (input === "delete") {
    const index = parseInt(prompt("지울 번호를 입력하세요"));
    if (!Number.isNaN(index)) {
      const deleted = todos.splice(index, 1);
      console.log(`${deleted} Todo가 삭제되었습니다.`);
    } else {
      console.log("찾을 수 없는 인덱스 입니다.");
    }
  }
  input = prompt("quit: 나가기, list: 목록보기, new: 추가, delete: 삭제");
}
console.log(input);
