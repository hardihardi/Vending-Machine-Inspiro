import { useState, useEffect } from 'react';

const initialItems = [
  { name: 'Biskuit', price: 6000, stock: 5 },
  { name: 'Chips', price: 8000, stock: 5 },
  { name: 'Oreo', price: 10000, stock: 5 },
  { name: 'Tango', price: 12000, stock: 5 },
  { name: 'Cokelat', price: 15000, stock: 5 },
];

const VendingMachine = () => {
  const [items, setItems] = useState(initialItems);
  const [balance, setBalance] = useState(0);
  const [message, setMessage] = useState('');

  const insertMoney = (amount) => {
    const validDenominations = [2000, 5000, 10000, 20000, 50000];
    if (!validDenominations.includes(amount)) {
      setMessage('Pecahan uang tidak valid!');
      return;
    }

    setBalance(balance + amount);
    setMessage(`Uang Anda: ${balance + amount}`);
  };

  const purchaseItem = (index) => {
    const item = items[index];

    if (item.stock <= 0) {
      setMessage(`${item.name} habis!`);
      return;
    }

    if (balance < item.price) {
      setMessage('Uang tidak cukup!');
      return;
    }

    // Lakukan pembelian
    const updatedItems = [...items];
    updatedItems[index].stock -= 1;
    setItems(updatedItems);
    setBalance(balance - item.price);
    setMessage(`Anda membeli ${item.name}`);

    // Tambahkan stok secara otomatis setelah 5 detik
    setTimeout(() => {
      const updatedItemsWithRestock = [...updatedItems];
      updatedItemsWithRestock[index].stock += 1; // Menambah stok
      setItems(updatedItemsWithRestock);
      setMessage(`Stok ${item.name} telah ditambahkan.`);
    }, 5000);

    // Tambahkan saldo secara otomatis
    setBalance(balance + item.price);
  };

  const refund = () => {
    setMessage(`Pengembalian uang: ${balance}`);
    setBalance(0);
  };

  const resetStock = () => {
    setItems(initialItems);
    setMessage('Stok makanan telah direset.');
  };

  return (
    <div className="vending-machine">
      <h1>Mesin Vending</h1>
      <div className="items">
        {items.map((item, index) => (
          <div key={index} className="item">
            <h2>{item.name}</h2>
            <p>Harga: {item.price}</p>
            <p>Stok: {item.stock}</p>
            <button onClick={() => purchaseItem(index)}>Beli</button>
          </div>
        ))}
      </div>
      <div className="money-input">
        <h3>Masukkan Uang:</h3>
        {[2000, 5000, 10000, 20000, 50000].map((denom) => (
          <button key={denom} onClick={() => insertMoney(denom)}>
            {denom}
          </button>
        ))}
      </div>
      <button onClick={refund}>Pengembalian Uang</button>
      <button onClick={resetStock}>Reset Stok</button>
      <h3>{message}</h3>
      <h3>Saldo: {balance}</h3>
      <style jsx>{`
        .vending-machine {
          text-align: center;
          margin: 20px;
          padding: 20px;
          border: 2px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .items {
          display: flex;
          justify-content: space-around;
          margin: 20px  0;
        }
        .item {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          width: 150px;
          transition: transform 0.2s;
        }
        .item:hover {
          transform: scale(1.05);
        }
        .money-input {
          margin: 20px 0;
        }
        button {
          margin: 5px;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: #0070f3;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
};

export default VendingMachine;