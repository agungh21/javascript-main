const jam = 1;
const menit = 40;
const detik = 0;

let waktu = jam * 60 * 60 + 60 * menit + detik;

const ambilId = document.getElementById("countdown_hours");

setInterval(updateHitungMundur, 1000);

function updateHitungMundur() {
  let jams = Math.floor((waktu % (60 * 60 * 24)) / (60 * 60));
  let menits = Math.floor((waktu % (60 * 60)) / 60);
  let detiks = Math.floor(waktu % 60);

  jams = jams < 10 ? "0" + jams : jams;
  menits = menits < 10 ? "0" + menits : menits;
  detiks = detiks < 10 ? "0" + detiks : detiks;

  ambilId.innerHTML = `${jams} : ${menits} : ${detiks}`;
  waktu--;

  if (waktu < 0) {
    clearInterval(updateHitungMundur);
    ambilId.innerHTML = "Finish";
  }
}
