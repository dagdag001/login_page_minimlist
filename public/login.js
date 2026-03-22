const err = document.getElementById("login-error");

document.getElementById("form-login").onsubmit = async (e) => {
  e.preventDefault();
  err.textContent = "";
  err.classList.add("hidden");
  const fd = new FormData(e.target);
  const email = String(fd.get("email") || "").trim().toLowerCase();
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password: String(fd.get("password") || ""),
    }),
  });
  if (!res.ok) {
    err.textContent = "Wrong email or password.";
    err.classList.remove("hidden");
    return;
  }
  sessionStorage.setItem("auth_email", email);
  location.href = "welcome.html";
};
