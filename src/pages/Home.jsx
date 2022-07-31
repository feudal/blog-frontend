import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { useQuery, useMutation, useQueryClient } from "react-query";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import api from "../api";
import { useAuth } from "../hooks";

export const Home = () => {
  const { user } = useAuth();
  const QueryClient = useQueryClient();
  const { data, isLoading } = useQuery("posts", () => api.posts.get());

  const { mutate: deletePost } = useMutation(
    async (id) => api.posts.delete(id),
    {
      onSuccess: () => QueryClient.invalidateQueries("posts"),
      onError: (err) => alert(err),
    }
  );

  const { data: tags, isLoading: tagsLoading } = useQuery("tags", () =>
    api.posts.getTags()
  );

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {data?.map((post) => (
            <Post
              id={post._id}
              title={post.title}
              imageUrl={
                post?.imageUrl ? `http://localhost:4444${post?.imageUrl}` : null
              }
              user={post.user}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={3}
              tags={post.tags}
              isEditable={user?._id === post.user._id}
              isLoading={isLoading}
              onDelete={() => deletePost(post._id)}
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={tagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
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
          />
        </Grid>
      </Grid>
    </>
  );
};
