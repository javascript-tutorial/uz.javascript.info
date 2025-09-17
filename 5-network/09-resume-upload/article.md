# Qayta boshlanuvchi fayl yuklash

`fetch` metodi bilan faylni yuklash ancha oson.

Ulanish uzilganidan keyin yuklashni qanday davom ettirish mumkin? Buning uchun o'rnatilgan opsiya yo'q, lekin buni amalga oshirish uchun kerakli qismlar bizda bor.

Qayta boshlanuvchi yuklashlar yuklash jarayonini ko'rsatish bilan birga kelishi kerak, chunki biz katta fayllarni kutamiz (agar davom ettirish kerak bo'lsa). `fetch` yuklash jarayonini kuzatishga imkon bermagani uchun, biz [XMLHttpRequest](info:xmlhttprequest) dan foydalanamiz.

## Unchalik foydali bo'lmagan progress eventi

Yuklashni davom ettirish uchun ulanish uzilgunga qadar qancha yuklangani ma'lum bo'lishi kerak.

Yuklash jarayonini kuzatish uchun `xhr.upload.onprogress` mavjud.

Afsuski, bu bizga yuklashni davom ettirishda yordam bermaydi, chunki u ma'lumotlar *yuborilganda* ishga tushadi, lekin ular server tomonidan qabul qilindimi? Brauzer buni bilmaydi.

Ehtimol, u mahalliy tarmoq proksi tomonidan buferga olingan, yoki masofaviy server jarayoni shunchaki o'lib qoldi va ularni qayta ishlay olmadi, yoki u o'rtada yo'qoldi va qabul qiluvchiga yetmadi.

Shuning uchun bu event faqat chiroyli progress bar ko'rsatish uchun foydali.

Yuklashni davom ettirish uchun server tomonidan qabul qilingan baytlarning *aniq* sonini bilishimiz kerak. Va buni faqat server aytishi mumkin, shuning uchun biz qo'shimcha so'rov qilamiz.

## Algoritm

1. Birinchidan, yuklashimiz kerak bo'lgan faylni noyob identifikatsiya qilish uchun fayl id'sini yarating:
    ```js
    let fileId = file.name + '-' + file.size + '-' + file.lastModified;
    ```
    Bu yuklashni davom ettirish uchun kerak, serverga nimani davom ettirayotganimizni aytish uchun.

    Agar nom yoki hajm yoki oxirgi o'zgarish sanasi o'zgarsa, boshqa `fileId` bo'ladi.

2. Serverga so'rov yuboring, u allaqachon qancha baytga ega ekanligini so'rang, masalan:
    ```js
    let response = await fetch('status', {
      headers: {
        'X-File-Id': fileId
      }
    });

    // Server shuncha baytga ega
    let startByte = +await response.text();
    ```

    Bu server fayl yuklashlarini `X-File-Id` header bo'yicha kuzatadi deb taxmin qiladi. Server tomonida amalga oshirilishi kerak.

    Agar fayl hali serverda mavjud bo'lmasa, server javobi `0` bo'lishi kerak

3. Keyin, faylni `startByte` dan yuborish uchun `Blob` metodining `slice` dan foydalanishimiz mumkin:
    ```js
    xhr.open("POST", "upload", true);

    // Fayl id'si, server qaysi faylni yuklayotganimizni bilishi uchun
    xhr.setRequestHeader('X-File-Id', fileId);

    // Davom ettirayotgan bayt, server davom ettirayotganimizni bilishi uchun
    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
      console.log(`${startByte + e.total} dan ${startByte + e.loaded} yuklandi`);
    };

    // file input.files[0] yoki boshqa manbadan bo'lishi mumkin
    xhr.send(file.slice(startByte));
    ```

    Bu yerda biz serverga fayl id'sini `X-File-Id` sifatida yuboramiz, shuning uchun u qaysi faylni yuklayotganimizni biladi, va boshlang'ich baytni `X-Start-Byte` sifatida yuboramiz, shuning uchun u biz uni dastlab emas, balki davom ettirayotganimizni biladi.

    Server o'z yozuvlarini tekshirishi va agar o'sha faylning yuklashi bo'lgan bo'lsa va joriy yuklangan hajm aynan `X-Start-Byte` ga teng bo'lsa, ma'lumotlarni unga qo'shishi kerak.

Mana Node.js da yozilgan mijoz va server kodi bilan demo.

Bu saytda faqat qisman ishlaydi, chunki Node.js Nginx nomli boshqa server orqasida joylashgan bo'lib, u yuklashlarni buferga oladi va ularni to'liq tugagandan keyin Node.js ga uzatadi.

Lekin siz uni yuklab olishingiz va to'liq namoyish uchun mahalliy ravishda ishga tushirishingiz mumkin:

[codetabs src="upload-resume" height=200]

Ko'rib turganingizdek, zamonaviy tarmoq metodlari o'z imkoniyatlari bo'yicha fayl menejerlariga yaqin - header'lar ustidan nazorat, progress ko'rsatkichi, fayl qismlarini yuborish va hokazo.

Biz qayta boshlanuvchi yuklash va yana ko'p narsalarni amalga oshirishimiz mumkin.