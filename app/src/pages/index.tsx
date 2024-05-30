import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Layout from "../sections/Layout";
import { NewPost } from "../components/new-post";
import moment from "moment";
import { ProgramContextInterface, UseProgramContext } from "../contexts/programContextProvider";
import { getAllPosts } from "../program/posts";
import { PostAccountData } from "../program/post";

interface PostType {
  likes: anchor.web3.PublicKey[];
  content: string;
  username: string;
  date: string;
  image: string;
  publickeyString: string;
  tip: number;
  postPubkey: anchor.web3.PublicKey;
  commentCount: number;
}

export default function Home() {
  const programContext = UseProgramContext()!;
  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetchedPosts, setFetchedPosts] = useState(false);

  useEffect(() => {
    if (programContext.postProgram && !fetchedPosts) {
      fetchPosts();
      setFetchedPosts(true);
    }
  }, [programContext, fetchedPosts]);

  async function fetchPosts() {
    try {
      let fetchedPosts: PostType[] = await getAllPosts({ program: programContext.postProgram! });
      fetchedPosts.sort((a, b) => parseInt(b.date) - parseInt(a.date));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  const addPost = (post: PostType) => {
    setPosts([post, ...posts]);
  };

  return (
    <>
      <Layout active={0}>
        <div className="flex flex-grow flex-col bg-white">
          <div className="max-w-4xl mx-auto py-8 px-4 flex-grow">
            <NewPost addPost={addPost} />
            {/* Placeholder for posts */}
          </div>
          <div className="flex-grow"></div> {/* Empty div to push content to the bottom */}
        </div>
      </Layout>
    </>
  );
}
