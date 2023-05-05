import React from "react";
import "./total.css";

function Total({ totalprice }) {
  return (
    <div className="checkout">
      <h1>ÖDENECEK TUTAR</h1>
      <div className="money">
        <h4>{totalprice}</h4>
        <p>TL</p>
      </div>
      <button>Alışverişi Tamamla</button>
      <p className="description">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
        fugiat architecto officia, nulla dolor id autem expedita placeat,
        consequatur, ea tempore quas sapiente maxime. Nam, cumque? Est cumque
        laboriosam alias.
      </p>
      <div className="cargo">
        <div className="cargoamount">
          <p>Kargo</p>
          <p className="freeshipping">Bedava</p>
          <p className="cargoamountTL">19.9TL </p>
        </div>
        <div className="ordertotal">
          <p>Ürünler</p>
          <p className="orderamount">{totalprice} TL</p>
        </div>
      </div>
    </div>
  );
}
export default Total;
