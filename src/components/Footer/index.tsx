import Link from 'next/link';
import FooterLinkList from './FooterLinkList';
import { companiesLink, productsLink, supportsLink } from './linksData';

const Footer = () => {
  return (
    <footer className='relative z-10 border-t border-white/10 bg-[#0d0d0c] pb-14'>
      <div className='relative mx-auto max-w-[1240px] px-5 pt-14 sm:px-8 xl:px-0'>
        <div className='flex flex-wrap justify-between gap-12'>
          <div className='w-full max-w-[520px]'>
            <Link href='/' className='mb-8 inline-flex items-center gap-3'>
              <span className='flex h-11 w-11 items-center justify-center border border-[#d8ff3e] font-serif text-xl text-[#f1efe7]'>
                CL
              </span>
              <span className='font-mono text-xs tracking-[0.18em] text-[#f1efe7] uppercase'>
                Chad Luman
              </span>
            </Link>

            <p className='mb-12 max-w-[430px] leading-7 text-[#77756e]'>
              Military veteran and full stack developer building useful web
              products with an operator&apos;s attention to reliability.
            </p>

            <p className='font-mono text-[10px] tracking-[0.15em] text-[#55544f] uppercase'>
              © {new Date().getFullYear()} Chad Luman. Built with Next.js.
            </p>
          </div>

          <div className='w-full max-w-[571px]'>
            <div className='flex flex-col gap-10 sm:flex-row sm:justify-between'>
              <FooterLinkList title='Index' links={productsLink} />
              <FooterLinkList title='Documents' links={companiesLink} />
              <FooterLinkList title='Channels' links={supportsLink} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
