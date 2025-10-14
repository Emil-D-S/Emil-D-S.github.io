async function includeComponent(selector, file) {
  const container = document.querySelector(selector);
  if (!container) return;
  const res = await fetch(file);
  const html = await res.text();
  container.innerHTML = html;
}

includeComponent("#header", "components/header.html");
includeComponent("#footer", "components/footer.html");
