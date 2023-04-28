const h1 = document.querySelector("h1");

const sections = document.querySelectorAll("section");
const lis = document.querySelectorAll("ul li");
const box2_p = document.querySelector("p");

// 각 센션의 위치에 해당하는 값을 배열로 저장한 변수
let posArr = []; // 빈 배열을 만듦
// .offsetTop : 각 요소의 세로 위치값을 처음 시작점으로 나타내줍니다
const base = -500; // 해당 섹션의 정확한 offsetTop에 맞추면
// 사용자는 활성화된 모션을 보기 힘들기 때문에 활성화 모션을 좀 더
// 일ㅉ기 보도록 앞당기는 값을 담은 변수

for (let el of sections) {
  posArr.push(el.offsetTop);
} // 각 섹션의 offsetTop값을 배열에 넣는 반복문

// 버튼에 반복을 돌리면서 클릭이벤트를 걸어줍니다
lis.forEach((el, index) => {
  el.addEventListener("click", () => {
    // 해당 offsetTop위치로 이동시키는 코드
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

  // 검은색 박스 움직이기
  box2_p.style.left = `${scroll - posArr[1] + 300}px`;
  // 스크롤의 값을 연동해서 두번째 섹션 안에 있는 p태그의 left의 값을
  // 변경하도록 하는 코드입니다
  // scroll은 계속 늘어나는 큰 값, 여기에 해당 section의 offsetTop를 빼주어야
  // 연동할 수 있는 작은 값이 되기 때문입니다
  // 300은 디테일한 움직임을 조절하는 값입니다

  sections.forEach((el, index) => {
    // 스크롤 만으로 해당 offsetTop의 구간을 지날 때 자동으로 버튼에
    // 활성화를 시키는 코드
    if (scroll >= posArr[index] + base) {
      for (let el of lis) el.classList.remove("on");
      lis[index].classList.add("on");
      // 활성화된 섹션에 활성화 클래스를 붙여서
      // 박스 연동 모션을 이끌어내는 코드
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
