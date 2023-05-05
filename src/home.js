import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./home.css";
import Item from "./item";
import Total from "./total";
const Home = () => {
  const [cart, setcart] = useState([]);
  let amount = 0;
  let itemcount = 0;
  useEffect(() => {
    async function fetchData() {
      let data = await fetch("https://fakestoreapi.com/products?limit=6");
      let result = await data.json();
      setcart(result);
      getitems();
    }
    fetchData();
  }, []);
  try {
    const userToken = localStorage.getItem("token");
    const data2 = jwtDecode(userToken);
    const fullName = data2.user.fullName;
    const email = data2.user.email;
    return (
      <>
        <div className="jwt">
          <h1>Merhaba {fullName}</h1>
        </div>
        <h1 className="mycart">
          Sepetim <p>{cart.length}</p>
          <h4>Ürün</h4>
        </h1>
        <div className="main">
          <div className="itemsList">
            {cart.map((item) => (
              <Item
                key={item.id}
                itemid={item.id}
                image={item.image}
                title={item.title}
                category={item.category}
                price={item.price}
              />
            ))}
          </div>

          {
            (cart.forEach((item) => (amount = amount + item.price)),
            (<Total totalprice={amount.toFixed(2)} />))
          }
        </div>
      </>
    );
  } catch (e) {
    localStorage.clear();
  }
  function getitems() {
    let cartitems = document.querySelectorAll(".Cartitem");
    cartitems.forEach((item, index) => {
      itemcount = cartitems.length;
      item.querySelector(".delete").classList.add(".visible");
      item.addEventListener("click", (e) => {
        switch (e.target.textContent) {
          case "+": {
            let count = item.querySelector(".amount").textContent;
            let productprice = parseFloat(
              item.querySelector(".details h2").textContent
            );
            count++;
            if (count > 1) {
              item.querySelector(".delete").classList.remove("visible");
            }
            item.querySelector(".amount").textContent = count;
            item.querySelector(".details h5").textContent =
              (productprice * count).toFixed(2) + "TL.";
            let tprice = parseFloat(
              document.querySelector(".checkout h4").textContent
            );
            let cargofreeprice = tprice + productprice * count;
            if (cargofreeprice > 500) {
              document.querySelector(".freeshipping").classList.add("visible");
              document
                .querySelector(".cargoamountTL")
                .classList.add("cargopricedelete");
            } else {
              document
                .querySelector(".freeshipping")
                .classList.remove("visible");
              document
                .querySelector(".cargoamountTL")
                .classList.remove("cargopricedelete");
            }
            document.querySelector(".checkout h4").textContent = Math.fround(
              tprice + productprice * 1
            ).toFixed(2);
            document.querySelector(".orderamount").textContent =
              document.querySelector(".checkout h4").textContent + "TL";
            break;
          }
          case "-": {
            let count = item.querySelector(".amount").textContent;
            if (count != 1) {
              let productprice = parseFloat(
                item.querySelector(".details h2").textContent
              );
              count--;
              if (count === 1) {
                item.querySelector(".delete").classList.add("visible");
              }

              item.querySelector(".details h5").textContent =
                (productprice * count).toFixed(2) + "TL.";
              let tprice = parseFloat(
                document.querySelector(".checkout h4").textContent
              );
              let cargofreeprice = tprice - productprice * count;
              if (cargofreeprice >= 500) {
                document
                  .querySelector(".freeshipping")
                  .classList.add("visible");
                document
                  .querySelector(".cargoamountTL")
                  .classList.add("cargopricedelete");
              } else {
                document
                  .querySelector(".freeshipping")
                  .classList.remove("visible");
                document
                  .querySelector(".cargoamountTL")
                  .classList.remove("cargopricedelete");
              }
              document.querySelector(".checkout h4").textContent = Math.fround(
                tprice - productprice * count
              ).toFixed(2);

              item.querySelector(".amount").textContent = count;
              document.querySelector(".orderamount").textContent =
                document.querySelector(".checkout h4").textContent + "TL";
              break;
            }
          }

          case "SİL": {
            let productprice = item.querySelector(".details h2").textContent;
            let tprice = Math.max(
              document.querySelector(".checkout h4").textContent
            );
            document.querySelector(".checkout h4").textContent = Math.max(
              tprice - productprice * 1
            ).toFixed(2);
            document.querySelector(".orderamount").textContent =
              document.querySelector(".checkout h4").textContent + "TL";
            cartitems.item(index).style.animation = "removeanimation 0.5s ease";
            cartitems.item(index).addEventListener("animationend", () => {
              cartitems
                .item(index)
                .parentNode.removeChild(cartitems.item(index));
              itemcount--;
              document.querySelector(".mycart p").textContent = itemcount;
            });
            break;
          }
        }
      });
    });
  }
};
export default Home;
