import Link from 'next/link';

export default function AccountSideBar(props) {
  return (
    <>
      <div className="w-1/5">
        <ul className="space-y-2">
          <li>
            <Link
              className="block bg-gray-300 rounded-md px-6 py-3 hover:text-violet-500 hover:shadow-md transition-all"
              href={'/customer/my-orders/' + props.Id}
            >
              My Orders
            </Link>
          </li>
          <li>
            <Link
              className="block bg-gray-300 rounded-md px-6 py-3 hover:text-violet-500 hover:shadow-md transition-all"
              href={'./orders'}
            >
              My Payment options
            </Link>
          </li>
          <li>
            <Link
              className="block bg-gray-300 rounded-md px-6 py-3 hover:text-violet-500 hover:shadow-md transition-all"
              href={'./orders'}
            >
              My Reviews
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
