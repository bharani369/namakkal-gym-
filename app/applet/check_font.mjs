async function check() {
  const res = await fetch('https://fonts.googleapis.com/css2?family=Toreno&display=swap');
  console.log(res.status);
}
check();
