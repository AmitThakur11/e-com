import React from 'react'
import {useUser} from "../../context/user"
import {CartCard} from "../../component"
import {EmptyCart} from "../../container"
export default function Cart() {
    const {user : {cart}} = useUser()
    return (
        !cart.length ? <EmptyCart/>:<div>
            {
                cart.map((product)=>{
                    return <CartCard cart = {product} key = {product.productId._id} />

                })
            }
            
        </div>
    )
}
