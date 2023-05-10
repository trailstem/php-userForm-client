//useState import
import React, { useState } from "react";
import TextBox from "./components/Textbox";
import Button from "./components/Button";

function App() {
  //フォーム入力値の状態管理
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //popupメッセージの状態管理
  const [popup, setPopup] = useState("");

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handlePopupClose = () => {
    setPopup("");
  };

  //送信ボタン押下時処理
  const handlesubmit = async (e) => {
    e.preventDefault();
    //フォームの入力値を取得
    const formData = {
      username: username,
      email: email,
      password: password,
    };

    //リクエストオプションを設定
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(
      "http://localhost:8888/userForm/server/",
      requestOptions
    );
    //レスポンスがエラーだった場合
    if (!response.ok) {
      const data = await response.json();
      setPopup(data.message);
      clearForm();
    } else {
      //レスポンスが返ってきたら、jsonに変換して、コンソールに表示
      const data = await response.json();
      setPopup(data.message);
      clearForm();
    }
  };

  return (
    <>
      {/* tailwindcssを使用して画面中央にフォームをまとめる */}
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/3 border border-gray-400 rounded p-4">
          <h1 className="text-2xl font-bold mb-4">ユーザ登録フォーム</h1>

          <form onSubmit={handlesubmit} method="POST">
            {/* input要素をリスト形式で並べ、左寄せにする */}
            <div className="flex flex-col mb-4">
              <div className="mb-2">
                <TextBox
                  name="name"
                  label="名前"
                  type="text"
                  placeholder=""
                  value={username}
                  setValue={setUsername}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* テキストボックスどうしの間隔をあける */}
              <div className="mb-2">
                <TextBox
                  name="email"
                  label="メールアドレス"
                  type="email"
                  placeholder=""
                  value={email}
                  setValue={setEmail}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="">
                <TextBox
                  name="password"
                  label="パスワード"
                  type="password"
                  placeholder=""
                  value={password}
                  setValue={setPassword}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <Button
              name="送信"
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            />
          </form>
          {/* ポップアップ表示 */}
          {popup && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
              <Button
                name="閉じる"
                className="absolute w-full h-full bg-black opacity-50"
                onClick={handlePopupClose}
              />
              <div className="bg-white z-10 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">{popup}</h2>
                <Button
                  name="閉じる"
                  className="bg-blue-500 text-white rounded px-4 py-2"
                  onClick={handlePopupClose}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
