Vue.component('cart', {
    data(){
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            imgCart: '/img/',
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents){
                    // item.imgPath = `img/s${item.id_product}.jpg`;
                    this.$data.cartItems.push(item);
                }
            });
    },
    methods: {
        addProduct(item){
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                    .then(data => {
                        if(data.result === 1){
                            find.quantity++
                        }
                    })
            } else {
                const prod = Object.assign({quantity: 1}, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if(data.result === 1){
                            this.cartItems.push(prod)
                        }
                    })
            }
        },
        remove(item) {
            if(item.quantity > 1) {
                this.$parent.putJson( `/api/cart/${ item.id_product }`, { quantity: -1 } )
                    .then( data => {
                        if ( data.result ) {
                            item.quantity--;
                        }
                    } )
            } else {
                this.$parent.removeJson( `/api/cart/${ item.id_product }`, item )
                    .then( data => {
                        if ( data.result ) {
                            this.cartItems.splice( this.cartItems.indexOf( item ), 1 );
                        } else {
                            console.log( 'error' );
                        }
                    } )
            }
        },
    },
    template: `
                <div>
                    <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
                    <div class="cart-block" v-show="showCart">
                            <cart-item v-for="item of cartItems"
                             :key="item.id_product" 
                             :img="imgCart" 
                             :cart-item="item" 
                             @remove="remove"></cart-item>
                    </div>
                </div>
                `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    data(){
        const cart_img = this.img + "s" + this.cartItem.id_product + ".jpg"
        return {
            cart_img
        }
    },
    template: `
        <div class="cart-item">
            <div class="product-bio">
                <img :src="this.cart_img" alt="Some img">
                <div class="product-desc">
                    <div class="product-title"> {{ cartItem.product_name }} </div>
                    <div class="product-quantity">Quantity: {{ cartItem.quantity }} </div>
                    <div class="product-single-price">$ {{ cartItem.price }} each</div>                  
                </div>
                <div class="right-block">
                    <div class="product-price">{{ cartItem.quantity * cartItem.price }}</div>
                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>  
            </div>
        </div>
    `
})

