document.addEventListener('DOMContentLoaded', function() {
 
    const menuToggle = document.querySelector('.menu-toggle');
    const navListLarge = document.querySelector('#list-large');
    const navListMedium = document.querySelector('#list-medium');
    const navListSmall = document.querySelector('#list-small');
    const navListExtraSmall = document.querySelector('#list-extra-small');

    menuToggle.addEventListener('click', function() {
        navListMedium.classList.toggle('show'); 
        navListSmall.classList.toggle('show'); 
        navListExtraSmall.classList.toggle('show'); 
    });

    const dropdownButtons = document.querySelectorAll('.dropbtn');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.stopPropagation(); 
            const dropdownContent = this.nextElementSibling; 
            
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show'); 
            } else {
                dropdownButtons.forEach(btn => {
                    const content = btn.nextElementSibling;
                    if (content.classList.contains('show')) {
                        content.classList.remove('show'); 
                    }
                });
                dropdownContent.classList.add('show'); 
            }
        });
    });

    window.addEventListener('click', function() {
        dropdownButtons.forEach(button => {
            const dropdownContent = button.nextElementSibling; 
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show'); 
            }
        });
    });
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelectorAll('.nav-link').forEach(nav => {
            nav.classList.remove('active'); 
        });
        
        link.classList.add('active'); 
    });
});

document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function () {
        const dropdownContent = this.querySelector('.dropdown-content');
        const rect = dropdownContent.getBoundingClientRect();
        const viewportWidth = window.innerWidth; 

        if (rect.right > viewportWidth) {
            dropdownContent.style.left = 'auto';
            dropdownContent.style.right = '0'; 
        } else {
            dropdownContent.style.left = '0'; 
            dropdownContent.style.right = 'auto';
        }

        const viewportHeight = window.innerHeight;
        if (rect.bottom > viewportHeight) {
            dropdownContent.style.top = `-${rect.height}px`;
        } else {
            dropdownContent.style.top = '';
        }

        dropdownContent.classList.add('show'); 
    });

    dropdown.addEventListener('mouseleave', function () {
        const dropdownContent = this.querySelector('.dropdown-content');
        dropdownContent.classList.remove('show'); 
    });
});
