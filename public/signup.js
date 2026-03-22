const err = document.getElementById("signup-error");

document.getElementById("form-signup").onsubmit = async (e) => {
  e.preventDefault();
  err.textContent = "";
  err.classList.add("hidden");
  const fd = new FormData(e.target);
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim().toLowerCase(),
      password: String(fd.get("password") || ""),
      location: String(fd.get("location") || "").trim(),
      birthdate: String(fd.get("birthdate") || "").trim(),
    }),
  });
  if (res.status === 409) {
    err.textContent = "This email is already registered. Log in instead.";
    err.classList.remove("hidden");
    return;
  }
  if (!res.ok) {
    err.textContent = "Could not create account. Try again.";
    err.classList.remove("hidden");
    return;
  }
  location.replace("index.html");
};
