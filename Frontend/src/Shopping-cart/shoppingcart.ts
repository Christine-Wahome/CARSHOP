// Item class to represent products in the shopping cart
class Item {
    constructor(public name: string, public price: number) {}
  }
  
  // Shopping cart class
  class ShoppingCart {
    private items: Item[] = [];
  
    addItem(item: Item): void {
      this.items.push(item);
    }
  
    removeItem(item: Item): void {
      const index = this.items.indexOf(item);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  
    getItems(): Item[] {
      return [...this.items];
    }
  
    getTotalPrice(): number {
      return this.items.reduce((total, item) => total + item.price, 0);
    }
  }
  
  // UI class to handle rendering and user interaction
  class UI {
    private shoppingCart: ShoppingCart;
    private itemsList: HTMLUListElement;
  
    constructor(shoppingCart: ShoppingCart) {
      this.shoppingCart = shoppingCart;
      this.itemsList = document.getElementById('items-list') as HTMLUListElement;
    }
  
    init(): void {
      this.itemsList.innerHTML = '';
      this.renderItems();
      this.addEventListeners();
    }
  
    private renderItems(): void {
      const items = this.shoppingCart.getItems();
      items.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - $${item.price}`;
        this.itemsList.appendChild(li);
      });
    }
  
    private addEventListeners(): void {
      const addForm = document.getElementById('add-form') as HTMLFormElement;
      addForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const priceInput = document.getElementById('price') as HTMLInputElement;
        const name = nameInput.value;
        const price = Number(priceInput.value);
        const item = new Item(name, price);
        this.shoppingCart.addItem(item);
        this.init();
        nameInput.value = '';
        priceInput.value = '';
      });
  
      this.itemsList.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.tagName.toLowerCase() === 'li') {
          const itemText = target.innerHTML;
          const [name, priceStr] = itemText.split(' - $');
          const price = Number(priceStr);
          const item = new Item(name, price);
          this.shoppingCart.removeItem(item);
          this.init();
        }
      });
    }
  }
  
  // Instantiate the shopping cart and UI
  const shoppingCart = new ShoppingCart();
  const ui = new UI(shoppingCart);
  
  // Initialize the UI and display the shopping cart
  ui.init();
  const totalPrice = shoppingCart.getTotalPrice();
  const totalSpan = document.getElementById('total') as HTMLSpanElement;
  totalSpan.innerHTML = `$${totalPrice.toFixed(2)}`;
  