const Newsletter = () => {
  return (
    <section className="pb-11 pt-17.5 sm:pt-22.5 xl:pt-27.5">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap items-center justify-between gap-10">
          <div className="w-full max-w-[352px]">
            <h3 className="mb-2 text-heading-5 font-semibold text-white">
              Get in Touch
            </h3>
            <p className="font-medium">
              Send a message or connect via LinkedIn to discuss your next
              project.
            </p>
          </div>

          <div className="flex w-full max-w-[534px] flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="mailto:Luman.Chad@outlook.com"
              className="button-border-gradient hover:button-gradient-hover relative flex items-center justify-center rounded-lg px-7 py-3 text-sm text-white shadow-button hover:shadow-none"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/chad-luman"
              target="_blank"
              rel="noreferrer"
              className="button-border-gradient hover:button-gradient-hover relative flex items-center justify-center rounded-lg px-7 py-3 text-sm text-white shadow-button hover:shadow-none"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
