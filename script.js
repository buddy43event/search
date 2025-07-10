// 簡易パスワード（本番では漏えいしない本格認証を推奨）
const CORRECT_PASSWORD = "1234";

document.getElementById("btn-login").addEventListener("click", () => {
  const pw = document.getElementById("password").value.trim();
  if (pw === CORRECT_PASSWORD) {
    document.getElementById("login").style.display = "none";
    document.getElementById("search").style.display = "block";
  } else {
    document.getElementById("err-login").textContent = "パスワードが違います";
  }
});

document.getElementById("btn-search").addEventListener("click", async () => {
  const num = document.getElementById("number").value.trim();
  const err = document.getElementById("err-search");
  const resultDiv = document.getElementById("result");
  err.textContent = "";
  resultDiv.innerHTML = "";

  if (!num) {
    err.textContent = "番号を入力してください";
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
      err.textContent = "該当するデータがありません";
    }
  } catch (e) {
    err.textContent = "データの読み込みに失敗しました";
    console.error(e);
  }
});
