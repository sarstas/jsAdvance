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
    template: `
                <div class="products">
                    <product v-for="item of filtered"
                    :key="item.id_product"
                    :img="imgProduct"
                    :product="item"
                    @add-product="$parent.$refs.cart.addProduct"
                    ></product>
               </div>
                `
});

Vue.component('product', {
    props: ['product', 'img'],
    data(){
        const product_img = `${this.img}${this.product.id_product}.png`
        return {
            product_img
        }
    },
    template: `
                <div class="product">
                    <div class="img-wrap">
                        <img class="product__img" :src="this.product_img" alt="product">
                    </div>  
                    <div class="product__content">
                        <p href="#" class="product__title">{{ product.product_name }}</p>  
                        <p class="product__desc">
                          Known for her sculptural takes on traditional tailoring,Australian arbiter of cool Kym Ellery teams
                          up with Moda Operandi.
                       </p>
                       <p class="product__price">{{ product.price }} $</p>
                   </div>
                    <button class="product__add" @click="$emit('add-product', product)">Add to Cart</button>
                    </div>
                </div>`
});
