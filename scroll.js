const h1 = document.querySelector("h1");

const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("ul li");

// 각 센션의 위치에 해당하는 값을 배열로 저장한 변수
let posArr = []; // 빈 배열을 만듦
// .offsetTop : 각 요소의 세로 위치값을 처음 시작점으로 나타내줍니다
const base = -500;

for (let el of sections) {
  posArr.push(el.offsetTop);
}
console.log(posArr);

lis.forEach((el, index) => {
  el.addEventListener("click", () => {
    new Anim(window, {
      prop: "scroll",
      value: posArr[index],
      duration: 500,
    });

    // 모든 버튼에 반복을 돌면서 on을 제거하여 비활성화하고
    for (let el of lis) el.classList.remove("on");

    // 클릭한 버튼만 on을 추가해서 활성화
    el.classList.add("on ");
    // lis[index].classList.add("on");
    // el.currentTarget.classList.add("on");
  });
});

window.addEventListener("scroll", () => {
  let scroll = window.scrollY || window.pageYOffset;
  // scrollY, pageYOffset 이 값은 완벽하게 같습니다 다만 최신버전 pageYOffest
  // scrollY 익스플로러에서 많이 사용하였고, 지금은 혼합해서 사용합니다
  // 따라서 둘 다 서로의 디폴트값으로 적어줍니다

  // 누구를 대상으로 반복을 돌 것인가?

  sections.forEach((el, index) => {
    if (scroll >= posArr[index] + base) {
      for (let el of lis) el.classList.remove("on");
      lis[index].classList.add("on");
      sections[index].classList.add("on");
    }
  });

  //   if (scroll >= posArr[0] && scroll < posArr[1]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[0].classList.add("on");
  //   }

  //   if (scroll >= posArr[1] && scroll < posArr[2]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[1].classList.add("on");
  //   }

  //   if (scroll >= posArr[2] && scroll < posArr[3]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[2].classList.add("on");
  //   }

  //   if (scroll >= posArr[3]) {
  //     for (let el of lis) el.classList.remove("on");
  //     lis[3].classList.add("on");
  //   }
});
