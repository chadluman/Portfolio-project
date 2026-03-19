import BlogGridContainer from "@/components/Blog/BlogGridContainer";
import Breadcrumb from "@/components/Breadcrumb";
import { getPosts } from "@/sanity/sanity-utils";
import { Metadata } from "next";
import { integrations, messages } from "../../../../integrations.config";

export const metadata: Metadata = {
  title: "Blog | Chad Luman",
  description:
    "Personal blog and technical notes from Chad Luman — full stack developer and systems analyst.",
};

export default async function BlogPage() {
  const posts = integrations.isSanityEnabled ? await getPosts() : [];

  return (
    <>
      <Breadcrumb pageTitle='Blog Grid' />

      <section className='pt-20 pb-17.5 lg:pt-25 lg:pb-22.5 xl:pb-27.5'>
        <div className='mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0'>
          {integrations?.isSanityEnabled ? (
            <BlogGridContainer blogs={posts} />
          ) : (
            <div>{messages.sanity}</div>
          )}
        </div>
      </section>
    </>
  );
}
