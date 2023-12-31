const logoutFormHandler = async () => {
  // Make a POST request to destroy the session on the back end
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  // If logged out successfully, redirect to the login page
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to log out");
  }
};

document.querySelector("#logout").addEventListener("click", logoutFormHandler);
