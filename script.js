// 簡易パスワード（本番ではサーバーサイド認証を推奨）
const CORRECT_PASSWORD = "1234";

const loginSection = document.getElementById("login");
const searchSection = document.getElementById("search");
const errLogin = document.getElementById("err-login");
const errSearch = document.getElementById("err-search");
const resultDiv = document.getElementById("result");
const inputNumber = document.getElementById("number");

// ログイン処理
document.getElementById("btn-login").addEventListener("click", () => {
  const pw = document.getElementById("password").value.trim();
  if (pw === CORRECT_PASSWORD) {
    loginSection.style.display = "none";
    searchSection.style.display = "block";
  } else {
    errLogin.textContent = "パスワードが違います";
  }
});

// 検索ボックスにフォーカスが当たったらクリア
inputNumber.addEventListener("focus", () => {
  inputNumber.value = "";
  errSearch.textContent = "";
  resultDiv.innerHTML = "";
});

// 検索処理
document.getElementById("btn-search").addEventListener("click", async () => {
  const num = inputNumber.value.trim();
  errSearch.textContent = "";
  resultDiv.innerHTML = "";

  if (!num) {
    errSearch.textContent = "番号を入力してください";
    return;
  }

  try {
    const res = await fetch("data.json");
    const data = await res.json();
    const record = data[num];
    if (record) {
      resultDiv.innerHTML = `
        <p>${record.name}</p>
        <img src="${record.image}" alt="${record.name}">
      `;
    } else {
      errSearch.textContent = "該当するデータがありません";
    }
  } catch (e) {
    errSearch.textContent = "データの読み込みに失敗しました";
    console.error(e);
  }
});
