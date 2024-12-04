function summarizeContent() {
  const text = Array.from(document.querySelectorAll('p'))
    .map(p => p.innerText)
    .join(' ');
  if (!text) return 'No text found to summarize.';
  return text.split('. ').slice(0, 3).join('. ') + '.';
}
