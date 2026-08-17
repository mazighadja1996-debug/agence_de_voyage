document.querySelectorAll('.dest').forEach((div) => {
  const h1 = div.querySelector('h1');

  div.addEventListener('mousemove', (e) => {
    // If e.target is a <p> tag, we are hovering on the paragraph
    if (e.target.tagName === 'P') {
      h1.style.zIndex = '1';  // Reset z-index when over <p>
    } else {
      h1.style.zIndex = '10'; // Elevate z-index when over div/h1
    }
  });

  div.addEventListener('mouseleave', () => {
    h1.style.zIndex = '1'; // Reset when leaving the card completely
  });
});

// 1. Select the parent section
const specialsSection = document.getElementById('specials');

// 2. Add a single event listener to the parent
if(specialsSection){
  specialsSection.addEventListener('click', (event) => {
    
    // 3. Use event.target to find the closest '.special' card that was clicked
    const card = event.target.closest('.special');
    
    // If the click wasn't on a card (e.g., they clicked the empty space between cards), do nothing
    if (!card) return;
    
    // 4. Extract the data from the specific card that was clicked
    const imgSrc = card.querySelector('img').src;
    const title = card.querySelector('h3').innerText;
    const desc = card.querySelector('.desc').innerText;
    const price = card.querySelector('#price').innerText;
    const rating = card.querySelector('#stars').innerText;
    
    // 5. Create the modal
    const modal = document.createElement('div');
    modal.classList.add('trip-modal');
    
    // 6. Build the Modal HTML
    modal.innerHTML = `
    <div class="modal-content">
    <button class="close-btn">&times;</button>
    <div class="modal-left">
    <img src="${imgSrc}" alt="${title}">
    </div>
    <div class="modal-right">
    <h2>${title}</h2>
    <p class="modal-desc">${desc}</p>
    <p class="modal-price">${price}</p>
    <span class="modal-rating">${rating}</span>
    <button class="book-btn">Book This Trip</button>
    </div>
    </div>
    `;
    
    // 7. Append to body
    document.body.appendChild(modal);
    
    // 8. Close functionality using event.target as well
    modal.addEventListener('click', (e) => {
      // Close if they click the 'X' button OR the dark background outside the content
      if (e.target.classList.contains('book-btn')){
        const basePrice = parseInt(price.match(/[\d,]+/)[0].replace(/,/g, ''), 10);
        modal.innerHTML = `
        <div class="modal-content">
        <button class="close-btn">&times;</button>
        <div class="modal-reserving">
            <h2>Reserving: ${title}</h2>
            <input class="date" type="date">
            <input class="number" type="number" min="1" value="1" placeholder="How many people?">
            <p class="total-price">Total price: ${basePrice.toLocaleString()} DA</p>
            <button class="confirm-btn">Confirm Booking</button>
        </div>
        </div>
        `;
        const peopleInput = modal.querySelector('.number');
        const priceDisplay = modal.querySelector('.total-price');
        // Listen for the 'input' event (fires every time the user types or clicks the arrows)
        peopleInput.addEventListener('input', () => {
            
            // Get the number they typed. If it's empty, default to 0.
            const numPeople = parseInt(peopleInput.value, 10) || 0; 
            
            // Calculate the total
            const total = basePrice * numPeople;
            
            // Update the text on the screen. 
            // .toLocaleString() adds the commas back nicely (e.g., 700000 becomes 700,000)
            priceDisplay.innerText = `Total price: ${total.toLocaleString()} DA`;
        });

      }else if (e.target.classList.contains('close-btn') || e.target === modal) {
        modal.remove();
      }
    });
  });
}
////////////////////////////////////////////////////////////////////
// 1. Select the parent section
const Sec = document.getElementById('services');

// 2. Add a single event listener to the parent
if(Sec){
  Sec.addEventListener('click', (event) => {
    
    // 3. Use event.target to find the closest '.special' card that was clicked
    const service = event.target.closest('span');
    
    
    // If the click wasn't on a card (e.g., they clicked the empty space between cards), do nothing
    if (!service) return;
    
    // 4. Extract the data from the specific card that was clicked
    const rawBg = service.style.getPropertyValue('--bg');
    const img = rawBg.replace(/url\(['"]?(.*?)['"]?\)/, '$1').trim();
    const Title = service.querySelector('h1').innerText;
    const details = service.querySelector('.details').innerHTML;
    
    // 5. Create the modal
    const mod = document.createElement('div');
    mod.classList.add('trip-modal');
    
    // 6. Build the Modal HTML
    mod.innerHTML = `
    <div class="modal-content">
    <button class="close-btn">&times;</button>
    <div class="modal-left">
    <img src="${img}" alt="${Title}">
    </div>
    <div class="modal-right">
    <h2>${Title}</h2>
    <p class="modal-details">${details}</p>
    <button class="book-btn">Book This Trip</button>
    </div>
    </div>
    `;
    
    // 7. Append to body
    document.body.appendChild(mod);
    
    // 8. Close functionality using event.target as well
    mod.addEventListener('click', (e) => {
      // Close if they click the 'X' button OR the dark background outside the content
      if (e.target.classList.contains('book-btn')){
        const basePrice = parseInt(details.match(/[\d,]+/)[0].replace(/,/g, ''), 10);
        mod.innerHTML = `
        <div class="modal-content">
        <button class="close-btn">&times;</button>
        <div class="modal-reserving">
            <h2>Reserving: ${Title}</h2>
            <input class="date" type="date">
            <input class="number" type="number" min="1" value="1" placeholder="How many people?">
            <p class="total-price">Total price: ${basePrice.toLocaleString()} DA</p>
            <button class="confirm-btn">Confirm Booking</button>
        </div>
        </div>
        `;
        const peopleInput = mod.querySelector('.number');
        const priceDisplay = mod.querySelector('.total-price');
        // Listen for the 'input' event (fires every time the user types or clicks the arrows)
        peopleInput.addEventListener('input', () => {
            
            // Get the number they typed. If it's empty, default to 0.
            const numPeople = parseInt(peopleInput.value, 10) || 0; 
            
            // Calculate the total
            const total = basePrice * numPeople;
            
            // Update the text on the screen. 
            // .toLocaleString() adds the commas back nicely (e.g., 700000 becomes 700,000)
            priceDisplay.innerText = `Total price: ${total.toLocaleString()} DA`;
        });

      }else if (e.target.classList.contains('close-btn') || e.target === mod) {
        mod.remove();
      }
    });
  });
}