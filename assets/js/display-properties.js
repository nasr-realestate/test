document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('properties-container');
  const category = 'apartments';

  fetch(`/test/data/properties/${category}/index.json`)
    .then(response => response.json())
    .then(propertyFiles => {
      container.innerHTML = '';
      propertyFiles.forEach(fileName => {
        fetch(`/test/data/properties/${category}/${fileName}`)
          .then(res => res.json())
          .then(data => {
            const card = document.createElement('div');
            card.className = 'property-card';
            card.style = `
              background: white;
              padding: 1rem;
              margin-bottom: 1.5rem;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            `;
            card.innerHTML = `
              <h2 style="color:#2c3e50">${data.title}</h2>
              <p><strong>السعر:</strong> ${data.price}</p>
              <p><strong>المساحة:</strong> ${data.area}</p>
              <p>${data.description}</p>
              <a href="${data.page_url}" style="display:inline-block;margin-top:10px;background:#3498db;color:white;padding:8px 12px;border-radius:5px;text-decoration:none;">عرض التفاصيل</a>
            `;
            container.appendChild(card);
          });
      });
    })
    .catch(error => {
      console.error('Error fetching properties:', error);
      container.innerHTML = '<p>حدث خطأ أثناء تحميل البيانات.</p>';
    });
});
