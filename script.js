const correctPassword = "1234";

function checkPassword() {
  const input = document.getElementById("password").value;
  if (input === correctPassword) {
    document.getElementById("login").style.display = "none";
    document.getElementById("search").style.display = "block";
  } else {
    alert("パスワードが違います");
  }
}

async function search() {
  const number = document.getElementById("number").value;
  const res = await fetch("data.json");
  const data = await res.json();
  const result = data[number];
  const resultDiv = document.getElementById("result");
  if (result) {
    resultDiv.innerHTML = `<p>${result.name}</p><img src="${result.image}" width="200">`;
  } else {
    resultDiv.innerHTML = "<p>該当するデータがありません</p>";
  }
}
