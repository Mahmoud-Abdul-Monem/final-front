# Strapi API Documentation (Frontend Integration)

- **Base URL:** `http://localhost:1337`
- **API Base:** `http://localhost:1337/api`
- **Strapi Version:** `5.50.2` (Flat Response - البيانات ترجع مباشرة بدون `data.attributes`)

---

## 1. قواعد عامة للتعامل مع الـ API

1. **هيكل الاستجابة (Response Structure):**
   - البيانات في Strapi v5 مسطحة وتصل مباشرة داخل كائن أو مصفوفة `data`:
     ```json
     {
       "data": [
         {
           "id": 2,
           "documentId": "uhe533l9whqeayouv0tw1ccx",
           "name": "Wireless Noise-Canceling Headphones",
           "price": 299.99
         }
       ],
       "meta": { ... }
     }
     ```
2. **المعرف الأساسي (Document ID):**
   - استخدم `documentId` دائماً كـ id في التوجيه (Routing) والروابط.
3. **الصور (Images):**
   - حقل `image` يحتوي على رابط كامل مباشر (String URL)، يتم تمريره مباشرة لخاصية `src`.
4. **جلب العلاقات (Populate):**
   - لجلب العلاقات المرتبطة (مثل `category` داخل الـ `product`)، يتم تمرير query parameter:
     `?populate=*`

---

## 2. تفاصيل الـ Endpoints

### 1. المنتجات (`Products`)
- **Method:** `GET`
- **URL:** `http://localhost:1337/api/products`
- **مع التصنيف المرتبط:** `http://localhost:1337/api/products?populate=*`
- **منتج واحد بالمعرف:** `http://localhost:1337/api/products/:documentId?populate=*`
- **الحقول:**
  - `id` (Number)
  - `documentId` (String)
  - `name` (String)
  - `price` (Decimal)
  - `originalPrice` (Decimal)
  - `image` (String URL)
  - `rating` (Decimal)
  - `reviews` (Integer)
  - `description` (Text)
  - `stock` (Integer)
  - `isFeatured` (Boolean)
  - `category` (Object - يظهر عند إضافة `populate=*`)

---

### 2. التصنيفات (`Categories`)
- **Method:** `GET`
- **URL:** `http://localhost:1337/api/categories`
- **مع المنتجات التابعة:** `http://localhost:1337/api/categories?populate=*`
- **الحقول:**
  - `id` (Number)
  - `documentId` (String)
  - `name` (String)
  - `description` (Text)
  - `image` (String URL)
  - `itemCount` (Integer)

---

### 3. العروض الخاصة (`Special Offers`)
- **Method:** `GET`
- **URL:** `http://localhost:1337/api/special-offers`
- **الحقول:**
  - `id` (Number)
  - `documentId` (String)
  - `title` (String)
  - `subtitle` (String)
  - `description` (Text)
  - `image` (String URL)
  - `validUntil` (String)
  - `discount` (Integer)
  - `startDate` (String)
  - `endDate` (String)

---

### 4. صفقات المنتجات (`Deal Products`)
- **Method:** `GET`
- **URL:** `http://localhost:1337/api/deal-products`
- **الحقول:**
  - `id` (Number)
  - `documentId` (String)
  - `name` (String)
  - `price` (Decimal)
  - `originalPrice` (Decimal)
  - `image` (String URL)
  - `sold` (Integer)
  - `total` (Integer)
  - `offerId` (Integer)

---

### 5. بيانات التواصل (`Contact Info` - Single Type)
- **Method:** `GET`
- **URL:** `http://localhost:1337/api/contact-info`
- **ملاحظة:** يرجع كائن `data` واحد فقط (وليس مصفوفة).
- **الحقول:**
  - `id` (Number)
  - `documentId` (String)
  - `email` (String)
  - `phone` (String)
  - `address` (String)
  - `businessHours` (JSON Object):
    ```json
    {
      "monday_friday": "9:00 AM - 6:00 PM",
      "saturday": "10:00 AM - 4:00 PM",
      "sunday": "Closed"
    }
    ```

---

### 6. إرسال نموذج التواصل (`Contact Submissions`)
- **Method:** `POST`
- **URL:** `http://localhost:1337/api/contact-submissions`
- **Headers:** `Content-Type: application/json`
- **Payload:**
  ```json
  {
    "data": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "subject": "Inquiry",
      "message": "Hello from frontend"
    }
  }
  ```
- **Response:** `201 Created`
