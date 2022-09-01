const colorList = document.querySelector(".color__list");
const success = document.querySelector(".success");
const addReview = document.querySelector(".add-review");
const colors = [
  "#EDD5B1",
  "#EBD3AF",
  "#EDE556",
  "#660B10",
  "#EAD2AE",
  "#670C11",
  "#ECE356",
  "#680D12",
  "#690E13",
  "#EDE556",
  "#999A9F",
  "#011866",
  "#104A18",
  "#077C85",
  "#0F4917",
  "#067B84",
];

const changeTabs = (event) => {
  const tabID = event.target.dataset.tab;
  const currentContent = document.getElementById(tabID);
  const tabs = document.querySelectorAll(".tabs__item");
  const content = document.querySelectorAll(".tabs__content");

  tabs.forEach((tab) => {
    tab.classList.remove("active");
    content.forEach((element) => {
      element.classList.remove("active");
    });
  });

  if (!event.target.classList.contains("active")) {
    event.target.classList.add("active");
    currentContent.classList.add("active");
  }
};

document.querySelector(".tabs__list").addEventListener("click", changeTabs);

let swiper = new Swiper(".mySwiper.card-slider", {
  navigation: {
    nextEl: ".card-next",
    prevEl: ".card-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

let needSwiper = new Swiper(".need-slider", {
  navigation: {
    nextEl: ".need-next",
    prevEl: ".need-prev",
  },

  breakpoints: {
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    900: {
      slidesPerView: 3,
    },
    1290: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

let ratingSwiper = new Swiper(".rating-slider", {
  navigation: {
    nextEl: ".rating-next",
    prevEl: ".rating-prev",
  },
  breakpoints: {
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    900: {
      slidesPerView: 3,
    },
    1100: {
      slidesPerView: 4,
      spaceBetween: 20,
    },
  },
});

colors.map((color) => {
  let html = `
    <div class="color__item" data-color="color" style="background-color: ${color}"></div>
  `;

  return colorList.insertAdjacentHTML("beforeend", html);
});

const colorItems = document.querySelectorAll(".color__item");

colorItems.forEach((color) => {
  colorItems[0].classList.add("active");
});

const init = () => {
  let map = new ymaps.Map("map", {
    center: [53.36060307110747, 83.69665499999996],
    zoom: 16,
  });
};

ymaps.ready(init);

const telMask = () => {
  let eventCalllback = function (e) {
    let el = e.target,
      clearVal = el.dataset.phoneClear,
      pattern = el.dataset.phonePattern,
      matrix_def = "+7(___) ___-__-__",
      matrix = pattern ? pattern : matrix_def,
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = e.target.value.replace(/\D/g, "");

    if (clearVal !== "false" && e.type === "blur") {
      if (val.length < matrix.match(/([\_\d])/g).length) {
        e.target.value = "";
        return;
      }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
          ? ""
          : a;
    });
  };

  let phone_inputs = document.querySelectorAll("[data-phone-pattern]");
  for (let elem of phone_inputs) {
    for (let ev of ["input", "blur", "focus"]) {
      elem.addEventListener(ev, eventCalllback);
    }
  }
};

telMask();

if (window.innerWidth <= 650) {
  document.querySelector(".questions__title").textContent = "Остались вопросы?";
  document.querySelector(".questions__text").textContent =
    "Мы ответим на каждый";
}

if (window.innerWidth >= 1200) {
  document.addEventListener("scroll", () => {
    const help = document.querySelector(".help");
    let rect = document.querySelector(".tabs").getBoundingClientRect();

    if (rect.top <= 0 || rect.top < 400) {
      help.style.position = "fixed";
      help.style.bottom = 0;
      help.style.right = 0;
    } else {
      help.style.position = "absolute";
      help.style.bottom = "unset";
    }
  });
}

const chooseParameters = (event, items) => {
  if (event.target.classList.contains(`${items}`)) {
    const itemsBlock = document.querySelectorAll(`.${items}`);

    itemsBlock.forEach((item) => {
      item.classList.remove("active");
    });

    if (!event.target.classList.contains("active")) {
      event.target.classList.add("active");
    }
  }
};

document
  .querySelector(".thickness__list")
  .addEventListener("click", (event) => {
    chooseParameters(event, "thickness__item");
  });

document.querySelector(".color__list").addEventListener("click", (event) => {
  chooseParameters(event, "color__item");
});

document
  .querySelector(".reviews__tabs-list")
  .addEventListener("click", (event) => {
    chooseParameters(event, "reviews__tabs-item");
  });

const counter = () => {
  const counter = document.querySelectorAll(".count-wrapper");

  counter.forEach((item) => {
    item.addEventListener("click", (event) => {
      if (event.target.classList.contains("min")) {
        if (event.target.nextElementSibling.value > 0) {
          event.target.nextElementSibling.value -= 1;
        }
      }
      if (event.target.classList.contains("plus")) {
        event.target.previousElementSibling.value++;
      }
    });
  });
};

counter();

function download(input) {
  const reviewImages = document.querySelector(".add-review__images");
  const text = document.querySelector(".add-review__photo-wrapper label span");

  console.log(text);

  console.log(reviewImages);
  let file = input.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function () {
    let img = document.createElement("img");
    img.classList.add("add-review__img");

    let html = `
      <div class="add-review__img-wrapper">
        <img class=add-review__img src="${reader.result}" alt="photo"/>
      </div> 
    `;

    reviewImages.insertAdjacentHTML("beforeend", html);

    if (reviewImages.childElementCount > 0) {
      text.style.display = "none";
    }
  };
}

document
  .querySelector(".add-review__btn")
  .addEventListener("click", (event) => {
    event.preventDefault();
    addReview.style.display = "none";
    success.style.display = "block";
  });

document.querySelector(".success__close").addEventListener("click", () => {
  success.style.display = "none";
});

document.querySelector(".reviews__header-btn").addEventListener("click", () => {
  addReview.style.display = "block";
});

const ratingItemsList = document.querySelectorAll(".rating-result-item.hov");
const ratingItemsArray = Array.prototype.slice.call(ratingItemsList);

ratingItemsArray.forEach((item) => {
  item.addEventListener("click", () => {
    item.parentNode.dataset.totalValue = item.dataset.itemValue;
  });
});
