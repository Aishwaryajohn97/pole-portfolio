
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

  // Auto slide testimonials
  const testimonials = document.querySelectorAll('#testimonial-carousel .testimonial-card');
  let ti = 0;
  setInterval(() => {
    testimonials[ti].classList.remove('active');
    ti = (ti + 1) % testimonials.length;
    testimonials[ti].classList.add('active');
  }, 5000);
});
