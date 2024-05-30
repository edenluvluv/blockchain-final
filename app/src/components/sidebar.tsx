import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { UseProgramContext } from "../contexts/programContextProvider";

export const Sidebar = () => {
    const router = useRouter();
    const { disconnect } = useWallet();
    const programContext = UseProgramContext()!;

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <div className="flex flex-col fixed top-0 left-0 h-full bg-green-500 w-52 z-50">
            {programContext.state.user.foundUser && (
                <div className="mt-auto mb-8 ml-6">
                    <div className="flex items-center cursor-pointer" onClick={() => navigateTo("/profile")}>
                        <div className="flex items-center">
                            <div className="mr-2">
                                <img className="w-10 h-10 rounded-full" src={programContext.state.user.image ? programContext.state.user.image : "/img.png"} alt="User" />
                            </div>
                            <span className="truncate text-2xl hover:text-slate-400">{programContext.state.user.username}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => navigateTo("/users")}>Friends</div>
            <div className="p-4 hover:bg-gray-700 cursor-pointer" onClick={() => navigateTo("/")}>Posts</div>
            <WalletMultiButton className="mt-auto ml-1" />
        </div>
    );
};
