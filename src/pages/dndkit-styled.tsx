import Head from "next/head"
import StyledDndkit from "~/views/DndKit/StyledDndkit";

const dndkit = () => {
  return (
    <>
      <Head>
        <title>Dnd-Kit Example / ToyBox</title>
      </Head>
      <StyledDndkit />
    </>
  )
}
export default dndkit;
