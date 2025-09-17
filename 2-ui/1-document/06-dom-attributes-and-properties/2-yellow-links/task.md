muhimlik: 3

---

# Make external links orange

Tashqi havolalarni to'q sariq rangga aylantiring

`Uslub` xususiyatini oʻzgartirib, barcha tashqi havolalarni toʻq sariq rangga aylantiring.

Havola tashqi hisoblanadi, agar:

- Uning `href`ida `://` mavjud
- Lekin `http://internal.com` bilan boshlanmaydi.

Example:

```html run
<a name="list">Ro'yxat:</a>
<ul>
  <li><a href="http://google.com">http://google.com</a></li>
  <li><a href="/tutorial">/tutorial.html</a></li>
  <li><a href="local/path">local/path</a></li>
  <li><a href="ftp://ftp.com/my.zip">ftp://ftp.com/my.zip</a></li>
  <li><a href="http://nodejs.org">http://nodejs.org</a></li>
  <li><a href="http://internal.com/test">http://internal.com/test</a></li>
</ul>

<script>
  // bitta havola uchun uslubni sozlash
  let link = document.querySelector("a");
  link.style.color = "orange";
</script>
```

The result should be:

[iframe border=1 height=180 src="solution"]
