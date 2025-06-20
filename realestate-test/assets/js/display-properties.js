document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("offers");
  fetch("/data/properties/apartments/index.json")
    .then(res => res.json())
    .then(files => {
      container.innerHTML = "";
      files.forEach(file => {
        fetch(`/data/properties/apartments/${file}`)
          .then(res => res.json())
          .then(data => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
              <h2>${data.title}</h2>
              <p>${data.description}</p>
              <p class="price">${data.price}</p>
              <a href="${data.page_url}" class="buttons">عرض التفاصيل</a>
            `;
            container.appendChild(card);
          });
      });
    })
    .catch(() => {
      container.innerHTML = "تعذر تحميل العروض.";
    });
});
