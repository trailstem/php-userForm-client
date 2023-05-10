//useState import
import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      email: email,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    console.log(formData);
    const response = await fetch(
      "http://localhost:8888/userForm/server/",
      requestOptions
    );
    //レスポンスがエラーだった場合
    if (!response.ok) {
      console.log("error");
      clearForm();
    } else {
      //レスポンスが返ってきたら、jsonに変換して、コンソールに表示
      const data = await response.json();
      console.log(data);
      clearForm();
    }
  };

  return (
    <>
      {/* 基本的なユーザフォーム作成 */}
      <form onSubmit={handlesubmit} method="POST">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
