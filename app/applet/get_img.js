const fetch = require('node-fetch');
async function getImg() {
  const res = await fetch('https://gwttspeed.blogspot.com/2026/04/blog-post.html');
  const text = await res.text();
  const matches = text.match(/<img[^>]+src="([^">]+)"/g);
  console.log(matches);
}
getImg();
