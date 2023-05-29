import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
export default function NavbarChild() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3333/api/category/all')
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Search
  const [inputValue, setInputValue] = useState();
  const router = useRouter();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // redirect to the same page with query params containing the input value
    router.push({
      pathname: 'search',
      query: { pkey: inputValue },
    });
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="dropdown">
          <label tabIndex={0} className="bg-violet-500 hover:bg-violet-600 btn m-1">
            All Category
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {categories.map((category) => (
              <li key={category.Id}>
                <Link href={`/category/?type=${category.Name}`}>{category.Name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <form action="" onSubmit={handleFormSubmit}>
            <div className="flex">
              <input
                type="search"
                placeholder="Search DesiDukaan"
                value={inputValue}
                onChange={handleInputChange}
                required
                className="w-[400px] bg-slate-50 rounded-s-md border-none"
              />
              <button type="submit" className=" bg-violet-400 rounded-e-md p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
