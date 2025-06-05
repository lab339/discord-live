export async function decorate(block) {
  const tabs = document.querySelectorAll('.section.tabs');
  const tabTitles = [...tabs].map((tab) => tab.querySelector('h1').innerText);

  if (!tabs.length) return;

  // Create tab navigation
  const nav = document.createElement('div');
  nav.className = 'tab-nav';

  tabTitles.forEach((title, idx) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn';
    btn.innerText = title;
    if (idx === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      // Switch active tab
      nav.querySelectorAll('.tab-btn').forEach((b, i) => {
        b.classList.toggle('active', i === idx);
        tabs[i].style.display = i === idx ? '' : 'none';
      });
    });
    nav.appendChild(btn);
  });

  // Insert nav before the first tab
  tabs[0].parentNode.insertBefore(nav, tabs[0]);

  // Hide all tabs except the first
  tabs.forEach((tab, idx) => {
    tab.style.display = idx === 0 ? '' : 'none';
  });
}
