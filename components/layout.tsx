import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

interface MenuItemType {
  href: string;
  title: string;
}

const Layout: React.FC = ({ children }) => {
  const router = useRouter();

  const menuItems: MenuItemType[] = useMemo(
    () => [
      { href: '/', title: 'main' },
      { href: '/about', title: 'about' },
      { href: '/barChart', title: 'BarChart' },
      { href: '/barChart2', title: 'BarChart2' },
      { href: '/line', title: 'LineChart' },
      { href: '/lineZoom', title: 'LineZoomChart' },
      { href: '/pie', title: 'PieChart' },
      { href: '/area', title: 'AreaChart' },
      { href: '/areaZoom', title: 'AreaZoomChart' },
      { href: '/scatter', title: 'Scatter' }
    ],
    []
  );

  return (
    <div className='flex min-h-screen'>
      <div className='min-h-full w-64 bg-red-300 py-8 px-4'>
        <nav>
          <ul className='flex flex-col gap-4'>
            {menuItems.map(({ href, title }) => (
              <li key={title}>
                <Link href={href}>
                  <a
                    className={`block h-full w-full cursor-pointer rounded bg-red-500 p-4 hover:bg-white ${
                      router.asPath === href && 'bg-white'
                    }`}
                  >
                    {title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='h-full'>{children}</div>
    </div>
  );
};

export default Layout;
