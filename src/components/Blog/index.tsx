import { getPosts } from "@/sanity/sanity-utils";
import { Blog } from "@/types/blog";
import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";

export default async function BlogSection() {
  const posts = await getPosts();

  return (
    <section className="py-20 lg:py-25">
      <div className="mx-auto max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <SectionTitle
          subTitle="Insights & Notes"
          title="Technical Blog"
          paragraph="Thoughts, tutorials, and lessons learned from building apps, managing systems, and working across technical teams."
        />

        <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 &&
            posts
              .slice(0, 3)
              .map((blog: Blog, index: number) => (
                <SingleBlog key={index} blog={blog} />
              ))}
        </div>
      </div>
    </section>
  );
}
