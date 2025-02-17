import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe(".findMany", () => {
    const posts = [
      { text: "Post 1" },
      { text: "Post 2" },
      { text: "Post 3" },
      { text: "Post 4" },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it("should return all posts if called without options", () => {
      const foundPosts = postsService.findMany();

      expect(foundPosts.length).toBe(posts.length);
      expect(foundPosts.map((post) => post.text)).toEqual(
        posts.map((post) => post.text)
      );
    });

    it("should return correct posts for skip and limit options", () => {
      const foundPosts = postsService.findMany({ skip: 2, limit: 2 });

      expect(foundPosts.length).toBe(2);
      expect(foundPosts[0].text).toBe("Post 3");
      expect(foundPosts[1].text).toBe("Post 4");
    });

    it("should return correct found post", () => {
      const foundPost = postsService.find("1");

      expect(foundPost?.text).toBe(posts[0].text);
    });

    it("should return correct  posts length", () => {
      postsService.delete("1");
      const foundPosts = postsService.findMany();

      expect(foundPosts.length).toBe(3);
    });

    it("should return correct updated post", () => {
      posts[0].text = "Updated post";
      postsService.update("1", posts[0]);
      const foundPost = postsService.find("1");

      expect(foundPost?.text).toBe("Updated post");
    });
  });
});
