
document.addEventListener('DOMContentLoaded', () => {
  function autoSlideshow(id) {
    const container = document.getElementById(id);
    const slides = container.querySelectorAll("img");
    let index = 0;
    slides[index].classList.add("active");

    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 3000);
  }

  autoSlideshow("web-carousel");
  autoSlideshow("pos-carousel");
});

// Auto slide testimonials
document.addEventListener('DOMContentLoaded', () => {
  const testimonials = document.querySelectorAll('#testimonial-carousel .testimonial-card');
  let ti = 0;
  setInterval(() => {
    testimonials[ti].classList.remove('active');
    ti = (ti + 1) % testimonials.length;
    testimonials[ti].classList.add('active');
  }, 5000);
});


document.addEventListener('DOMContentLoaded', async () => {
  const ratesContainer = document.querySelectorAll('.converted-rate');

  async function detectCurrencyAndConvert() {
    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      const ipData = await ipRes.json();
      const country = ipData.country;
      const currency = ipData.currency;

      const rateRes = await fetch(`https://api.exchangerate.host/latest?base=GBP`);
      const rateData = await rateRes.json();
      const rate = rateData.rates[currency];

      if (!rate) return;

      ratesContainer.forEach(el => {
        const gbp = parseFloat(el.dataset.gbp);
        const converted = gbp * rate;
        el.innerText = `(≈ ${converted.toFixed(2)} ${currency})`;
      });
    } catch (err) {
      console.error("Currency conversion failed:", err);
    }
  }

  detectCurrencyAndConvert();
});
