'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cartItems: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        imgCart: 'https://via.placeholder.com/50x100',
        userSearch: '',
        showCart: false,

    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product =>
                regexp.test(product.product_name));
        },
        removeProduct(item) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if(data.result === 1){
                    if(item.quantity > 1){
                        item    .quantity--;
                    } else {
                        this.cartItems.splice(this.cartItems.indexOf(item), 1);
                    }
                } else {
                    alert('Error');
                }
            })
        },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cartItems.find(el => el.id_product === item.id_product);
                        if(find){
                            find.quantity++;
                        } else {
                            const prod = Object.assign({quantity: 1}, item)
                            this.cartItems.push(prod);
                        }
                    } else {
                        alert('Error');
                    }
                })
        }
    },
    mounted(){
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    }
})


