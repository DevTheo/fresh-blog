// routes/admin/_layout.tsx
import { blogConfig } from "../../blog-config.ts";
import { LayoutProps } from "$fresh/server.ts";
import { getCkEditorBaseScript, CkEditorEditorTypes } from "../../islands/CkEditor.tsx";


const author = blogConfig.author;
const blogTitle = blogConfig.blogTitle;

export default function AdminLayout({ Component }: LayoutProps) {
  return (
    <html lang="en">
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <meta name="description" content="" />
            <meta name="author" content="" />
            <title>Blog Admin for {blogTitle}</title>
            <link rel="icon" type="image/x-icon" href="favicon.ico" />
            {/*-- Core theme CSS (includes Bootstrap)--*/}
            <link href="/admin/css/styles.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css"/>
            <script src={getCkEditorBaseScript(CkEditorEditorTypes.Superbuild)}></script>
            <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.js"></script>
        </head>
        <body id="page-top">
            {/*-- Navigation--*/}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <div class="container px-4">
                    <a class="navbar-brand" href="/admin">Admin for {blogTitle}</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item"><a class="nav-link" href="/">{blogTitle} Home</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/*-- Header--*/}
            <header class="bg-primary bg-gradient text-white">
                <div class="container px-4 text-center">
                    <h1 class="fw-bolder">Welcome to the {blogTitle} Admin</h1>
                    <p class="lead">A place to manage content and blog entries</p>
                    <a class="btn btn-lg btn-light" href="/admin/">Return to {blogTitle} Admin</a>
                </div>
            </header>
            {/*-- content section--*/}
            <section id="admin-content">
                <div class="container px-4">
                    <div class="row gx-4 justify-content-center">
                        <Component />
                    </div>
                </div>
            </section>
            {/*-- Footer--*/}
            <footer class="py-5 bg-dark">
                <div class="container px-4"><p class="m-0 text-center text-white">Copyright &copy; {author} 2023</p></div>
            </footer>
            {/*-- Bootstrap core JS--*/}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
            {/*-- Core theme JS--*/}
            <script src="/admin/js/scripts.js"></script>
        </body>
    </html>
  );
}