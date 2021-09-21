import React from 'react'
import {useUser} from "../../context/user/index";
import {WishlistCard} from "../../component";
import {EmptyWishlist} from "../../container"

export default function Wishlist() {
    const {user : {wishlist}} = useUser();
    console.log(wishlist)
    return (
        !wishlist.length ? <EmptyWishlist/>:<div className = "wishlist">
        {
            wishlist.map((product)=>{
                return(
                    <WishlistCard wishlist ={product} key ={product._id}/>
                )
            })
        }
        
        
    </div>    )
}
