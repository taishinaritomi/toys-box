import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen">
      <Link href={'/todo'}>
        <a className="py-2 px-6 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-lg shadow-slate-700/30 transition-colors">
          Todo App
        </a>
      </Link>
      <p className="text-sm text-slate-400">Coming Soon...</p>
      <a className="mt-8 underline hover:drop-shadow" href="https://github.com/taishinaritomi/toys-box">
        Repository
      </a>
    </div>
  )
}
export default Home;
