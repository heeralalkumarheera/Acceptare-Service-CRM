document.getElementById("leadForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const lead = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    status: document.getElementById("status").value,
  };

  console.log("Lead Saved:", lead);
  alert("Lead added successfully!");

  this.reset();
});
