document.addEventListener('DOMContentLoaded', function() {
    const stickyBar = document.getElementById('sticky-container');
    const formSection = document.getElementById('eligibility');

    if (stickyBar && formSection) {
        const stickyBtn = stickyBar.querySelector('a');

        const checkVisibility = () => {
            const rect = formSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                stickyBar.classList.add('hidden-bar');
            } else {
                stickyBar.classList.remove('hidden-bar');
            }
        };

        stickyBtn.addEventListener('click', () => {
            stickyBar.classList.add('hidden-bar');
        });

        window.addEventListener('scroll', checkVisibility);
        checkVisibility();
    }

    const form = document.getElementById("contact-form");
    if (form) {
        const status = document.getElementById("status");
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
                    form.innerHTML = "<h3 style='color: var(--primary);'>Thank you! We will contact you shortly.</h3>";
                    if (stickyBar) stickyBar.style.display = 'none';
                } else {
                    if (status) status.textContent = "Something went wrong. Please try again.";
                }
            } catch (err) {
                if (status) status.textContent = "Network error. Please check your connection.";
            }
        });
    }
});
