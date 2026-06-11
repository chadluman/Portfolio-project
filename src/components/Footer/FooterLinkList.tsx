import { FooterLink } from '@/types/footerLink';
const FooterLinkList = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => {
  return (
    <div>
      <h3 className='mb-5 font-mono text-[10px] tracking-[0.18em] text-[#d8ff3e] uppercase'>
        {title}
      </h3>

      <ul className='flex flex-col gap-3.5'>
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              target={link.newTab ? '_blank' : '_self'}
              rel={link.newTab ? 'nofollow noopener noreferrer' : undefined}
              className='text-sm text-[#77756e] duration-300 ease-in hover:text-[#f1efe7] focus-visible:outline-2 focus-visible:outline-[#d8ff3e]'
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinkList;
