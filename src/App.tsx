import './App.css';
import { useEffect, useState } from 'react';
import { ProductModel } from './product.model';
import Tooltip from "./components/tooltip.tsx";
import {mockData} from "./assets/mockData.ts";

function App() {
    const [products, setProducts] = useState<ProductModel[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4040/api/products');
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts().then(console.log);
    }, []);

    return (
        <>
            <>
                <ul>
                    {(products.length ? products : mockData).map((product) => (
                        <li key={product.id}>
                            <Tooltip description={product.description}>
                                <span>{product.name}</span>
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </>
        </>
    );
}

export default App;
