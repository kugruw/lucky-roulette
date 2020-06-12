const roda = document.querySelector("img[alt=roda-putar]");
const putar = document.getElementById("roll");
const btn = document.querySelectorAll(".kotak");
const myChance = document.querySelector(".num-chance");
const arrow = document.querySelectorAll("img[alt=arrow]");
const input = document.querySelector("input[type=text]");
const alrt = {
  btn: document.querySelectorAll(".alert-btn"),
  notif: document.querySelector(".con-alert"),
  quest: document.getElementById("quest"),
  historyPrice: document.getElementById("history"),
  info: document.querySelector(".info"),
  head: document.querySelector(".head"),
  text: document.querySelector("div[class=text]"),
};
const deg = 1080;
let chance = 0;
const questLabel1 = document.getElementById("question1");
const questLabel2 = document.getElementById("question2");
const timeChance = document.querySelector("span[class=text]");
const sfx = document.querySelector("audio");
const sfxMenu = document.getElementById("menu");

function sound(src) {
  sfx.setAttribute("src", src);
  sfx.play();
}

function rotateMation(el, introtate) {
  el.style.transform = "rotate(" + introtate + "deg)";
  el.style.transition = "transform 0.1s ease";
}

window.addEventListener("load", function () {
  document.querySelector(".con-loader").style.display = "none";
  document.querySelector(".container").style.display = "block";
  document.querySelector("html").removeAttribute("style");
});

function addNewHistory(dapet) {
  const conText = document.createElement("div");
  const time = document.createElement("span");
  const price = document.createElement("span");
  const textPrice = document.createTextNode(dapet);

  price.appendChild(textPrice);
  conText.appendChild(time);
  conText.appendChild(price);

  conText.setAttribute("class", "con-text");
  time.classList.add("text", "time");
  price.classList.add("text", "price");
  alrt.historyPrice.insertBefore(conText, alrt.btn[3]);

  (function () {
    let tgl = new Date().getDate();
    let bln = {
      intBln: new Date().getMonth(),
      stringBln: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      method: function (x) {
        return this.stringBln[x];
      },
    };
    let thn = new Date().getYear() - 100;
    let jam = new Date().getHours();
    let menit = {
      min: new Date().getMinutes(),
      method: function (x) {
        if (x < 10) return "0" + x;
        else return x;
      },
    };
    time.innerHTML =
      tgl +
      " " +
      bln.method(bln.intBln) +
      " " +
      thn +
      " &nbsp; " +
      jam +
      ":" +
      menit.method(menit.min);
  })();
}

function red() {
  alrt.head.classList.add("info-style");
  alrt.head.classList.remove("green-style");
  alrt.head.innerHTML = "Sorry...";
  sound("../sfx/lose_tour_01.ogg");
}

function green() {
  alrt.head.classList.remove("info-style");
  alrt.head.classList.add("green-style");
}

function rotate(n, dapet) {
  sound("../sfx/scroll_preresult_loop_01.ogg");
  const bgSound = document.getElementById("bgSound");
  bgSound.setAttribute("src", "");
  let awal = 0;
  let on = setInterval(function () {
    if (awal == n) {
      //Make a elegant code
      putar.disabled = false;
      if (timeChance.innerText == "Get Your Chance") btn[0].disabled = false;
      btn[1].disabled = false;
      putar.style.cursor = "pointer";
      clearInterval(on);
      sound("../sfx/get_crown_03.ogg");
      bgSound.setAttribute("src", "../sfx/wizmen04.ogg");
      alrt.notif.style.display = "flex";
      alrt.info.style.display = "block";
      alrt.head.innerHTML = "Selamat!";
      alrt.text.innerHTML = "Anda mendapatkan " + dapet;
      addNewHistory(dapet);
    } else {
      awal++;
      //Make a elegant code
      putar.disabled = true;
      btn[0].disabled = true;
      btn[1].disabled = true;
      putar.style.cursor = "wait";
      roda.style.transform = "rotate(" + awal + "deg)";
    }
  }, 5);
}

function hadiah() {
  if (chance > 0) {
    let random = Math.floor(Math.random() * 11);
    switch (random) {
      case 0:
      case 10:
        rotate(deg + 276, "kopi");
        break;
      case 5:
      case 6:
        rotate(deg + 130, "sabun");
        break;
      case 3:
      case 9:
        rotate(deg + 74, "beras");
        break;
      case 1:
        rotate(deg + 354, "kacang");
        break;
      case 2:
        rotate(deg + 16, "gula");
        break;
      case 4:
        rotate(deg + 140, "helm");
        break;
      case 7:
        rotate(deg + 220, "sirup");
        break;
      case 8:
        rotate(deg + 230, "cabai");
    }
    chance--;
    return (myChance.innerHTML = chance + "X");
  } else {
    alrt.notif.style.display = "flex";
    alrt.info.style.display = "block";
    red();
    alrt.text.innerHTML = "You have no chance";
  }
}

function question() {
  var n1 = Math.floor(Math.random() * 11);
  var n2 = Math.floor(Math.random() * 6);
  questLabel1.innerHTML = n1;
  questLabel2.innerHTML = n2;
  input.setAttribute("maxlength", (n1 + n2).toString().length);
}

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    alrt.notif.style.display = "flex";
    rotateMation(arrow[i], 0);
    if (i == 0) {
      alrt.quest.style.display = "block";
      question();
      input.value = "";
      input.setAttribute("placeholder", "");
      input.style.borderColor = "chartreuse";
      btn[i].disabled = true;
      let nextTime = new Date().getTime() + 15000;
      let jalan = setInterval(function () {
        let time = new Date().getTime();
        timeChance.innerHTML =
          "Wait for " + Math.round((nextTime - time) / 1000) + " seconds";
      }, 1000);
      setTimeout(function () {
        clearInterval(jalan);
        timeChance.innerText = "Get Your Chance";
      }, 15000);
      setTimeout(function () {
        btn[i].disabled = false;
      }, 15000);
    } else {
      alrt.historyPrice.style.display = "block";
    }
  });
}

for (var i = 0; i < alrt.btn.length; i++) {
  if (i == 2) {
    alrt.btn[i].addEventListener("click", function () {
      let n1 = questLabel1.innerHTML;
      let n2 = questLabel2.innerHTML;
      let ans = parseInt(n1) + parseInt(n2);
      alrt.quest.style.display = "none";
      alrt.notif.style.display = "flex";
      rotateMation(arrow[0], 180);
      alrt.info.style.display = "block";
      if (input.value == ans) {
        chance++;
        sound("../sfx/get_xp_01.ogg");
        green();
        alrt.head.innerHTML = "Nice Answer";
        alrt.text.innerHTML = "+1 Chance";
        return (myChance.innerHTML = chance + "X");
      } else {
        red();
        alrt.text.innerHTML = "Wrong answer";
        sound("../sfx/king_mad_02.ogg");
      }
    });
  } else {
    alrt.btn[i].addEventListener("click", function (e) {
      e.target.parentElement.classList.add("close-motion");
      setTimeout(function () {
        e.target.parentElement.classList.remove("close-motion");
        e.target.parentElement.style.display = "none";
        e.target.parentElement.parentElement.style.display = "none";
        rotateMation(arrow[0], 180);
        rotateMation(arrow[1], 180);
      }, 200);
    });
  }
}

putar.addEventListener("click", hadiah);

const allBtn = document.getElementsByTagName("button");

for (var i = 0; i < allBtn.length; i++) {
  allBtn[i].addEventListener("click", function () {
    sfxMenu.play();
  });
}

/*Konsep pertanyaan: 
- random
- kirim
- dapetin
- to integer
- execute

To do: - animation, clean code (make a function if some code used repeatedly), make a minim var (use object)

360 + 360 = 720
if(512)
    >hasil 720-512
putarlagi = hasil + rotatenya*/
