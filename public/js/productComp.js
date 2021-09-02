Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgProduct: '/img/'
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data){
                    // item.imgPath = `img/${item.id_product}.jpg`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            })
    },

    methods: {
        filter(userSearch){
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                    <product v-for="item of filtered"
                    :key="item.id_product"
                    :img="imgProduct"
                    :product="item"
                    @add-product="$parent.$refs.cart.addProduct" ></product>
               </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    data(){
        const product_img = `${this.img}${this.product.id_product}.jpg`
        return {
            product_img
        }
    },
    template: `
                <div class="product-item">
                    <div class="img-wrap">
                        <img :src="this.product_img" alt="some Img">
                    </div>  
                    <div class="desc">  
                        <h3>{{ product.product_name }}</h3>
                        <p>{{ product.price }} $</p>
                        <button class="buy-btn" @click="$emit('add-product', product)">Buy</button>
                    </div>
                </div>`
});
