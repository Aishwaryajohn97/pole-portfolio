document.addEventListener('DOMContentLoaded', () => {
  // ✅ Auto image slideshow
  function autoSlideshow(id) {
    const container = document.getElementById(id);
    if (!container) return;
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

  // ✅ Auto slide testimonials
  const testimonials = document.querySelectorAll('#testimonial-carousel .testimonial-card');
  let ti = 0;
  setInterval(() => {
    if (testimonials.length > 0) {
      testimonials[ti].classList.remove('active');
      ti = (ti + 1) % testimonials.length;
      testimonials[ti].classList.add('active');
    }
  }, 5000);

  // ✅ Currency conversion
  const ratesContainer = document.querySelectorAll('.converted-rate');

  const fallbackCurrencyMap = {
    'en-US': 'USD',
    'en-GB': 'GBP',
    'en-IN': 'INR',
    'fr-FR': 'EUR',
    'de-DE': 'EUR',
    'en-GH': 'GHS',
    'en-NG': 'NGN',
    'en-CA': 'CAD',
    'en-AU': 'AUD'
  };

  async function detectCurrencyAndConvert() {
    let currency = 'USD';

    try {
      const ipRes = await fetch('https://ipapi.co/json/', { cache: "no-store" });
      const ipData = await ipRes.json();
      if (ipData && ipData.currency) currency = ipData.currency;
      console.log("Detected currency:", currency);
    } catch (err) {
      const locale = navigator.language;
      currency = fallbackCurrencyMap[locale] || 'USD';
      console.log("Using fallback currency:", currency);
    }

    try {
      const rateRes = await fetch(`https://api.exchangerate-api.com/v4/latest/GBP`);
      const rateData = await rateRes.json();

      if (!rateData || !rateData.rates || !rateData.rates[currency]) {
        console.error("Exchange rates not found. Using fallback currency.");
        return;
      }

      const rate = rateData.rates[currency];
      console.log("Conversion rate for", currency, ":", rate);

      const symbols = {
        USD: '$',
        EUR: '€',
        INR: '₹',
        GHS: 'GH₵',
        NGN: '₦',
        CAD: 'C$',
        AUD: 'A$',
        GBP: '£'
      };

      if (!rate || !currency) return;

      ratesContainer.forEach(el => {
        const gbp = parseFloat(el.dataset.gbp);
        if (!isNaN(gbp)) {
          const converted = gbp * rate;
          const symbol = symbols[currency] || '';
          el.innerText = `(≈ ${symbol}${converted.toFixed(2)} ${currency})`;
        }
      });
    } catch (e) {
      console.error("Exchange rate fetch failed:", e);
      ratesContainer.forEach(el => {
        const gbp = parseFloat(el.dataset.gbp);
        if (!isNaN(gbp)) {
          el.innerText = `(≈ £${gbp} GBP)`;
        }
      });
    }
  }

  detectCurrencyAndConvert();
});
