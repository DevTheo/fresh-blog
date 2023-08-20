import { blogConfig } from "../blog-config.ts";
import { BlogPost } from "../models/blogpost.ts";
import { blogService } from "../services/blog-service.ts";
import { PageProps } from "$fresh/server.ts";
import { parseUrlVars } from "../utils/parse-utils.ts";

const homePage = blogConfig.theme!.homePage;

export default function Home(props: PageProps) {
  const allEntries = blogService.getBlogPostsOrderedByDateDesc();
  const query = parseUrlVars(props.url.href);
  const pageIndex = Number(query.kvp["index"] || 0);
  const startIndex = (pageIndex * homePage.RecentBlogEntryCount);
  const lastIndex = startIndex + homePage.RecentBlogEntryCount-1;
  
  const visibleEntries = allEntries.slice(startIndex, lastIndex) as BlogPost[];
  const nextPageDisabled = lastIndex >= allEntries.length;
  const prevPageDisabled = pageIndex <= 0;
  
  const nextPage = nextPageDisabled ? `/?index=${pageIndex}` : `/?index=${pageIndex+1}`;
  const prevPage = prevPageDisabled ? `/?index=${pageIndex}` : `/?index=${pageIndex-1}`
  console.log(pageIndex, startIndex, lastIndex, allEntries.length, prevPageDisabled, nextPageDisabled, nextPage);
  
  return (
    <>
      <homePage.Component 
        blogSettings={blogConfig} 
        blogEntries={visibleEntries} 
        nextPageDisabled={nextPageDisabled}
        nextPage={nextPage}
        prevPageDisabled={prevPageDisabled} 
        prevPage={prevPage}
        />
    </>
  );
}
