import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/nike.webp';
export default function ProductCard({ product }) {
  return (
    <div
      className="w-full max-w-sm bg-white border rounded-lg shadow hover:shadow-lg hover:shadow-violet-300"
      title={product.Name}
    >
      <Link href={`/product/${product.Uuid}`}>
        <div className="">
          <Image width={200} height={200} className="p-1 rounded-sm h-1/2 w-full" src={logo} alt="product image" />
          <div className="px-5 pb-5">
            <h5 className="tracking-tight text-gray-900">{product.Name}</h5>
            <span className="text-lg font-semibold text-red-500">৳ {product.Price}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
