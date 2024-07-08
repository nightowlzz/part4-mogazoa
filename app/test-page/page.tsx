import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hook Testing Home</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/test-page/auth-test" className="text-blue-500 hover:underline">
            Auth Tests
          </Link>
        </li>
        <li>
          <Link href="/test-page/user-test" className="text-blue-500 hover:underline">
            User Tests
          </Link>
        </li>
        <li>
          <Link href="/test-page/product-test" className="text-blue-500 hover:underline">
            Product Tests
          </Link>
        </li>
        <li>
          <Link href="/test-page/review-test" className="text-blue-500 hover:underline">
            Review Tests
          </Link>
        </li>
        <li>
          <Link href="/test-page/category-test" className="text-blue-500 hover:underline">
            Category Tests
          </Link>
        </li>
        <li>
          <Link href="/test-page/follow-test" className="text-blue-500 hover:underline">
            Follow Tests
          </Link>
        </li>
        <li>
          <Link href="/test-page/oauth-test" className="text-blue-500 hover:underline">
            OAuth Tests
          </Link>
        </li>
        <li>
          <Link href="/test-page/image-test" className="text-blue-500 hover:underline">
            Image Upload Tests
          </Link>
        </li>
      </ul>
    </div>
  );
}
