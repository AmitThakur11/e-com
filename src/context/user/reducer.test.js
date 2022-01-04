import {userReducer} from "./reducer"


describe("update user data",()=>{
    const initialState = {
        username: "",
        wishlist: [],
        cart: [],
        address: [],
        order: [],
        defaultAddress: null,
      };
    test("Updating  wishlist",()=>{
        const expectingValue = userReducer(initialState , {type : "UPDATE WISHLIST",payload  : [{_id : "1" , name :"Tshirt"}] });
        expect(expectingValue).toEqual(
            {
                username: "",
                wishlist: [{_id : "1" , name :"Tshirt"}],
                cart: [],
                address: [],
                order: [],
                defaultAddress: null,
              }
        )

    })


    test("  Updating  cart",()=>{
        const expectingValue = userReducer(initialState , {type : "UPDATE CART",payload  : [{_id : "1" , name :"Tshirt"}] });
        expect(expectingValue).toEqual(
            {
                username: "",
                wishlist: [],
                cart: [{_id : "1" , name :"Tshirt"}],
                address: [],
                order: [],
                defaultAddress: null,
              }
        )

    })

    test("Add a order and empty cart",()=>{
        const expectingValue = userReducer(initialState , {type : "ADD ORDER",payload  : [{_id : "1" , name :"Tshirt"}] });
        expect(expectingValue).toEqual(
            {
                username: "",
                wishlist: [],
                cart: [],
                address: [],
                order: [{_id : "1" , name :"Tshirt"}],
                defaultAddress: null,
              }
        )

    })
    test("Remove order",()=>{
        const initialState = {
            username: "",
            wishlist: [],
            cart: [],
            address: [],
            order: [{_id : "1" , name :"Tshirt"}],
            defaultAddress: null,
          };
        const expectingValue = userReducer(initialState , {type : "ADD ORDER",payload  : [] });
        expect(expectingValue).toEqual(
            {
                username: "",
                wishlist: [],
                cart: [],
                address: [],
                order: [],
                defaultAddress: null,
              }
        )

    })

    test("Selecting address",()=>{
        const expectingValue = userReducer(initialState,{type :"SELECT ADDRESS" , payload : {house : "1234",pincode : "12345", city : "mohali"}})
        expect(expectingValue).toEqual({
            username: "",
            wishlist: [],
            cart: [],
            address: [],
            order: [],
            defaultAddress: {house : "1234",pincode : "12345", city : "mohali"}
          })
    
    
    })
    
})