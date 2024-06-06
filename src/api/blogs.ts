export type Blog = {
  date: Date
  href: string
  title: string
  body: string | string[]
  img?: string
  imgAlt?: string
}

export async function getBlogs() {
  await wait(2000)
  return [
    {
      href: "nextjs-fullstack-portfolio-app",
      date: new Date(),
      title: "Next.js fullstack portfolio app",
      body: "Welcome. This is my first post for this blog and the idea behind implementing a blog here is to kinda keep track of my learning during the development of this webapp. I initially had a very simple static website in plain HTML and CSS and thought it was time to give it an updgrade. I have just finished WebDevSimplified's React and Next.js courses and time to put those newly learned skill in action. By the way, those are some great courses and Kyle as a frontend development mentor has a really clear way of explaining complicated topics.",
      img: "/images/nextjs.jpeg",
      imgAlt: "Next.js",
    },
  ]
}

export async function getBlog(blogHref: string) {
  return {
    href: "nextjs-fullstack-portfolio-app",
    date: new Date(),
    title: "Me and Next.js portfolio web application..",
    body: [
      "Welcome",
      "This is my first post for this blog and the idea behind implementing a blog here is to kinda keep track of my learning during the development of this webapp. I initially had a very simple static website in plain HTML and CSS and thought it was time to give it an updgrade",
      "I have just finished WebDevSimplified's React and Next.js courses and time to put those newly learned skill in action. By the way, those are some great courses and Kyle as a frontend development mentor has a really clear way of explaining complicated topics.",
    ],
    img: "/images/nextjs.jpeg",
    imgAlt: "Next.js",
  }
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}
