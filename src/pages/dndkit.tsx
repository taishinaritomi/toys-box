import Head from "next/head"
import Dndkit from "~/views/DndKit/DndKit"

const codeUrl = "https://github.com/taishinaritomi/toy-box/blob/main/src/views/DndKit/DndKit.tsx";

const dndkit = () => {
  return (
    <>
      <Head>
        <title>Dnd-Kit Example / ToyBox</title>
      </Head>
      <Dndkit />
      <div className="mt-4">
        <a href={codeUrl} tabIndex={-1}>CodeURL</a>
      </div>
    </>
  )
}
export default dndkit;
