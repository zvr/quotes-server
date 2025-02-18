document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const quoteId = urlParams.get('q');

    if (quoteId) {
        fetch(`data/${quoteId}.json`)
            .then(response => response.json())
            .then(quote => {
                const quoteTextElement = document.getElementById('quote-text');
                quoteTextElement.textContent = quote.text;

                // Set the lang attribute if the lang key is present
                if (quote.lang) {
                    quoteTextElement.setAttribute('lang', quote.lang);
                } else {
                    quoteTextElement.removeAttribute('lang');
                }

                // Populate the attribution elements
                const authorElement = document.getElementById('quote-author');
                const lifespanElement = document.getElementById('quote-lifespan');
                const bookElement = document.getElementById('quote-book');
                const yearElement = document.getElementById('quote-year');

                // Set the author with an em-dash if present
                authorElement.textContent = quote.author ? `� ${quote.author}` : '';

                // Set the lifespan in parentheses if present
                lifespanElement.textContent = quote.lifespan ? ` (${quote.lifespan})` : '';

                // Set the book with a preceding comma if author or lifespan is present
                bookElement.textContent = quote.book ? `${quote.author || quote.lifespan ? ', ' : ''}${quote.book}` : '';

                // Set the year with a preceding comma if book is present, or if author/lifespan is present
                yearElement.textContent = quote.year ? `${quote.book ? ', ' : (quote.author || quote.lifespan ? ', ' : '')}${quote.year}` : '';

                // Adjust commas based on presence of elements
                if (quote.book && !quote.author && !quote.lifespan) {
                    bookElement.textContent = `${quote.book}`;
                }
                if (quote.year && !quote.book && !quote.author && !quote.lifespan) {
                    yearElement.textContent = `${quote.year}`;
                }
            })
            .catch(error => {
                console.error('Error loading quote:', error);
                document.getElementById('quote-text').textContent = 'Quote not found';
            });
    } else {
        fetch('data/ids.json')
            .then(response => response.json())
            .then(ids => {
                const randomId = ids[Math.floor(Math.random() * ids.length)];
                window.location.href = `index.html?q=${randomId}`;
            })
            .catch(error => {
                console.error('Error loading IDs:', error);
                document.getElementById('quote-text').textContent = 'Error loading quotes';
            });
    }
});
