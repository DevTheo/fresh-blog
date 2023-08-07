import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { CkEditorEditorTypes, getCkEditorBaseScript } from "../islands/CkEditor.tsx";
import { blogConfig } from "../blog-config.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        
        {/* CkEditor Setup */}
        {!blogConfig.readOnly && (<script 
          src={`${getCkEditorBaseScript(CkEditorEditorTypes.Superbuild)}`}></script>)}

      </Head>
      <Component />
    </>
  );
}
