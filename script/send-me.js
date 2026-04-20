window.addEventListener('scroll', function() {
    const stickyBar = document.getElementById('sticky-container');
    const formSection = document.getElementById('eligibility');
    
    if (!stickyBar || !formSection) return;

    // Gauname formos poziciją ekrane
    const rect = formSection.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        stickyBar.style.transform = 'translateY(100%)';
    } else {
        stickyBar.style.transform = 'translateY(0)';
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return; 

  const status = document.getElementById("status");

  // timestamp
  const timeField = form.querySelector("[name=form_time]");
  if (timeField) {
    timeField.value = Date.now();
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (status) status.textContent = "Sending...";

    const fd = new FormData(form);

    const data = {
      name: fd.get("your-name"),
      email: fd.get("your-email"),
      message: fd.get("your-message"),
      website: fd.get("website"),
      form_time: fd.get("form_time")
    };

    try {
      const res = await fetch("https://siusk.leaderprojects.com/siuntimas.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });

      const r = await res.json();

      if (r.success) {
        form.innerHTML = "<h3>Thank you! We will contact you shortly.</h3>";
      } else {
        if (status) status.textContent = "Something went wrong.";
      }

    } catch {
      if (status) status.textContent = "Network error.";
    }
  });
});
