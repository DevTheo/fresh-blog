import { ThemeBlogProps } from "../theme-service.ts";
import { PostHead } from "./SbsCleanHead.tsx";
import { SbsCleanNav } from "./SbsCleanNav.tsx";
import { themeAssets } from "./theme.ts";

export default function BlogPage(props: ThemeBlogProps) {
    const blogPost = props.blogEntry;
    const blogSettings = props.blogSettings;

    return (<>
        <PostHead pageName={blogPost?.title ?? "not found"} blogSettings={blogSettings} />
        <div>
            <SbsCleanNav />
            {/*-- Page Header--*/}
            <header class="masthead" style={`background-image: url('${themeAssets}assets/img/post-bg.jpg')`}>
                <div class="container position-relative px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7">
                            <div class="post-heading">
                                <h1>{blogPost?.title ?? "??"}</h1>
                                <h2 class="subheading">{blogPost?.subTitle ?? ""}</h2>
                                <span class="meta">
                                    Posted by&nbsp;
                                    <a href="/">{blogPost?.author ?? blogSettings.author}</a>&nbsp;
                                    on {blogPost?.publishedAt ?? "??"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*-- Post Content--*/}
            <article class="mb-4">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7" dangerouslySetInnerHTML={{__html: blogPost?.content ?? " "}}>
                        </div>
                    </div>
                </div>
            </article>
            {/*-- Footer--*/}
            <footer class="border-top">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7">
                            <ul class="list-inline text-center">
                                <li class="list-inline-item">
                                    <a href="#!">
                                        <span class="fa-stack fa-lg">
                                            <i class="fas fa-circle fa-stack-2x"></i>
                                            <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#!">
                                        <span class="fa-stack fa-lg">
                                            <i class="fas fa-circle fa-stack-2x"></i>
                                            <i class="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#!">
                                        <span class="fa-stack fa-lg">
                                            <i class="fas fa-circle fa-stack-2x"></i>
                                            <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                            <div class="small text-center text-muted fst-italic">Copyright &copy; Your Website {(new Date()).getFullYear()}</div>
                        </div>
                    </div>
                </div>
            </footer>
            {/*-- Bootstrap core JS--*/}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/*-- Core theme JS--*/}
            <script src="js/scripts.js"></script>

        </div>
    </>)
}