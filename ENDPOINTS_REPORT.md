# Endpoints & Pagination Integration Report (Frontend Developer)

- **Base URL:** `http://localhost:1337`
- **API Base:** `http://localhost:1337/api`
- **Architecture:** Strapi v5 (Flat Response - البيانات تأتي مباشرة دون تعقيد `data.attributes`).

---

## 1. كيفية استخدام الـ Pagination

يدعم Strapi طريقتين للترقيم، وأنسب طريقة للواجهات هي الترقيم بالصفحات (**Page-based Pagination**):

### Query Parameters:
| المعامل | النوع | الوصف | مثال |
| :--- | :---: | :--- | :--- |
| `pagination[page]` | `number` | رقم الصفحة الحالية (يبدأ من 1) | `pagination[page]=1` |
| `pagination[pageSize]` | `number` | عدد العناصر المراد جلبها في الصفحة الواحدة | `pagination[pageSize]=10` أو `20` |
| `pagination[withCount]` | `boolean` | إرجاع إجمالي عدد الصفحات والعناصر (افتراضياً `true`) | `pagination[withCount]=true` |

---

## 2. تفاصيل الـ Endpoints والردود (Requests & Responses)

### 🔹 أ. المنتجات (`Products`)
- **الهدف:** استعراض قائمة المنتجات مع دعم كامل للـ Pagination، الفرز، وجلب التصنيف المرتبط.

#### 1. طلب الصفحة الأولى مع حجم صفحة 10 عناصر:
```http
GET http://localhost:1337/api/products?pagination[page]=1&pagination[pageSize]=10&populate=*
```

#### 2. طلب الصفحة الثانية مع حجم صفحة 20 عنصراً:
```http
GET http://localhost:1337/api/products?pagination[page]=2&pagination[pageSize]=20&populate=*
```

#### 3. شكل الاستجابة الفعلية (`200 OK Response`):
```json
{
  "data": [
    {
      "id": 2,
      "documentId": "uhe533l9whqeayouv0tw1ccx",
      "name": "Wireless Noise-Canceling Headphones",
      "price": 299.99,
      "originalPrice": 399.99,
      "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "rating": 4.8,
      "reviews": 124,
      "description": "Premium wireless headphones with active noise cancellation and crystal clear audio quality.",
      "stock": 50,
      "isFeatured": true,
      "category": {
        "id": 2,
        "documentId": "bi038hb7q8c5u3hwjev2wnt1",
        "name": "Electronics",
        "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
        "itemCount": 156
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 14,
      "total": 137
    }
  }
}
```

> **ملاحظة للفرونت إند:** استخدم كائن `meta.pagination` لبناء مكون الترقيم:
> - `page`: الصفحة النشطة حالياً.
> - `pageCount`: إجمالي عدد الصفحات المتاحة.
> - `total`: إجمالي عدد المنتجات الكلي في المتجر.

---

### 🔹 ب. التصنيفات (`Categories`)
- **Endpoint:** `GET http://localhost:1337/api/categories`
- **مع المنتجات التابعة للتصنيف:** `GET http://localhost:1337/api/categories?populate=products`

#### شكل الاستجابة (`200 OK Response`):
```json
{
  "data": [
    {
      "id": 2,
      "documentId": "bi038hb7q8c5u3hwjev2wnt1",
      "name": "Electronics",
      "image": "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
      "itemCount": 156,
      "description": "Latest gadgets, phones, laptops, and electronic accessories"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 4
    }
  }
}
```

---

### 🔹 ج. العروض الخاصة (`Special Offers`)
- **Endpoint:** `GET http://localhost:1337/api/special-offers`

#### شكل الاستجابة (`200 OK Response`):
```json
{
  "data": [
    {
      "id": 2,
      "documentId": "en40gmsvh9v1hjqvmokil8qa",
      "title": "Black Friday Super Sale",
      "subtitle": "Up to 50% off on all top electronic brands",
      "description": "Grab the hottest electronics deals of the year with limited-time discounts and free shipping on selected items.",
      "image": "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
      "validUntil": "2026-11-30",
      "discount": 50,
      "startDate": "2026-11-01",
      "endDate": "2026-11-30"
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 2
    }
  }
}
```

---

### 🔹 د. صفقات اليوم (`Deal Products`)
- **Endpoint:** `GET http://localhost:1337/api/deal-products`

#### شكل الاستجابة (`200 OK Response`):
```json
{
  "data": [
    {
      "id": 2,
      "documentId": "gf4saiduypxzf7f5x7gusmf6",
      "name": "Ultra-Fast Portable SSD 1TB",
      "price": 89.99,
      "originalPrice": 149.99,
      "image": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500",
      "sold": 45,
      "total": 100,
      "offerId": 1
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 25,
      "pageCount": 1,
      "total": 3
    }
  }
}
```

---

### 🔹 هـ. بيانات التواصل الثابتة (`Contact Info` - Single Type)
- **Endpoint:** `GET http://localhost:1337/api/contact-info`

#### شكل الاستجابة (`200 OK Response`):
```json
{
  "data": {
    "id": 2,
    "documentId": "du2byo88rduqz6cnrl9feola",
    "email": "support@dealstore.com",
    "phone": "+1 (800) 555-0199",
    "address": "742 Evergreen Terrace, Springfield, OR 97477",
    "businessHours": {
      "monday_friday": "9:00 AM - 6:00 PM",
      "saturday": "10:00 AM - 4:00 PM",
      "sunday": "Closed"
    }
  },
  "meta": {}
}
```

---

### 🔹 و. إرسال نموذج التواصل (`Contact Submissions`)
- **Method:** `POST`
- **URL:** `http://localhost:1337/api/contact-submissions`
- **Headers:** `Content-Type: application/json`

#### الطلب (`Request Body`):
```json
{
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "subject": "Order Tracking",
    "message": "Hello, I would like to inquire about my delivery timeline."
  }
}
```

#### شكل الاستجابة عند النجاح (`201 Created`):
```json
{
  "data": {
    "id": 1,
    "documentId": "k8n4v92kdlaow9e0v",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "subject": "Order Tracking",
    "message": "Hello, I would like to inquire about my delivery timeline."
  },
  "meta": {}
}
```
