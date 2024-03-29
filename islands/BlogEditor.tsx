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

    const deleteData = async () => {
        const result = await fetch(window.location.href, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if(result.status === 200) {
            alert("Deleted");
        } else {
            console.error(result);
            alert("Failed to delete");
        }
        window.location.href = "/admin";
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

    return (<>
        <div class="row g-1">
            <div class="col col-sm-4">&nbsp;</div>
            <div class="col">
                <button onClick={() => saveData()}>Save</button>
                <button onClick={() => { if(window.confirm("Are you sure you want to delete this post?")) deleteData()} }>Delete</button>
            </div>
        </div>
        <div class="row g-1">
            <div class="col col-sm-2"><strong>Title:</strong></div>
            <div class="col"><input name="title" type="text" value={title} onChange={handleOnChange} /></div>
        </div>
        <div class="row g-1">
            <div class="col col-sm-2"><strong>SubTitle:</strong></div>
            <div class="col"><input name="subtitle" type="text" value={subtitle} onChange={handleOnChange} /> </div>
            </div>
        <div class="row g-1">
            <div class="col col-sm-2"><strong>Author:</strong></div>
            <div class="col col-sm-2"><input name="author" type="text" value={author} onChange={handleOnChange} /> </div>
            </div>
        <div class="row g-1">
            <div class="col col-sm-2"><strong>Slug (autogen'd):</strong></div>
            <div class="col"><input name="slug" type="text" value={slug} onChange={handleOnChange} /> </div>
            </div>
        <div class="row g-1">
            <div class="col col-sm-2"><strong>Category:</strong></div>
            <div class="col"><input name="category" type="text" value={category} onChange={handleOnChange} /> </div>
            </div>
        <div class="row g-1">
            <div class="col col-sm-2"><strong>tags (csv):</strong></div>
            <div class="col"><input name="tags" type="text" value={tags} onChange={handleOnChange} /> </div>
            </div>
        <div class="row g-1">
            <div class="col"><strong>Snippet:</strong></div>
        </div>
        <div class="row g-1">
            <div class="col"><textarea name="snippet" rows={5} cols={60} onChange={handleOnChange}>{snippet}</textarea></div>
        </div>
        <div class="row g-1">
            <CkEditor name="blogPostContent" html={blogPostContent} showSave={false} />
        </div>
        <div class="row g-1">
            <div class="col col-sm-4">&nbsp;</div>
            <div class="col"><button onClick={() => saveData()}>Save</button></div>
        </div>
    </>);
}

