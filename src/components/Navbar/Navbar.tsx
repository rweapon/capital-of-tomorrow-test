import Link from 'next/link';

import { navigationItems } from '@/components/Navbar/data';
import { MobileMenu } from '@/components/Navbar/MobileMenu/MobileMenu';

export const Navbar = () => {
  return (
    <header className='relative flex items-center justify-end md:justify-betwen w-full md:flex-col px-2 sm:px-4 md:px-8 lg:px-12 xl:px-24 mt-4'>
      <nav className='hidden md:block h-16 w-full border-b border-primarytext-primary-foreground/50 '>
        <ul className='shrink-1 flex size-full items-center justify-between gap-x-px xl:gap-x-8'>
          {navigationItems.map((item) => (
            <li className='font-monda flex size-full' key={item.id}>
              <Link
                href={item.href}
                className='flex size-full items-center justify-center text-center text-base font-bold tracking-[-0.96px] text-primary-foreground hover:text-blue-500'
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <MobileMenu className='block md:hidden relative p-0 w-12 aspect-square bg-transparent border-none cursor-pointer burger-button burger-button_after' />
    </header>
  );
};
