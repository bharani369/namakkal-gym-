async function check() {
  const res = await fetch('https://cdn3d.iconscout.com/3d/free/thumb/free-instagram-4703914-3915181.png');
  console.log(res.status);
}
check();
