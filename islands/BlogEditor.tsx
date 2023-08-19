import { Signal } from "@preact/signals";
import { BlogPost } from "../models/blogpost.ts";
import { CkEditor } from "./CkEditor.tsx";
import { useState } from "preact/hooks";
import { TargetedEvent } from "preact/compat";

export type BlogEditorProps = {
    blogPost: Signal<BlogPost>;
    defaultAuthor: string;
    blogPostContent: Signal<string>;
    message: string;
    errorMessage: string;
};

const slugify = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
};

export function BlogEditor({blogPost, blogPostContent,defaultAuthor, message, errorMessage}: BlogEditorProps) {
    const [author, setAuthor] = useState(blogPost.value.author ?? defaultAuthor);
    const [title, setTitle] = useState(blogPost.value.title ?? "");
    const [subtitle, setSubtitle] = useState(blogPost.value.subTitle ?? "");
    const [snippet, setSnippet] = useState(blogPost.value.snippet ?? "");
    const [slug, setSlug] = useState(blogPost.value.slug ?? "");
    const [category, setCategory] = useState(blogPost.value.category ?? "");
    const [tags, setTags] = useState(blogPost.value.tags ?? "");

    const handleOnChange = (event: TargetedEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const el = (event.target as HTMLInputElement | HTMLTextAreaElement);
        const name = el.name;
        if(name === "author") {
            setAuthor(el.value);
        } else if(name === "title") {
            setTitle(el.value);
            setSlug(slugify(el.value));
        } else if(name === "subtitle") {
            setSubtitle(el.value);
        } else if(name === "slug") {
            setSlug(el.value);
        } else if(name === "snippet") {
            setSnippet(el.value);
        } else if(name === "category") {
            setCategory(el.value); 
        } else if(name === "tags") {
            setTags(el.value); 
        }
    }

    const saveData = async () => {
        blogPost.value.author = author;
        blogPost.value.title = title;
        blogPost.value.subTitle = subtitle;
        blogPost.value.slug = slug;
        blogPost.value.category = category;
        blogPost.value.tags = tags;
        blogPost.value.snippet = snippet;
        blogPost.value.content = blogPostContent.value;
        blogPost.value.isPublished = true;
        blogPost.value.publishedAt = (new Date()).toISOString();
 
        const result = await fetch(window.location.href, {
            body: JSON.stringify(blogPost.value),
            method: "post",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(result.status === 200) {
            alert("Saved");
        } else {
            console.error(result);
            alert("Failed to save");
        }
    }

    return (
        <div>
            <a href="/tools/admin">Return to Admin</a><br/>
            <button onClick={() => saveData()}>Save</button><br/>
            <label>Title: <input name="title" type="text" value={title} onChange={handleOnChange} /></label><br/>
            <label>SubTitle: <input name="subtitle" type="text" value={subtitle} onChange={handleOnChange} /></label><br/>
            <label>Author: <input name="author" type="text" value={author} onChange={handleOnChange} /></label><br/>
            <label>Slug (autogen'd): <input name="slug" type="text" value={slug} onChange={handleOnChange} /></label><br/>
            <label>Category: <input name="category" type="text" value={category} onChange={handleOnChange} /></label><br/>
            <label>tags (csv): <input name="tags" type="text" value={tags} onChange={handleOnChange} /></label><br/>
            <label>Snippet: <textarea name="snippet" rows={5} cols={60} onChange={handleOnChange}>{snippet}</textarea></label><br/>
            <CkEditor name="blogPostContent" html={blogPostContent} showSave={false} />
        </div>
    );
}

