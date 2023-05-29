import ProductListCard from '@/components/product-list-card';
import axios from 'axios';

export default function ProductSearchPage({ data }) {
  console.log(data);
  return (
    <div className="min-h-[60vh]">
      <div className="mx-auto max-w-screen-xl">
        <div className="my-6">
          <h1 className="text-3xl font-bold text-center">Search Results</h1>
        </div>
        <div>
          {data.length > 0 ? (
            data.map((product) => <ProductListCard key={product.Id} product={product} />)
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold">No Products Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({ query }) {
  const inputValue = query.pkey;
  const response = await axios.get('http://localhost:3333/api/product/search/' + inputValue);
  const data = await response.data;
  return { props: { data } };
}
