import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/nike.webp';
export default function ProductDetail({ data }) {
  const { seller, reviews } = data;
  const addCart = () => {
    let shoppingCart = {};
    if (localStorage.getItem('shopping-cart')) {
      shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
    }
    const quantity = shoppingCart[data.Uuid];
    if (quantity) {
      shoppingCart[data.Uuid] = quantity + 1;
    } else {
      shoppingCart[data.Uuid] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    console.log(data.Uuid);
    localStorage.setItem(data.Uuid, 1);
    const qty = localStorage.getItem(data.Uuid);
    console.log(qty);
  };
  return (
    <div className="bg-slate-100 py-10">
      <div className="bg-white mx-auto max-w-screen-xl shadow-md text-gray-700 rounded-md">
        <div className="flex gap-8">
          <Image
            width={200}
            height={200}
            className="p-1 rounded-sm w-1/3 h-full border-2"
            src={logo}
            alt="product image"
          />
          <div className="space-y-4">
            <div className="text-4xl mb-6">{data.Name}</div>
            <div className="bg-slate-200 shadow p-4 rounded-md">
              <div className="text-lg font-semibold">Seller Info</div>
              <div className="space-x-2">
                <span>Company Name:</span>
                <span>{seller.CompanyName}</span>
              </div>
              <div className="space-x-2">
                <span>Seller Name:</span>
                <span>{seller.Name}</span>
              </div>
              <div className="space-x-2">
                <span>Seller status:</span>
                <span>{seller.Status}</span>
              </div>
            </div>
            <div className="bg-slate-200 shadow p-4 rounded-md">
              <div className="text-lg font-semibold">Product Details</div>
              <div className="space-x-2">
                <span>Stock available:</span>
                <span>{data.Qty}</span>
              </div>
              <div className="space-x-2">
                <span>Waranty:</span>
                <span>{data.Waranty}</span>
              </div>
              <div className="space-x-2">
                <span>Description:</span>
                <span>{data.Desc}</span>
              </div>
              <div className="space-x-2">
                <span>Rating:</span>
                <span>{reviews.length > 0 ? `${reviews.length} review` : 'No review'}</span>
              </div>
            </div>
            <div className="space-x-2">
              <span className="text-lg font-semibold">Price: </span>
              <span className="text-red-500 text-xl font-semibold">৳ {data.Price}</span>
            </div>
            <div className="flex gap-10">
              <Link href={'/checkout'} className="bg-blue-400 text-md font-semibold px-8 py-4 rounded-md">
                Buy Now
              </Link>
              <button className="bg-orange-400 text-md font-semibold px-8 py-4 rounded-md" onClick={addCart}>
                Add To Cart <span className="text-xl">+</span>
              </button>
            </div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
      <div className="bg-white mx-auto max-w-screen-xl shadow-md text-gray-700 mt-8 p-4 rounded-md">
        <div className="text-2xl font-semibold mb-6">Reviews and Ratings</div>
        <div>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.Id} className="bg-slate-200 shadow p-4 rounded-md mt-4">
                <div className="space-x-2">
                  <span className="font-semibold">Rating:</span>
                  <span>{review.Rating}</span>
                </div>
                <div className="space-x-2">
                  <span className="font-semibold">Review:</span>
                  <span>{review.Message}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-slate-200 shadow p-4 rounded-md">
              <div className="space-x-2">
                <span>No review</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const id = context.params.pid;
  const res = await axios.get(`http://localhost:3333/api/product/${id}/all`);
  const data = await res.data;
  return { props: { data } };
}
