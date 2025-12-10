// Data de productos
const products = {
    tequenos: [
        {
            name: 'Tequeños Tradicionales',
            flavor: 'Queso',
            image: 'assets/images/products/tequenos_queso_tradicional.jpg',
            description: 'Deliciosos tequeños tradicionales, crujientes y deliciosos.',
            ingredients: 'Queso fresco de calidad',
            presentation: 'Pack de 50 unidades'
        },

        {
            name: 'Tequeños de Orégano',
            flavor: 'Orégano',
            image: 'assets/images/products/tequenos_queso_con_oregano.jpg',
            description: 'Tequeños con orégano y aceite de oliva que realza el sabor del queso.',
            ingredients: 'Queso fresco, orégano y aceite de oliva',
            presentation: 'Pack de 50 unidades'
        },
        {
            name: 'Tequeños de Queso con Guayaba',
            flavor: 'Guayaba',
            image: 'assets/images/products/tequenos_queso_guayaba.jpg',
            description: 'Tequeños rellenos de queso y guayaba, dulce y salado en perfecta armonía.',
            ingredients: 'Queso fresco, guayaba natural',
            presentation: 'Pack de 25 unidades'
        },
        {
            name: 'Tequeños de Chocolate',
            flavor: 'Chocolate',
            image: 'assets/images/products/tequenos_chocolate_abierto.jpg',
            description: 'Tequeños rellenos de chocolate, ideal para los amantes del chocolate. Irresistible.',
            ingredients: 'Chocolate premium derretido',
            presentation: 'Pack de 24 unidades'
        },
    ],
    mini_empanadas: [
        {
            name: 'Mini Empanadas de Queso',
            flavor: 'Queso',
            image: 'assets/images/products/empanadas_empaquedatas.jpg',
            description: 'Empanadas doradas con relleno de queso fresco y delicioso. Crujientes y jugosas.',
            ingredients: 'Queso fresco',
            presentation: 'Pack de 25 unidades'
        },
        {
            name: 'Mini Empanadas de Carne',
            flavor: 'Carne',
            image: 'assets/images/products/empanadas_empaquedatas.jpg',
            description: 'Empanadas rellenas de carne sazonada. Sabor tradicional y auténtico.',
            ingredients: 'Carne fresca y especias',
            presentation: 'Pack de 25 unidades'
        },
        {
            name: 'Mini Empanadas de Pollo',
            flavor: 'Pollo',
            image: 'assets/images/products/empanadas_empaquedatas.jpg',
            description: 'Empanadas rellenas de pollo desmenuzado y sazonado. Suave y sabroso.',
            ingredients: 'Pechuga de pollo deshilachada',
            presentation: 'Pack de 25 unidades'
        }
    ],
    pastelitos: [
        {
            name: 'Pastelitos de Jamón y Queso',
            flavor: 'Queso',
            image: 'assets/images/products/pastelito_pollo1.jpg',
            description: 'Pastelitos caseros rellenos de jamón y queso. Esponjosos y deliciosos.',
            ingredients: 'Jamón y Queso fresco',
            presentation: 'Pack de 25 unidades'
        },
        {
            name: 'Pastelitos de Carne',
            flavor: 'Carne',
            image: 'assets/images/products/pastelitos_carne_abierto.jpg',
            description: 'Pastelitos rellenos de carne sazonada. Perfectos para cualquier hora.',
            ingredients: 'Carne fresca',
            presentation: 'Pack de 25 unidades'
        },
        {
            name: 'Pastelitos de Pollo',
            flavor: 'Pollo',
            image: 'assets/images/products/pastelito_pollo1.jpg',
            description: 'Pastelitos rellenos de pollo tierno y bien sazonado. Suave y jugoso.',
            ingredients: 'Pechuga de pollo deshilachada',
            presentation: 'Pack de 25 unidades'
        }
    ]
    ,
    tartas: [
        {
            name: 'Tarta de Queso Clásica (Artesanal)',
            flavor: 'Queso',
            image: 'assets/images/products/tarta_queso.jpg',
            description: 'Tarta de queso artesanal, textura cremosa, base perfectamente horneada y receta tradicional de la casa.',
            ingredients: 'Queso crema premium, base de galleta, toque de vainilla',
            presentation: 'Aprox. 3 Kg'
        }
    ]
};

// Referencias del DOM
const categoriesView = document.getElementById('categoriesView');
const productsView = document.getElementById('productsView');
const productDetailsView = document.getElementById('productDetailsView');
const categoryCards = document.querySelectorAll('.category-card');
const backBtn = document.getElementById('backBtn');
const backBtnDetails = document.getElementById('backBtnDetails');
const productsGrid = document.getElementById('productsGrid');
const backBtnBottom = document.getElementById('backBtnBottom');
const categoryTitle = document.getElementById('categoryTitle');
const container = document.querySelector('.container');
const header = document.querySelector('.header');

// Estados
let currentCategory = null;
let currentProduct = null;

// Event listeners para categorías
categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        showProducts(category);
    });
});

// Volver a categorías
backBtn.addEventListener('click', () => {
    showCategories();
});

// Volver desde el botón inferior (para no tener que subir la pantalla)
if (backBtnBottom) {
    backBtnBottom.addEventListener('click', () => {
        showCategories();
        // Hacer scroll suave hacia la parte superior del contenido
        const targetY = container.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0) - 8;
        smoothScrollTo(targetY, 600);
    });
}

// Volver a productos desde detalles
backBtnDetails.addEventListener('click', () => {
    if (currentCategory) {
        showProducts(currentCategory);
    }
});

// Mostrar vista de categorías
function showCategories() {
    currentCategory = null;
    // mostrar categoriesView
    showView(categoriesView);
    // ocultar otras
    hideView(productsView);
    hideView(productDetailsView);
    // Restaurar altura del contenedor a default para categorías
    container.style.minHeight = '60vh';
}

// Mostrar vista de productos
function showProducts(category) {
    currentCategory = category;
    // ocultar categorías, mostrar productos
    hideView(categoriesView);
    showView(productsView);
    hideView(productDetailsView);

    // Actualizar título
    const categoryNames = {
        tequenos: 'Tequeños',
        mini_empanadas: 'Mini Empanadas',
        pastelitos: 'Pastelitos',
        tartas: 'Tartas de Queso'
    };
    categoryTitle.textContent = categoryNames[category] || '';


    // Limpiar grid
    productsGrid.innerHTML = '';

    // Agregar productos
    products[category].forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info-card">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                </div>
                <span class="product-flavor">${product.flavor}</span>
            </div>
        `;

        productCard.addEventListener('click', () => {
            showProductDetails(category, index);
        });

        productsGrid.appendChild(productCard);
    });

    // Añadir reveal escalonado después de un pequeño delay para que la vista tenga tiempo de mostrarse
    setTimeout(() => {
        const cards = Array.from(productsGrid.querySelectorAll('.product-card'));
        cards.forEach((card, i) => {
            setTimeout(() => {
                card.classList.add('reveal');
            }, i * 80);
        });
    }, 80);

    // Ajustar altura del contenedor para evitar que la vista visible se superponga a la sección de contacto
    // (las .view son position:absolute, así que forzamos minHeight del contenedor al tamaño del contenido)
    // Usar setTimeout para asegurar que las imágenes ya se han cargado
    setTimeout(() => {
        const needed = productsView.scrollHeight || productsView.offsetHeight || 0;
        const minRequired = Math.max(needed + 100, 400);
        container.style.minHeight = minRequired + 'px';
    }, 200);

    // En móviles sólo: si la categoría está «baja» (pastelitos o tartas), hacer scroll suave hasta el inicio del contenido
    const isMobile = window.innerWidth <= 768;
    if (isMobile && (category === 'pastelitos' || category === 'tartas')) {
        const targetY = container.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0) - 8;
        smoothScrollTo(targetY, 1000);
    }
}

// Mostrar detalles del producto
function showProductDetails(category, index) {
    const product = products[category][index];
    currentProduct = product;
    // ocultar otras vistas y mostrar detalles
    hideView(categoriesView);
    hideView(productsView);
    showView(productDetailsView);
    
    // Rellenar detalles
    document.getElementById('detailImage').src = product.image;
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailIngredients').textContent = product.ingredients;
    document.getElementById('detailPresentation').textContent = product.presentation;

    // Ajustar contenedor para evitar superposición del footer
    setTimeout(() => {
        const needed = productDetailsView.scrollHeight || productDetailsView.offsetHeight || 0;
        const minRequired = Math.max(needed + 100, 400);
        container.style.minHeight = minRequired + 'px';
    }, 200);

    // En móviles, subir la cámara al inicio del contenido de la vista
    if (window.innerWidth <= 768) {
        const targetY = container.getBoundingClientRect().top + window.pageYOffset - (header ? header.offsetHeight : 0) - 8;
        smoothScrollTo(targetY, 1000);
    }
}

// Inicializar
// Helpers para transiciones suaves usando clases
function showView(el) {
    if (!el) return;
    // show view by toggling classes only (don't change scroll)
    el.classList.remove('hidden');
    el.classList.add('visible');
}

function hideView(el) {
    if (!el) return;
    el.classList.remove('visible');
    el.classList.add('hidden');
}

// Smooth scroll helper (duration in ms)
function smoothScrollTo(targetY, duration = 1000) {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    let start;
    function step(timestamp) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const t = Math.min(1, time / duration);
        // easeInOutCubic
        const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startY + diff * eased);
        if (time < duration) {
            requestAnimationFrame(step);
        }
    }
    requestAnimationFrame(step);
}

showCategories();

// Smooth-scroll from product details note to contact section (accounts for sticky header)
const contactLink = document.getElementById('contactLink');
if (contactLink) {
    contactLink.addEventListener('click', (e) => {
        e.preventDefault();
        const contactoEl = document.getElementById('contacto');
        if (!contactoEl) return;
        const headerHeight = header ? header.offsetHeight : 0;
        const targetY = contactoEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8;
        smoothScrollTo(targetY, 800);
    });
}
