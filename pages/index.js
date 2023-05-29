import ProductCard from '@/components/product-card';
import axios from 'axios';

export default function Home({ data }) {
  return (
    <main className="pt-12 w-full bg-slate-100">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 grid gap-7 grid-cols-3 lg:px-8 md:grid-cols-4 lg:grid-cols-5">
        {data.map((product) => (
          <ProductCard key={product.Id} product={product} />
        ))}
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const res = await axios.get('http://localhost:3333/api/product/all');
  const data = await res.data;
  return { props: { data } };
}
