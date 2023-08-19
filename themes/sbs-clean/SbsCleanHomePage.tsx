import { VNode } from "preact";
import { ThemeHomeProps } from "../theme-service.ts";
import { HomeHead } from "./SbsCleanHead.tsx";
import { SbsCleanNav } from "./SbsCleanNav.tsx";
import theme, { themeAssets } from "./theme.ts";
import { BlogPost } from "../../models/blogpost.ts";

export default function HomePage(props: ThemeHomeProps) {
    const blogSettings = props.blogSettings;
    //const blogEntries = props.blogEntries || [] as BlogPost[];
    console.log("props.blogEntries", props.blogEntries);

    return (<>
        <HomeHead pageName="Home" blogSettings={blogSettings} />
        <div>
            <SbsCleanNav />
            {/*-- Page Header--*/}
            <header class="masthead" style={`background-image: url('${themeAssets}assets/img/home-bg.jpg')`}>
                <div class="container position-relative px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7">
                            <div class="site-heading">
                                <h1>{blogSettings.blogTitle}</h1>
                                <span class="subheading">By {blogSettings.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*-- Main Content--*/}
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                    {(props?.blogEntries || []).map((blogEntry: BlogPost, i: number) => (
                        <>{/*-- Post preview--*/}
                        <div class="post-preview">
                            <a href={`/posts/${blogEntry.slug}`}>
                                <h2 class="post-title">{blogEntry.title}</h2>
                                <h3 class="post-subtitle">{blogEntry.subTitle}</h3>
                            </a>
                            <p class="post-meta">
                                {blogEntry.snippet}<br/>
                                Posted by&nbsp;
                                <a href="/">{blogEntry.author || blogSettings.author}</a>&nbsp;
                                on {blogEntry.publishedAt ?? "??"}
                            </p>
                        </div>
                        {/*-- Divider--*/}
                        <hr class="my-4" /></>
                    )) }
                        {/*-- Pager--*/}
                        <div class="d-flex justify-content-end mb-4"><a class="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div>
                    </div>
                </div>
            </div>
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
                            <div class="small text-center text-muted fst-italic">Copyright &copy; Your Website 2023</div>
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