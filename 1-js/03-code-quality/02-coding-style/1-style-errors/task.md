importance: 4

---

# Yomon uslub

Quyidagi kod uslubida nima yomon?

```js no-beautify
function pow(x,n)
{
  let result=1;
  for(let i=0;i<n;i++) {result*=x;}
  return result;
}

let x=prompt("x?",''), n=prompt("n?",'')
if (n<=0)
{
  alert(`${n} darajasi  qo'llab-quvvatlanmaydi, iltimos, noldan katta sonni kiriting`);
}
else
{
  alert(pow(x,n))
}
```

To'girlang.
