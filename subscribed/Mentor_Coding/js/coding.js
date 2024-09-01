document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button style
            filterButtons.forEach(btn => btn.classList.remove('bg-primary', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'text-gray-800'));
            button.classList.remove('bg-gray-200', 'text-gray-800');
            button.classList.add('bg-primary', 'text-white');

            // Filter cards
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});