import Head from "next/head"
import Dndkit from "~/views/DndKit/DndKit"

const dndkit = () => {
  return (
    <>
      <Head>
        <title>Dnd-Kit Example / ToyBox</title>
      </Head>
      <Dndkit />
    </>
  )
}
export default dndkit;
