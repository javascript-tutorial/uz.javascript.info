class Uploader {
  constructor({ file, onProgress }) {
    this.file = file;
    this.onProgress = onProgress;

    // faylni noyob identifikatsiya qiladigan fileId yaratish
    // agar foydalanuvchi sessiya identifikatori bo'lsa, uni ham qo'shib yanada noyob qilish mumkin
    this.fileId = file.name + "-" + file.size + "-" + file.lastModified;
  }

  async getUploadedBytes() {
    let response = await fetch("status", {
      headers: {
        "X-File-Id": this.fileId,
      },
    });

    if (response.status != 200) {
      throw new Error(
        "Yuklangan baytlarni olish mumkin emas: " + response.statusText
      );
    }

    let text = await response.text();

    return +text;
  }

  async upload() {
    this.startByte = await this.getUploadedBytes();

    let xhr = (this.xhr = new XMLHttpRequest());
    xhr.open("POST", "upload", true);

    // fayl id'sini yuborish, server qaysi faylni davom ettirishni bilishi uchun
    xhr.setRequestHeader("X-File-Id", this.fileId);
    // davom ettirilayotgan baytni yuborish, server davom ettirilayotganini bilishi uchun
    xhr.setRequestHeader("X-Start-Byte", this.startByte);

    xhr.upload.onprogress = (e) => {
      this.onProgress(this.startByte + e.loaded, this.startByte + e.total);
    };

    console.log("faylni yuborish, boshlash nuqtasi:", this.startByte);
    xhr.send(this.file.slice(this.startByte));

    // qaytarish:
    //   yuklash muvaffaqiyatli bo'lsa true,
    //   to'xtatilgan bo'lsa false
    // xatolik holatida exception tashlash
    return await new Promise((resolve, reject) => {
      xhr.onload = xhr.onerror = () => {
        console.log(
          "yuklash tugashi holati:" + xhr.status + " matn:" + xhr.statusText
        );

        if (xhr.status == 200) {
          resolve(true);
        } else {
          reject(new Error("Yuklash muvaffaqiyatsiz: " + xhr.statusText));
        }
      };

      // onabort faqat xhr.abort() chaqirilganda ishga tushadi
      xhr.onabort = () => resolve(false);
    });
  }

  stop() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
