import Head from "next/head"
import Dndkit from "~/views/DndKit/DndKit"

const codeUrl = "https://github.com/taishinaritomi/toys-box/blob/main/src/views/DndKit/DndKit.tsx";

const dndkit = () => {
  return (
    <>
      <Head>
        <title>Dnd-Kit Example / ToysBox</title>
      </Head>
      <Dndkit />
      <div className="mt-4">
        <a href={codeUrl} tabIndex={-1}>CodeURL</a>
      </div>
    </>
  )
}
export default dndkit;
