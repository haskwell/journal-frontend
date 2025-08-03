import { useState } from "react";

function MainPage() {
  const api = "http://localhost:8787/api";
  // const api = "https://journal-backend.haskwell.workers.dev/api";

  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [pageColor, setPageColor] = useState("");
  const [pageMood, setPageMood] = useState(5);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [resetEmail, setResetEmail] = useState("");

  const [output, setOutput] = useState("Waiting for action...");

  const showOutput = (data: string | object) => {
    if (typeof data === "string") {
      setOutput(data);
    } else {
      setOutput(JSON.stringify(data, null, 2));
    }
  };

  const register = async () => {
    const res = await fetch(`${api}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword }),
      credentials: "include",
    });

    const data = await res.json();
    showOutput(data);
  };

  const login = async () => {
    const res = await fetch(`${api}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: loginEmail, password: loginPassword }),
      credentials: "include",
    });

    const data = await res.json();
    showOutput(data);
  };

  const logout = async () => {
    const res = await fetch(`${api}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    showOutput(data);
  };

  const getMe = async () => {
    const res = await fetch(`${api}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    showOutput(data);
  };

  const requestPasswordReset = async () => {
    const res = await fetch(`${api}/password-reset-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: resetEmail }),
    });

    const data = await res.json();
    showOutput(data);
  };

  const createPage = async () => {
    const res = await fetch(`${api}/auth/page/new`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    showOutput(data);
  };

  const getPageList = async () => {
    const res = await fetch(`${api}/auth/page?start=0&end=10`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    showOutput(data);
  };

  const getPageByNumber = async () => {
    const res = await fetch(`${api}/auth/page/${pageNumber}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    showOutput(data);
  };

  const updatePage = async () => {
    const res = await fetch(`${api}/auth/page/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        pageNumber: parseInt(pageNumber, 10),
        title: pageTitle || undefined,
        content: pageContent || undefined,
        color: pageColor || undefined,
        mood: pageMood || undefined,
      }),
    });
    const data = await res.json();
    showOutput(data);
  };

  const deletePage = async () => {
    const res = await fetch(`${api}/auth/page/delete/${pageNumber}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    showOutput(data);
  };

return(
<>
  <div className="container my-5">
    <h1 className="mb-4 text-center">📝 Page API Tester</h1>

    <section className="mb-4">
      <h2>Register</h2>
      <div className="mb-3">
        <input className="form-control mb-2" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} placeholder="Username" />
        <input className="form-control mb-2" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email" />
        <input className="form-control mb-2" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-primary" onClick={register}>Register</button>
      </div>
    </section>

    <section className="mb-4">
      <h2>Login</h2>
      <div className="mb-3">
        <input className="form-control mb-2" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Username" />
        <input className="form-control mb-2" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-success" onClick={login}>Login</button>
      </div>
    </section>

    <section className="mb-4">
      <h2>Session</h2>
      <div className="mb-3">
        <button className="btn btn-warning me-2" onClick={logout}>Logout</button>
        <button className="btn btn-info" onClick={getMe}>Get /auth/me</button>
      </div>
    </section>

    <section className="mb-4">
      <h2>Request Password Reset</h2>
      <div className="mb-3">
        <input className="form-control mb-2" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="Email" />
        <button className="btn btn-secondary" onClick={requestPasswordReset}>Request Reset Link</button>
      </div>
    </section>

    <section className="mb-4">
      <h2>Pages</h2>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={createPage}>Create Page</button>
        <button className="btn btn-outline-primary" onClick={getPageList}>Get Page List</button>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <input className="form-control mb-2" value={pageNumber} onChange={(e) => setPageNumber(e.target.value)} placeholder="Page Number" />
        </div>
        <div className="col-md-8">
          <button className="btn btn-info me-2" onClick={getPageByNumber}>Get by Number</button>
          <button className="btn btn-danger" onClick={deletePage}>Delete Page</button>
        </div>
      </div>

      <div className="mb-3">
        <input className="form-control mb-2" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} placeholder="Title" />
        <input className="form-control mb-2" value={pageContent} onChange={(e) => setPageContent(e.target.value)} placeholder="Content" />
        <input className="form-control mb-2" value={pageColor} onChange={(e) => setPageColor(e.target.value)} placeholder="Color" />
        <input
          className="form-control mb-2"
          type="number"
          value={pageMood}
          onChange={(e) => setPageMood(parseInt(e.target.value))}
          placeholder="Mood (0-10)"
          min={0}
          max={10}
        />
        <button className="btn btn-success" onClick={updatePage}>Update Page</button>
      </div>
    </section>

    <section className="mb-4">
      <h2>Response</h2>
      <pre className="bg-light p-3 border rounded">{output}</pre>
    </section>
  </div>
</>
)

}

export default MainPage;
