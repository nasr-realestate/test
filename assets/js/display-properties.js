document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('properties-container');
  const category = 'apartments'; // اسم التصنيف

  // جلب قائمة ملفات JSON في التصنيف
  fetch(`/test/data/properties/${category}/index.json`)
    .then(response => {
      if (!response.ok) throw new Error("فشل في تحميل index.json");
      return response.json();
    })
    .then(propertyFiles => {
      container.innerHTML = '';
      propertyFiles.forEach(fileName => {
        // جلب محتوى كل ملف عقار
        fetch(`/test/data/properties/${category}/${fileName}`)
          .then(res => {
            if (!res.ok) throw new Error(`فشل في تحميل ${fileName}`);
            return res.json();
          })
          .then(data => {
            const card = document.createElement('div');
            card.className = 'property-card';
            card.style = `
              background: white;
              padding: 1.5rem;
              border-radius: 10px;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
              margin-bottom: 2rem;
            `;
            card.innerHTML = `
              <h2 style="color:#2c3e50">${data.title}</h2>
              <p><strong>السعر:</strong> ${data.price}</p>
              <p><strong>المساحة:</strong> ${data.area}</p>
              <p>${data.description}</p>
              <a href="${data.page_url}" style="display:inline-block;margin-top:1rem;background:#3498db;color:white;padding:0.6rem 1.2rem;border-radius:5px;text-decoration:none;">عرض التفاصيل</a>
            `;
            container.appendChild(card);
          })
          .catch(err => {
            console.error(err);
            container.innerHTML = '<p>حدث خطأ أثناء تحميل بيانات أحد العروض.</p>';
          });
      });
    })
    .catch(error => {
      console.error(error);
      container.innerHTML = '<p>حدث خطأ أثناء تحميل البيانات.</p>';
    });
});
