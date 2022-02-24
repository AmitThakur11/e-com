import "./style.css";
import { useState } from "react";
import { useUser } from "../../context/user/index";
import { useNavigate } from "react-router-dom";
import { AddressForm } from "../../component";
import { AddressCard } from "../../component";
import { EditAddressForm } from "../../component";
import { useAuth } from "../../context/auth/index";
import {addRazorpay} from "../../utils/payment.js"
export default function Address() {
  const { user, userDispatch} = useUser();
  const { setLoading } = useAuth();
  const navigate = useNavigate();
  const initialEdit = {
    isEdit: false,
    editAddress: null,
  };
  const [edit, setEdit] = useState(initialEdit);
 


  return (
    <div className="addressPage">
      <AddressForm width="100%" />
      <section className="addressSection">
        {user?.address.map((address) => {
          return (
            user.address.length && (
              <AddressCard
                key={address._id}
                address={address}
                setEdit={setEdit}
              />
            )
          );
        })}
      </section>
      {edit.isEdit && <EditAddressForm edit={edit} setEdit={setEdit} />}

      {user.address.length ? (
        <div className="placeOrder_btn">
          <button
            onClick={() => {
              addRazorpay(user,navigate,userDispatch,setLoading)
            }}
          >
            Pay now
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
