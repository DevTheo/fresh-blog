import { useEffect, useState } from "preact/hooks";
import { blogConfig } from "../blog-config.ts";
import { BlogPost } from "../models/blogpost.ts";
import { blogService } from "../services/blog-service.ts";
import { PageProps } from "$fresh/server.ts";
import { useSignal } from "@preact/signals";

const homePage = blogConfig.theme!.homePage;
const allEntries = blogService.getBlogPostsOrderedByDateDesc();

export default function Home(props: PageProps) {
  const [blogEntries] = useState(allEntries);
  const index = Number(props.params.index ?? 0);
  const lastIndex = index + homePage.RecentBlogEntryCount;
  const visibleEntries = useSignal<BlogPost[]>(blogEntries.slice(index, lastIndex));
  useEffect(() => {
    const lastIndex = Math.min(index + homePage.RecentBlogEntryCount, allEntries.length - 1);
    visibleEntries.value = [...blogEntries].slice(index, lastIndex);
  }, [blogEntries, index]);
  return (
    <>
      <homePage.Component blogSettings={blogConfig} blogEntries={visibleEntries.value} />
    </>
  );
}
