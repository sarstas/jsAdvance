'use strict';

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render();//вывод товаров на страницу
    }
    _fetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }

    sum () {
        return this.goods.reduce((sum, { price }) => sum + price, 0);
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend",item.render());
        }
    }
}

//корзина
class CartsList extends ProductList {
    constructor(container='.products', addedGoods) {
        super(addedGoods);
    }

    render() {

    }
}

class ProductItem{
    constructor(product,img='https://via.placeholder.com/200x150'){
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                <img src="${this.img}">
                <h3 class="products__title">${this.title}</h3>
                <p class="products__price">${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

// товар в корзине
class CartItem extends ProductItem {
    constructor(title, price, quantity){
        super(title, price);
        this.quantity = quantity;
    }
    //методы которые можно добавить:
    // добавить в корзину
    // удалить с корзины


    render() {

    }
}

let list = new ProductList();

// const products = [
//     {id: 1, title: 'Notebook', price: 20000},
//     {id: 2, title: 'Mouse', price: 1500},
//     {id: 3, title: 'Keyboard', price: 5000},
//     {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = item => {
//     return `<div class="products__card">
//             <img class="products__img" src="img/picture_1.jpg" alt="заглушка">
//             <h3 class="products__title">${item.title}</h3>
//             <p class="products__price">price: <span class="products__price-col">${item.price}</span> rub</p>
//             <button class="products__btn by-btn">Add to card</button>
//          </div>`;
// };
//
// const renderProducts = list => {
//     document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join("");;
// };
//
// renderProducts(products);