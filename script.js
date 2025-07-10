// 簡易パスワード（本番ではサーバーサイド認証を推奨）
const CORRECT_PASSWORD = "1234";

const loginSection = document.getElementById("login");
const searchSection = document.getElementById("search");
const errLogin = document.getElementById("err-login");
const errSearch = document.getElementById("err-search");
const resultDiv = document.getElementById("result");
const inputNumber = document.getElementById("number");
const btnSearch = document.getElementById("btn-search");

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

// フォーカス時に入力クリア
inputNumber.addEventListener("focus", () => {
  inputNumber.value = "";
  errSearch.textContent = "";
  resultDiv.innerHTML = "";
});

// 検索ロジックを関数化
async function performSearch() {
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
        <p><strong>${record.name}</strong></p>
        <p>${record.class}</p>
        <p>チーム：${record.team}　走順：${record.order}</p>
        <img src="${record.image}" alt="${record.name}">
      `;
    } else {
      errSearch.textContent = "該当するデータがありません";
    }
  } catch (e) {
    errSearch.textContent = "データの読み込みに失敗しました";
    console.error(e);
  }
}

// ボタンクリックで検索
btnSearch.addEventListener("click", performSearch);

// Enterキーで検索
inputNumber.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();  // フォーム送信などを防止
    performSearch();
  }
});
