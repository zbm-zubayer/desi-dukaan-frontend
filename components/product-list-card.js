import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/nike.webp';
export default function ProductListCard({ product }) {
  return (
    <div className="my-3 bg-slate-200 border-2 hover:border-fuchsia-600  rounded-lg hover:shadow-lg hover:shadow-violet-300 transition-all">
      <Link href={`/product/${product.Uuid}`}>
        <div className="flex items-center gap-8 p-1">
          <div>
            <Image
              width={200}
              height={200}
              className="p-1 rounded-md w-[100px] h-[120px] border-gray-400 border-2"
              src={logo}
              alt="product image"
            />
          </div>
          <div>
            <p className="tracking-wide text-gray-700 text-xl font-semibold">{product.Name}</p>
            <div className="space-x-2">
              <span className="font-semibold">Company:</span>
              <span>hi co</span>
            </div>
            <div className="space-x-2">
              <span>Stock available:</span>
              <span> {product.Qty}</span>
            </div>
            <div className="space-x-2">
              <span>Waranty:</span>
              <span> {product.Waranty}</span>
            </div>
            <div className="text-lg font-semibold space-x-2">
              <span>Price:</span>
              <span className="text-red-400">৳ {product.Price}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
