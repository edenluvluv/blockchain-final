/** @format */

import Head from "next/head";
import { ReactNode, useEffect } from "react";
import { useNotifier } from "react-headless-notifier";
import { InfoAlert, MessageAlert, SpecialAlert } from "../components/alert";
import { SignupModal } from "../components/modal";
import { Sidebar } from "../components/sidebar";
import { UseProgramContext } from "../contexts/programContextProvider";
import { newUser } from "../program/user/user-methods";
import { CheckWallet } from "../utils/walletError";

const Layout = ({
 children,
 active,
 page = "default",
}: {
 children: ReactNode;
 active?: number;
 page?: string;
}) => {
 const { notify } = useNotifier();
 let ProgramContext = UseProgramContext();
 async function signup(username: string) {
  try {
   let walletError = await CheckWallet(ProgramContext?.getWallet, notify, ProgramContext, true);
   if (walletError.error) {
   } else {
    let user = await newUser({
     program: ProgramContext?.userProgram!,
     wallet: ProgramContext?.getWallet!,
     username,
     image: "",
    });
    ProgramContext?.changeState({ data: user.newUser, action: "username" });
    notify(<SpecialAlert text={`Welcome  ${username}`} dismiss={undefined} />);
    return user;
   }
  } catch (e) {
   console.log(e);
   console.log("signupError");
  }
 }
 useEffect(() => {
  if (ProgramContext?.notSeenMessages! > 0 && active !== 1) {
   notify(
    <MessageAlert
     text={`You have ${ProgramContext?.notSeenMessages} new message${
      ProgramContext?.notSeenMessages! > 1 ? "s" : ""
     }`}
     dismiss={undefined}
    />
   );
  }
  if (!ProgramContext?.state.didWelcome && ProgramContext?.state.user.foundUser) {
   notify(
    <SpecialAlert text={`Welcome Back ${ProgramContext.state.user.username}`} dismiss={undefined} />
   );
   ProgramContext.changeState({ action: "welcome" });
  }
 }, [ProgramContext?.state, ProgramContext?.notSeenMessages]);

 return (
  <>
   <Head>
    <link rel="icon" href="/logo.svg" />
   </Head>
   {ProgramContext?.showSignupModal && (
    <SignupModal signup={signup} setShowSignupModal={ProgramContext.setShowSignupModal} />
   )}

   {/* <div className="mr-52"> */}
   <Sidebar active={active} />
   {/* </div> */}
   <div className={page === "block" ? "" : `relative justify-center flex flex-row `}>
    {children}
   </div>
  </>
 );
};

export default Layout;
function Trending() {
 return (
  <>
   <div className="pr-40 ml-12 bg-slate-900">
    trending
    <div className="max-w-sm  fixed bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
     <a href="#">
      <img
       className="rounded-t-lg"
       src="https://static.wixstatic.com/media/5c4681_86416decada249daa9442db5b884d2f7~mv2.jpg"
       alt=""
      />
     </a>
     <div className="p-5">
      <a href="#">
       <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
       </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
       Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
       chronological order.
      </p>
      <a
       href="#"
       className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
       Read more
       <svg
        aria-hidden="true"
        className="ml-2 -mr-1 w-4 h-4"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path
         fillRule="evenodd"
         d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
         clipRule="evenodd"></path>
       </svg>
      </a>
     </div>
    </div>
    <button
     type="submit"
     className="fixed btn  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 capitalize  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
     New Block
    </button>
   </div>
  </>
 );
}
