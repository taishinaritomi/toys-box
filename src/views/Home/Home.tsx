import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <Link href={'/todo'}>
        <a className="py-2 px-6 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors">
          Todo App
        </a>
      </Link>
      <p className="text-lg text-slate-400">Coming Soon...</p>
      <a className="mt-8 text-lg underline" href="https://github.com/taishinaritomi/toys-box">
        Repository
      </a>
    </div>
  )
}
export default Home;
