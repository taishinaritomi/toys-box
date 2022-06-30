import Head from "next/head";
import { RecoilRoot } from "recoil";
import Todo from "~/views/Todo/Todo";


const todo = () => {
  return (
    <RecoilRoot>
      <Head>
        <title>Todo / ToysBox</title>
      </Head>
      <Todo />
    </RecoilRoot>
  )
}
export default todo;
