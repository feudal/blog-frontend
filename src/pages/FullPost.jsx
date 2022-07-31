import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import api from "../api";

export const FullPost = () => {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery(["post", id], () =>
    api.posts.getById(id)
  );

  return (
    <>
      <Post
        id={post?._id}
        title={post?.title}
        imageUrl={
          post?.imageUrl ? `http://localhost:4444${post?.imageUrl}` : null
        }
        user={post?.user}
        createdAt={post?.createdAt}
        viewsCount={post?.viewsCount}
        commentsCount={3}
        tags={post?.tags}
        isFullPost
        isLoading={isLoading}
      >
        <ReactMarkdown children={post?.text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
