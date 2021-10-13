import { client } from "../../libs/client";

export default function Blogid({ blog }) {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`
        }}
      />  
    </main>
  )
}

export async function getStaticPaths(){
  const data = await client.get({ endpoint: "blog"});

  const paths = data.contents.map((content) => { return { params: {"id": content.id}} });
  // console.log(paths)
  return { paths, fallback: false };
}

export async function getStaticProps(context){
  const id = context.params.id;
  const data = await client.get({ endpoint: 'blog', contentId: id});
  
  return {
    props: {
      blog: data,
    },
  };
}