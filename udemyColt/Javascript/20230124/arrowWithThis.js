const person = {
  firstName: "Ina",
  lastName: "dang",
  fullName: function () {
    // 화살표 함수를 하면 this가 undefined로 출력됨
    return `${this.firstName}-${this.lastName}`;
  },
  shoutName: function () {
    setTimeout(() => {
      //화살표 내에 있는 this는 함수 안 this와 범위가 같다
      console.log(this);
      console.log(this.fullName());
    }, 3000);
  },
};

person.shoutName();
