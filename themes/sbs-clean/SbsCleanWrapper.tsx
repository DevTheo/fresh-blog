import { ThemeWrapperPageProps } from "../theme-service.ts";
import { WrapperHead } from "./SbsCleanHead.tsx";
import { SbsCleanNav } from "./SbsCleanNav.tsx";

export function SbsCleanWrapper(props: ThemeWrapperPageProps) {
    
    return (<>
        <WrapperHead pageName={props.name} blogSettings={props.blogSettings} />
        <div>
            <SbsCleanNav />
            {/*-- Page Header--*/}
            <header class="masthead" style="background-image: url('assets/img/contact-bg.jpg')">
                <div class="container position-relative px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7">
                            <div class="page-heading">
                                <h1>{props.name}</h1>
                                {/* <span class="subheading">{ props.cmsComponent({name:"contact_subtitle"}) ?? " " }</span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*-- Main Content--*/}
            <main class="mb-4">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-md-10 col-lg-8 col-xl-7">
                            <div class="my-5">
                                {props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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
            <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>

        </div>
    </>);
}