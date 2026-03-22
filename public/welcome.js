const email = sessionStorage.getItem("auth_email");
if (!email) {
  location.href = "index.html";
} else {
  document.getElementById("welcome-line").textContent =
    "You're signed in as " + email + ".";
}

document.getElementById("btn-logout").onclick = () => {
  sessionStorage.removeItem("auth_email");
  location.href = "index.html";
};
