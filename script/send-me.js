document.addEventListener('DOMContentLoaded', function() {
    const stickyBar = document.getElementById('sticky-container');
    const formSection = document.getElementById('eligibility');

    if (stickyBar && formSection) {
        const stickyBtn = stickyBar.querySelector('a');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyBar.classList.add('hidden-bar');
                } else {
                    stickyBar.classList.remove('hidden-bar');
                }
            });
        }, { threshold: 0.1 }); 

        observer.observe(formSection);

        if (stickyBtn) {
            stickyBtn.addEventListener('click', () => {
                stickyBar.classList.add('hidden-bar');
            });
        }
    }

    const form = document.getElementById("contact-form");
    if (form) {
        const status = document.getElementById("status");
        
        const timeField = form.querySelector("[name=form_time]");
        if (timeField) timeField.value = Date.now();

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            if (status) {
                status.textContent = "Sending...";
                status.style.color = "var(--primary)";
            }

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
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });

                if (!res.ok) throw new Error('Server error');

                const r = await res.json();

                if (r.success) {
                    form.innerHTML = "<div style='padding: 20px; background: #eafaf1; border-radius: 8px; text-align: center;'><h3 style='color: #27ae60; margin: 0;'>Thank you!</h3><p>Your inquiry has been sent successfully.</p></div>";
                    if (stickyBar) stickyBar.style.display = 'none';
                } else {
                    if (status) {
                        status.textContent = r.error || "Something went wrong.";
                        status.style.color = "#c0392b";
                    }
                }
            } catch (err) {
                if (status) {
                    status.textContent = "Network error. Please try again.";
                    status.style.color = "#c0392b";
                }
            }
        });
    }
});
