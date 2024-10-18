'use client'
import Image from "next/image";
import ReturnButton from "../components/ReturnButton/ReturnButton";
import SearchBar from "../components/SearchBar/SearchBar";
import { useState } from "react";
import styles from './homepage.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const router = useRouter();

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    const handleProductClick = (productID: number) => {
        console.log('Navigating to productID: ', productID);
        router.push(`/${productID}`);
    }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <ReturnButton/>
      <SearchBar onSearch={handleSearch} placeholder="Search a product ..." />
      {/* <div className={styles.productList}>
                {products.length > 0 ? (
                    <table className={styles.table}>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.productID} className={styles.productItem}>
                                    <td className={styles.productName}>{product.productName}</td>
                                    <td>
                                        <button className={styles.moreButton} onClick={() => handleProductClick(product.productID)}>เพิ่มเติม</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>ไม่พบผู้รับบริการที่ค้นหา</p>
                )}
            </div> */}
    </div>
  );
}
