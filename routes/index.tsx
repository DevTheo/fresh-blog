import { useEffect, useState } from "preact/hooks";
import { blogConfig } from "../blog-config.ts";
import { BlogPost } from "../models/blogpost.ts";
import { blogService } from "../services/blog-service.ts";
import { PageProps } from "$fresh/server.ts";

const homePage = blogConfig.theme!.homePage;

export default function Home(props: PageProps) {
  const [blogEntries, setBlogEntries] = useState([] as BlogPost[]);
  const firstIndex = Number(props.params.firstIndex ?? 0);
  useEffect(() => {
    blogService.getBlogPostsOrderedByDateDesc().then((entries) => {
      const lastIndex = Math.min(firstIndex + homePage.RecentBlogEntryCount, entries.length - 1);
      setBlogEntries(entries.slice(firstIndex, lastIndex));
    });
  }, [firstIndex]);
  return (
    <>
      <homePage.Component blogSettings={blogConfig} blogEntries={blogEntries} />
    </>
  );
}
