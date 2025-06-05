import { loadFragment } from '../fragment/fragment.js';

export default function decorate(block) {
  // Create observer to load form when block enters viewport
  const observer = new IntersectionObserver(async (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      // Disconnect observer after loading to prevent multiple loads
      observer.disconnect();

      const container = block.querySelector('a[href]');
      const aemPage = container.innerText?.match(/^https:\/\/[^./]*\.aem\.page\//);
      let url = "";
      // if current hostname is not aem Page[0]
      if (window.location.hostname !== aemPage[0].split('/')[2]) {
        url = container.innerText;
      } else {
        const { pathname } = new URL(container.href);
        url = pathname;
      }
      const form = await loadFragment(url);
      block.replaceChildren(form.children[0]);
    }
  });

  // Start observing the block
  observer.observe(block);
}
